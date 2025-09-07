## 📑 Table of Contents

- [Users Endpoints](#users-endpoints)
  - [POST /me – Create or Sync User](#post-me--create-or-sync-user)
  - [GET /user – Get User by Auth0 ID](#get-user--get-user-by-auth0-id)
  - [GET /average – Get Average Review Score](#get-average--get-average-review-score)

- [Review Endpoints](#review-endpoints)
  - [POST /review – Create a Review](#post-review--create-a-review)
  - [GET /review – Get All Reviews for Current User](#get-review--get-all-reviews-for-current-user)
  - [GET /review/:id – Get Review by ID](#get-id--get-review-by-id)

---

## 🧑‍💼 Users Endpoints

### POST `/me` – Create or Sync User

Creates a new user in the database or synchronizes an existing one using data from Auth0.

#### 🔐 Auth Required

Yes (Bearer Token)

#### 📥 Request Body

```json
{
  "auth0_id": "auth0|123",
  "email": "user@example.com",
  "nickname": "TestUser"
}
```

| Field      | Type   | Required | Description                          |
| ---------- | ------ | -------- | ------------------------------------ |
| `auth0_id` | string | ✅       | Unique identifier from Auth0 (`sub`) |
| `email`    | string | ✅       | User’s email address                 |
| `nickname` | string | ✅       | User’s display name or nickname      |

#### 📤 Response – 200 OK

```json
{
  "id": 1,
  "auth0_id": "auth0|123",
  "email": "user@example.com",
  "nickname": "TestUser",
  "created_at": "2025-09-02T15:22:11.123Z"
}
```

#### ⚠️ Possible Errors

| Status Code | Description                            |
| ----------- | -------------------------------------- |
| 400         | Invalid or missing request body fields |
| 401         | Missing or invalid Bearer token        |
| 500         | Internal server error                  |

---

### GET `/user` – Get User by Auth0 ID

Retrieves a user from the database based on the Auth0 `sub` claim provided in the access token.

#### 🔐 Auth Required

Yes

#### 🧾 Request

```http
GET /me/user
```

#### 📤 Response – 200 OK

```json
{
  "id": 1,
  "auth0_id": "auth0|123",
  "email": "user@example.com",
  "nickname": "TestUser",
  "created_at": "2025-09-02T15:22:11.123Z"
}
```

---

### GET `/average` – Get Average Review Score

Returns the average review score for the currently authenticated user.

#### 🔐 Auth Required

Yes

#### 🧾 Request

```http
GET /me/average
```

#### 📤 Response – 200 OK

```json
{
  "averageScore": 4.3
}
```

---

## 📝 Review Endpoints

---

### POST `/review` – Create a Review

Creates a new code review using a hardcoded repository URL (temporary).

#### 🔐 Auth Required

Yes

#### 📥 Request Body

```json
{
  "repoUrl": "https://github.com/user/repo"
}
```

| Field     | Type   | Required | Description                            |
| --------- | ------ | -------- | -------------------------------------- |
| `repoUrl` | string | ✅       | Public GitHub repository URL to review |

#### 📤 Response – 200 OK

```json
{
  "id": 42,
  "review": "Code looks clean. Consider renaming 'x' to something more descriptive.",
  "score": 4,
  "created_at": "2025-09-02T15:35:22.456Z"
}
```

---

### GET `/review` – Get All Reviews for Current User

Returns all reviews created by the authenticated user.

#### 🔐 Auth Required

Yes

#### 🧾 Request

```http
GET /review
```

#### 📤 Response – 200 OK

```json
[
  {
    "id": 1,
    "user_id": 1,
    "repo_id": 1,
    "score": 100,
    "created_at": "2025-09-02T15:35:22.456Z"
  },
  {
    "id": 2,
    "user_id": 2,
    "repo_id": 2,
    "score": 50,
    "created_at": "2025-09-02T15:35:22.456Z"
  }
]
```

---

### GET `/review/:id` – Get Review by ID

Returns a specific review by its unique ID.

#### 🔐 Auth Required

Yes

#### 🧾 Request

```http
GET /review/42
```

#### 📤 Response – 200 OK

```json
 {
    "id": 1,
    "user_id": 1,
    "repo_id": 1,
    "score": 100,
    "created_at": "2025-09-02T15:35:22.456Z"
  },
```

#### ⚠️ Possible Errors

| Status Code | Description                   |
| ----------- | ----------------------------- |
| 404         | Review not found              |
| 401         | Unauthorized or invalid token |

---
