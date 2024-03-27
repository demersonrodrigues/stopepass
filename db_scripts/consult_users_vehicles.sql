SELECT users.id, users.name, vehicles.plate, vehicles.category, vehicles.year_vehicle, vehicles.color, vehicles.model
FROM users
JOIN vehicles ON users.id = vehicles.user_id
ORDER BY users.id;
