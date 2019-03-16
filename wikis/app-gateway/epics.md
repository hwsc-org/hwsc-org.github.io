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


### VerifyEmailToken

### VerifyAuthToken
#### Purpose
In the event of a connection failure, Chrome has to authenticate with app-gateway-svc using an existing `AuthToken`.
#### Limitations
- This only works with `User` permission - [link](https://github.com/hwsc-org/hwsc-user-svc/issues/111)

#### Procedure
1. Chrome dials to app-gateway-svc using `"authorization": "Auth Token " + <token_string>`.
2. app-gateway-svc invokes `VerifyAuthToken` from the user-svc with the `token_string`.
3. user-svc gets the `token_string` and pair the `token_string` with a `secret` to make an `identification`.
4. user-svc utilizes an `Authority` to validate the `identification`.
5. If the `identification` is valid: 
    1. user-svc returns `codes.OK` and `identification` to app-gateway-svc.
    2. app-gateway-svc finalizes the authentication.
    3. app-gateway-svc performs context metadata sanitization.
    4. app-gateway-svc returns the `token_string`
6. If the `identification` is invalid: 
    1. user-svc returns the appropriate error code.
    2. app-gateway-svc forwards the error code.
    3. Chrome redirects to login page

### AuthenticateUser

### GetAuthToken

### GetSecret

### GetUser

### UpdateUser

### DeleteUser


## Documents
Epics related to `hwsc-document-svc`


## File Transactions
Epics related to `hwsc-file-transaction-svc`
