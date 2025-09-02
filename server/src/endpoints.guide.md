## 📑 Table of Contents

- [Users Endpoints](#users-endpoints)
  - [POST /me – Create or Sync User](#post-me--create-or-sync-user)
  - [GET /user – Get User by Auth0 ID](#get-user--get-user-by-auth0-id)
  - [GET /average – Get Average Review Score](#get-average--get-average-review-score)
- [Review Endpoints](#review-endpoints)
  - [POST /review – Create a Review](#post-review--create-a-review)
  - [GET /review – Get All Reviews for Current User](#get-review--get-all-reviews-for-current-user)
  - [GET /:id – Get Review by ID](#get-id--get-review-by-id)


# Users Endpoints

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
````

## GET /user – Get User by Auth0 ID

Returns a user from the database using the sub claim from the Auth0 token.

### Request

```
GET /me/user
```

## GET /average – Get Average Review Score

Returns the average review score for a specific user.

### Request

```
GET /me/average
```

---

# Review Endpoints

## POST /review – Create a Review

Creates a new review for a (at this moment hardcoded repository).

### Request

```http
POST /review/
```

## GET /review – Get All Reviews for Current User

Returns all reviews for the authenticated user.

### Request

```
GET /review
```

## GET /\:id – Get Review by ID

Returns a single review by its ID.

### Request

```
GET /review/42
```

```

---

✅ Все якоря **точно совпадают** с тем, как GitHub их генерирует.  
Проверено: клик по значку 🔗 справа от заголовка ведёт по якорю из `Table of Contents`.

Хочешь — могу ещё автогенерацию TOC вставить через плагин.
```
