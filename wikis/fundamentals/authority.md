---
layout: wiki
directory: fundamentals
filename: authority.md
title: Fundamentals > Authorization/Authentication
---
## Permission Level
### NoPermission
- User is not allowed to use the service.
- This permission can be used to disable or ban a user.
- This permission level requires `HS256` hashing algorithm.

### UserRegistration
- `UserRegistration` is used for [CreateUser](https://hwsc-org.github.io/wikis/app-gateway-svc/specifications.html#authenticateuser)
- This permission level requires `HS256` hashing algorithm.

### User
- `User` is only allowed to use services based on user's ownership.
- This permission level requires `HS256` hashing algorithm.

### Admin
- `Admin` is allowed to perform CRUD on everything.
- This permission level requires `HS512` hashing algorithm.

## Token Generation
- Header contains the algorithm and token type used to sign the token.
    ```golang
    type Header struct {
        Alg      Algorithm
        TokenTyp TokenType
    }
    ```
- Body contains the user's `UUID`, `Permission`, and `ExpirationTimestamp`.
    ```golang
    type Body struct {
        UUID                string
        Permission          Permission
        ExpirationTimestamp int64
    }
    ```
- The `header` and `body` are serialized to JSON and encoded using base64URL encoder.
- Token consists of `header`, `body`, and `signature` that are delimited by a `.`. Signature is a hash value, and it is generated using the following:
    - Format: `<encoded header>.<encoded body>.<hashed(<encoded header>.<encoded body>)>`
    - Example: `"eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiMTIzNDU2Nzg5MCIsInBlcm1pc3Npb24iOiJUb2tlbi5BRE1JTiIsImV4cGlyYXRpb25fdGltZSI6MTU0OTA5MzkxMH0.OZFQ_zU1F2BJm6kyYzsBns5qmOxbVbUnQV2SU1B_kyPfXPOmUd0fddRvF0I3IqaDz-55H7Q80w8zQyldMQ7AAg"`
    
## Token Type
### JWT/AuthToken
- `JWT` is used to authorize a user for services.
- `JWT` expires in 2 hours.
- `JWT` is stored in `user_security.auth_tokens`.
- `Secret` used to generate `JWT` is stored  `user_security.secrets`.

### JET/EmailToken
- `JET` is used to verify a user's email.
- `JET` expires in 2 weeks.
- `JET` is stored in `user_svc.email_tokens`.
- If `JET` expires, it is deleted in `user_svc.email_token`. 
- If `JET` was verifeid, it is deleted in `user_svc.email_token`. 
- Unlike `JWT`'s `secret`, `JET`'s `secret` is stored in `user_svc.email_token`.

## Secret
- `Secret` is used to generate the hash signature.
- `JWT`'s `secret` expires in 1 week.
- `JET` and its `secret` expires in 2 weeks.
- `Secret` consists of a `key`, `created_timestamp`, and `expiration_timestamp`.

## Identification
- `Identification` is used by the `authority` to authorize a user for services.
- `Identification` consists of `token_string` and `secret`.

## Authority
- `Authority` ensures the `identification` is authorized.
    ```golang
    type Authority struct {
        id                 *pbauth.Identification
        header             *Header
        body               *Body
        tokenRequired      TokenType
        permissionRequired Permission
    }
    ```
- Use `NewAuthority` to make an `authority` with the required `token` and `permission_level`.
    - To make an authority that accepts a `JWT` with a minimum of permission level.
        `authority := auth.NewAuthority(auth.Jwt, auth.User)`
- Use `Authorize` to authorize the `identification`.
    ```
    authority := auth.NewAuthority(auth.Jwt, auth.User)
    err := authority.Authorize(identity)
    ```
- `Invalidate` is required to be invoked after using the `authority`.
    `authority.Invalidate()`
- Use multiple `authority` within a service to perform tasks based on permission level.
```golang
func foo(){
    // do admin stuff
    admin := auth.NewAuthority(auth.Jwt, auth.Admin)
    err := admin.Authorize(identity)
    admin.Invalidate()
    
    // do user stuff
    user := auth.NewAuthority(auth.Jwt, auth.User)
    err := user.Authorize(identity)
    user.Invalidate()
}
```

