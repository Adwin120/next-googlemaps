INSERT INTO marker (
    name,
    description,
    latitude,
    longitude,
    user_id
  )
VALUES ($1, $2, $3, $4, $5);