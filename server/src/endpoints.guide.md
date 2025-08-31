> **Note:** Since the project currently requires an Auth0 service configuration and a connected database, some functionality may not work on your local machine out of the box.

# Users endpoints

## POST /me – Create or Sync User

Creates a new user or synchronizes the user with the database based on Auth0 data.

### Request

```http
POST /me

body
{
  "auth0_id": "auth0|123",
  "email": "user@example.com",
  "nickname": "TestUser"
}

```

## GET /user – Get User by Auth0 ID

Returns a user from the database using the sub claim from the Auth0 token.

### Request

```
GET /me/user
```

## GET /average – Get Average Review Score

Returns the average review score for a specific user.

Request

```
GET /me/average
```

# Review Endpoints

## POST /review – Create a Review

Creates a new review for a (at this moment hardcoded repository).

### Request

```http
POST /review/
```

## GET /review – Get All Reviews for Current User

Returns all reviews for the authenticated user.

## GET /:id – Get Review by ID

Returns a single review by its ID.

### Request

GET /review/42
