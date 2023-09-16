SELECT m.* FROM marker m
JOIN users u ON m.user_id = u.id
WHERE u.email = $1