-- SELECT properties.*, start_date, end_date, avg(property_reviews.rating) as average_rating
-- FROM reservations
-- JOIN properties on property_id = properties.id
-- JOIN users on guest_id = users.id
-- JOIN property_reviews on reservation_id = reservations.id
-- WHERE users.id = 1 AND end_date < now()::date
-- GROUP BY start_date, properties.id, end_date
-- ORDER BY start_date
-- LIMIT 10;

SELECT properties.id as property_id, properties.title, start_date, avg(property_reviews.rating) as average_rating
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id 
WHERE reservations.guest_id = 1 AND reservations.end_date < now()::date
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date
LIMIT 10;

