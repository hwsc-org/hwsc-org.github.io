---
layout: wiki
directory: app-gateway
filename: epics.md
title: App Gateway > Epics
redirect_from:
  - "/wikis/app-gateway/"
  - "/wikis/"
---
## User
Epics related to `hwsc-user-svc`

### CreateUser
#### Purpose
Chrome is able to create a new user.
#### Limitations
- `EmailToken` expires in 2 weeks.
- `CreateUser` requires a new column called `secret` in table `user_svc.email_tokens` - [link](https://github.com/hwsc-org/hwsc-user-svc/issues/113)

#### Procedure
1. Chrome goes to a registration page.
2. User puts in the required fields for registration.
3. Chrome sanitizes user inputs as required.
4. Challenger user with a CAPTCHA test.
5. If user passes CAPTCHA test, Chrome dials using a dummy email and password - [link](https://hwsc-org.github.io/wikis/app-gateway/epics.html#authenticateuser)
6. app-gateway-svc returns `token_string` with `UserRegistration` permission.
7. Using the `token_string`, Chrome invokes `CreateUser` from app-gateway-svc with the required fields.
8. app-gateway-svc validates the `token_string` using an `Authority` with `UserRegistration` permission.
9. If the `token_string` is invalid:
    1. app-gateway-svc returns an `codes.Internal` to Chrome.
    2. Chrome informs the user that registration is unavailable.
    3. app-gateway-svc pages VictorOps to notify developer of the issue.
10. If the `token_string` is valid:
    1. app-gateway-svc invokes `CreateUser` from user-svc with the required fields.
    2. user-svc performs validations.
    3. user-svc locks for writing using the generated `uuid`.
    4. user-svc inserts the `user` to the `user_svc.accounts`.
    5. user-svc generates a `secret` using `generateSecretKey`.
        - This `secret` is **NOT** inserted in `user_security.secrets` table.
    6. user-svc generates an `EmailToken` using the `secret`
    7. user-svc inserts to `user_svc.email_tokens` table.
    8. user-svc generates a verification link.
    9. user-svc sends an email with a verification link.
    10. user-svc returns `codes.OK` to app-gateway-svc.
    11. app-gateway-svc forwards the response code to Chrome.
    12. Chrome redirects user to login page, or informs the user to check their email.
    
### VerifyEmailToken
#### Purpose
User has to verify a new email on registration and update.
#### Limitations
- `EmailToken` expires in 2 weeks.
- `VerifyEmailToken` requires a new column called `secret` in table `user_svc.email_tokens` - [link](https://github.com/hwsc-org/hwsc-user-svc/issues/113)

#### Procedure
1. User clicks on a verification link from their email.
2. Chrome opens this link.
3. Chrome is redirected to the verification link.
4. Chrome extracts and validates the query string `verify-email?token?=<token>`.
5. Chrome dials to app-gateway-svc using `"authorization": "Email Token " + <token>`.
6. app-gateway-svc parses `token_string`.
7. app-gateway-svc invokes `VerifyEmailToken` from user-svc using the `token_string`.
8. user-svc gets the `token_string`.
9. user-svc extracts the `uuid` using `extractUUID` from the hwsc-lib.
10. user-svc locks for writing using `uuid`.
11. user-svc gets the `row` from `user_svc.email_tokens`.
12. user-svc verifies the following:
    - If the `EmailToken` does not exist:
        1. user-svc returns `codes.Unauthenticated` to app-gateway-svc.
        2. app-gateway-svc forwards the error code to Chrome.
        3. Chrome informs the user that the `EmailToken` is invalid.
    - If the `EmailToken` has expired:
        1. Delete the `EmailToken` from `user_svc.email_tokens`.
        2. Retrieve user row from `user_svc.accounts` table.
        3. Generate a new email token and insert into `user_svc.email_tokens`.
        4. Resend a verification email to the email based on two criteria:
            - Resend email under `prospective_email` column if its column is not null/empty.
            - Resend email under email column if `prospective_email` column is null/empty.
        7. user-svc sends `codes.DeadlineExceeded` to app-gateway-svc.
        8. app-gateway-svc forwards the error code to Chrome.
        9. Chrome informs the user that a new `EmailToken` has been sent.
    - If the `EmailToken` has not expired:
        1. user-svc pairs the `token_string` with a `secret` to make an `identification`.
        2. user-svc utilizes an `Authority` to validate the `identification`.
        - If the `EmailToken` is valid:
            1. Delete the `EmailToken` from `user_svc.email_tokens`.
            2. Modify user row `is_verified` to `TRUE` from `user_svc.accounts` table.
            3. Modify user email as necessary such as switching emails.
            4. user-svc returns `codes.OK`.
            5. app-gateway-svc forwards the response code to Chrome.
            6. Chrome redirects user to login page.
        - If the `EmailToken` is invalid:
            1. user-svc returns `codes.Unauthenticated` to app-gateway-svc.
            2. app-gateway-svc forwards the error code to Chrome.
            3. Chrome informs the user that the `EmailToken` is invalid.

### VerifyAuthToken
#### Purpose
In the event of a connection failure, Chrome has to authenticate with app-gateway-svc using an existing `AuthToken`.
#### Limitations
- `AuthToken` expires in 2 hours.
- `Secret` expires in 1 week.
- `VerifyAuthToken` only works with `User` permission - [link](https://github.com/hwsc-org/hwsc-user-svc/issues/111)

#### Procedure
1. Chrome dials to app-gateway-svc using `"authorization": "Auth Token " + <token_string>`.
2. app-gateway-svc parses the `token_string`.
3. app-gateway-svc invokes `VerifyAuthToken` from the user-svc with the `token_string`.
4. user-svc gets the `token_string` and pair the `token_string` with a `secret` to make an `identification`.
5. user-svc utilizes an `Authority` to validate the `identification`.
6. If the `identification` is valid: 
    1. user-svc returns `codes.OK` and `identification` to app-gateway-svc.
    2. app-gateway-svc updates the current `secret` as necessary.
    3. app-gateway-svc finalizes the authentication.
    4. app-gateway-svc performs context metadata sanitization.
    5. app-gateway-svc returns the `token_string`.
7. If the `identification` is invalid: 
    1. user-svc returns the appropriate error code.
    2. app-gateway-svc forwards the error code.
    3. Chrome redirects to login page.

### AuthenticateUser
#### Purpose
Chrome is able to login using email and password.
#### Limitations
- `AuthToken` expires in 2 hours.
- `Secret` expires in 1 week.
- `AuthenticateUser` should return an `identification` and not the matched user - [link](https://github.com/hwsc-org/hwsc-user-svc/issues/112)

#### Procedure
1. Chrome logs in with user's email and password.
2. Chrome performs base64URL encoding with `email:password`.
3. Chrome dials to app-gateway-svc using `"authorization": "Basic " + base64 encoded "<email:password>"`.
4. app-gateway-svc parses the `email` and `password`.
5. app-gateway-svc invokes `AuthenticateUser` from the user-svc using `email` and `password`.
6. user-svc validates the `email` and `password`.
7. If the `email` and `password` are valid:
    1. user-svc generates or grabs an existing `AuthToken`.
    2. user-svc returns `codes.OK` and `identification` to app-gateway-svc.
    3. app-gateway-svc updates the current `secret` as necessary.
    3. app-gateway-svc finalizes the authentication.
    4. app-gateway-svc performs context metadata sanitization.
    5. app-gateway-svc returns the `token_string` to Chrome.
    6. Chrome invokes `GetUser` from app-gateway-svc - [link](https://hwsc-org.github.io/wikis/app-gateway/epics.html#getuser)
    7. Chrome redirects to the user's page.
8. If the `email` and `password` are invalid: 
    1. user-svc returns the appropriate error code.
    2. app-gateway-svc forwards the error code.
    3. Chrome redirects to login page or displays a user-friendly error.

### GetNewAuthToken
#### Purpose
Maintain a secured connection between app-gateway-svc and browser.
#### Limitations
- `AuthToken` expires in 2 hours.
- `Secret` expires in 1 week.
- Rework `GetAuthToken` - [link](https://github.com/hwsc-org/hwsc-user-svc/issues/114)

#### Procedure
1. Every 5 minutes, Chrome verifies if the current `token_string` has not expired.
2. If the `token_string` will expire in 15 minutes:
    1. Chrome invokes `GetNewAuthToken` from app-gateway-svc using `token_string`.
    2. app-gateway-svc validates the `token_string` to an `Identication` using an `Authority`.
        - If the `token_string` is not valid:
            1. app-gateway-svc returns `codes.DeadlineExceeded` to Chrome.
            2. Chrome is redirects to login page.
        - If the `token_string` is valid:
            1. app-gateway-svc invokes `GetNewAuthToken` from user-svc using the `Identification`.
            2. user-svc generates a new `AuthToken`.
            3. user-svc inserts the `AuthToken` to `user_security.auth_tokens` table.
            4. user-svc returns the `identification` to app-gateway-svc.
            5. app-gateway-svc updates the current `secret` as necessary.
            6. app-gateway-svc returns the `token_string` to Chrome.
            7. Chrome updates the `token_string`.
3. If the `token_string` is valid, then do nothing.

### GetUser
#### Purpose
Gets the `user` the render the user page.
#### Limitations
- None at this time.

1. Before Chrome goes to user page.
2. Chrome invokes `GetUser` from app-gateway-svc using a `token_string`.
3. app-gateway-svc validates the `token_string` using an `Authority` with `User` permission.
      - If the `token_string` is invalid:
          1. app-gateway-svc returns an `codes.Unauthenticated` to Chrome.
          2. Chrome informs the user that the resource is unavailable.
          3. app-gateway-svc pages VictorOps to notify developer of the issue.
          4. Chrome is logged out of the page.
      - If the `token_string` is valid:
          1. app-gateway-svc invokes `GetUser` from user-svc with the `uuid` from `token_string`.
          2. user-svc performs validations.
          3. user-svc locks for reads using the generated `uuid`.
          4. user-svc gets the `user` in the `user_svc.accounts` table.
          5. user-svc returns `codes.OK` and `user` with empty `password` to app-gateway-svc.
          6. app-gateway-svc forwards the response to Chrome.
          7. Render the user page using the `user` from the response.
          
### UpdateUser
#### Purpose
Performs a user update.
#### Limitations
- None at this time.

#### Procedure
1. Chrome goes to account page.
2. User updates necessary fields.
3. Chrome sends the updated `user` object and `token_string` to app-gateway-svc.
4. app-gateway-svc validates the `token_string` using an `Authority` with `User` permission.
   - If the `token_string` is invalid:
       1. app-gateway-svc returns an `codes.Internal` to Chrome.
       2. Chrome informs the user that update user is unavailable.
       3. app-gateway-svc pages VictorOps to notify developer of the issue.
       4. Chrome is logged out of the page.
   - If the `token_string` is valid:
       1. app-gateway-svc invokes `UpdateUser` from user-svc with the required fields.
       2. user-svc performs validations.
       3. user-svc locks for writing using the generated `uuid`.
           - If user is attempting to update e-mail:
               1. user-svc generates a `secret` using `generateSecretKey`.
                   - This `secret` is **NOT** inserted in `user_security.secrets` table.
               2. user-svc generates an `EmailToken` using the `secret`.
               3. user-svc inserts to `user_svc.email_tokens` table.
               4. user-svc generates a verification link.
               5. user-svc sends an email with a verification link.
               6. user-svc `is_verified` is set to `FALSE`.
       4. user-svc updates the `user` in the `user_svc.accounts` table
       5. user-svc returns `codes.OK` and updated `user` with empty `password` to app-gateway-svc.
       6. app-gateway-svc forwards the response to Chrome.
       7. For an email update, Chrome redirects user to login page, or informs the user to check their email, otherwise update the user page using the updated `user` from the response.

### GetSecret
#### Purpose
app-gateway-svc updates the current `secret`
#### Limitations
- `Secret` expires in 1 week.

#### Procedure
1. On app-gateway-svc start-up, app-gateway-svc invokes `GetStatus` from user-svc.
    - If user-svc is available:
        1. user-svc checks if there is active `secret`.
            - If there is no active `secret`:
                1. user-svc generates a new `secret` with 1 week expiration timestamp.
                2. user-svc inserts the `secret` in `user_security.secrets` table.
        2. user-svc grabs the active `secret` from ` user_security.active_secret` table.
        3. user-svc returns the `identification` with the active `secret` to app-gateway-svc.
        4. app-gateway-svc saves the `secret`
    - If the user-svc is unavailable:
        1. app-gateway-svc will grab the `secret` during invocation of `AuthenticateUser` - [link](https://hwsc-org.github.io/wikis/app-gateway/epics.html#getuser)
  
### DeleteUser
#### Purpose
Deletes or deactivates a user.
#### Limitations
- Not implemented yet.


## Documents
Epics related to `hwsc-document-svc`


## File Transactions
Epics related to `hwsc-file-transaction-svc`
