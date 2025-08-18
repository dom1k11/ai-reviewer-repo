# models/

Direct access to the PostgreSQL database using `pg`.

Each model function:

- runs SQL queries
- returns raw data

## Examples

# models/userModel

- `findOrCreateUser` - utility query to add logged user into database
- `getUserBySub(sub)` - utility query to extract all related data with user
- `getUserIdBySub(sub)` - utility query to extract user `id`

# models/reviewModel

- `insertReview({ userId, repoId, score })` - to save review in database when review is generated
- `getReviewsByUserId(userId)`- to allow user see his reviews
- `getReviewById({ userId, repoId, score })` - to allow select only one review
