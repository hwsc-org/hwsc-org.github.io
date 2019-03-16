---
layout: wiki
directory: app-gateway
filename: epics.md
title: App Gateway > Epics
redirect_from:
  - "/wikis/app-gateway/"
  - "/wikis/"
---

[TEMP link to issue for epics](https://github.com/hwsc-org/hwsc-org.github.io/issues/1)

## User
Epics related to `hwsc-user-svc`

### CreateUser
#### Purpose
User has to verify a new email on registration and update.
#### Limitations
- `EmailToken` expires in 2 weeks.
- `CreateUser` requires a new column called `secret` in table `user_svc.email_tokens` - [link](https://github.com/hwsc-org/hwsc-user-svc/issues/113)
- Email query string

### VerifyEmailToken
#### Purpose
User has to verify a new email on registration and update.
#### Limitations
- `VerifyEmailToken` requires a new column called `secret` in table `user_svc.email_tokens` - [link](https://github.com/hwsc-org/hwsc-user-svc/issues/113)

#### Procedure
1. User clicks on a verification link from their email.
2. Chrome opens this link.
3. Chrome is redirected to the verification link.
4. Chrome extracts and validates the query string `emailtoken=<token>`.
5. Chrome dials to app-gateway-svc using `"authorization": "Email Token " + <token>`
6. app-gateway-svc parses `token_string`
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
        3. If the `EmailToken` is valid:
            1. Delete the `EmailToken` from `user_svc.email_tokens`.
            2. Modify user row `is_verified` to `TRUE` from `user_svc.accounts` table.
            3. Modify user email as necessary such as switching emails.
            4. user-svc returns `codes.OK`
            5. app-gateway-svc forwards the code to Chrome.
            6. Chrome redirects user to login page
        4. If the `EmailToken` is invalid:
            1. user-svc returns `codes.Unauthenticated` to app-gateway-svc.
            2. app-gateway-svc forwards the error code to Chrome.
            3. Chrome informs the user that the `EmailToken` is invalid.

### VerifyAuthToken
#### Purpose
In the event of a connection failure, Chrome has to authenticate with app-gateway-svc using an existing `AuthToken`.
#### Limitations
- `AuthToken` expires in 2 hours.
- `VerifyAuthToken` only works with `User` permission - [link](https://github.com/hwsc-org/hwsc-user-svc/issues/111)

#### Procedure
1. Chrome dials to app-gateway-svc using `"authorization": "Auth Token " + <token_string>`.
2. app-gateway-svc parses the `token_string`.
3. app-gateway-svc invokes `VerifyAuthToken` from the user-svc with the `token_string`.
4. user-svc gets the `token_string` and pair the `token_string` with a `secret` to make an `identification`.
5. user-svc utilizes an `Authority` to validate the `identification`.
6. If the `identification` is valid: 
    1. user-svc returns `codes.OK` and `identification` to app-gateway-svc.
    2. app-gateway-svc finalizes the authentication.
    3. app-gateway-svc performs context metadata sanitization.
    4. app-gateway-svc returns the `token_string`
7. If the `identification` is invalid: 
    1. user-svc returns the appropriate error code.
    2. app-gateway-svc forwards the error code.
    3. Chrome redirects to login page

### AuthenticateUser
#### Purpose
Chrome is able to login using email and password.
#### Limitations
- `AuthenticateUser` should return an `identification` and not the matched user - [link](https://github.com/hwsc-org/hwsc-user-svc/issues/112)

#### Procedure
1. Chrome logs in with user's email and password.
2. Chrome performs base64URL encoding with `email:password`.
3. Chrome dials to app-gateway-svc using `"authorization": "Basic " + base64 encoded "<email:password>"`.
4. app-gateway-svc parses the `email` and `password`.
5. app-gateway-svc invokes `AuthenticateUser` from the user-svc using `email` and `password`.
6. user-svc validates the `email` and `password`
7. If the `email` and `password` are valid:
    1. user-svc generates or grabs an existing `AuthToken`
    1. user-svc returns `codes.OK` and `identification` to app-gateway-svc.
    2. app-gateway-svc finalizes the authentication.
    3. app-gateway-svc performs context metadata sanitization.
    4. app-gateway-svc returns the `token_string`
8. If the `email` and `password` are invalid: 
    1. user-svc returns the appropriate error code.
    2. app-gateway-svc forwards the error code.
    3. Chrome redirects to login page or displays a user-friend error.

### GetAuthToken

### GetSecret

### GetUser

### UpdateUser

### DeleteUser


## Documents
Epics related to `hwsc-document-svc`


## File Transactions
Epics related to `hwsc-file-transaction-svc`
