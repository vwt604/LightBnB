INSERT INTO users (name, email, password) VALUES ('Leslie Knopp', 'leslie@parks.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
INSERT INTO users (name, email, password) VALUES ('Ron Swanson', 'ron@parks.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
INSERT INTO users (name, email, password) VALUES ('April Ludgate', 'april@parks.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
INSERT INTO users (name, email, password) VALUES ('Andy Dwyer', 'andy@parks.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
INSERT INTO users (name, email, password) VALUES ('Jerry Gergich', 'jerry@parks.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
INSERT INTO users (name, email, password) VALUES ('Tom Haverford', 'tom@parks.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
INSERT INTO users (name, email, password) VALUES ('Donna Meagle', 'donna@parks.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');


INSERT INTO properties (title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms,  number_of_bedrooms, country, street, city, province, post_code, active) 
VALUES (
  'Luxury Penthouse', 
  'Description', 
  'img', 
  'img', 
  200,
  1,
  2,
  3,
  'Canada', 
  '1111 Robson Street', 
  'Vancouver',
  'BC', 
  'V7V 2R9',
  TRUE
  ),
  ('Modern Apartment', 
  'Description', 
  'img', 
  'img', 
  150,
  0,
  1,
  2,
  'Canada', 
  '2222 Oak street', 
  'Vancouver',
  'BC', 
  'V2V 2R7',
  FALSE
  ),
      
  ('Humble Beginnings', 
  'Description', 
  'img', 
  'img', 
  50,
  0,
  0,
  1,
  'Canada', 
  '3333 E Hastings', 
  'Vancouver',
  'BC', 
  'V3R 3R7',
  TRUE
  );

INSERT INTO reservations (guest_id, property_id, start_date, end_date) 
  VALUES 
  (1, 1, '2018-09-11', '2018-09-26'),
  (2, 2, '2019-01-04', '2019-02-01'),
  (3, 3, '2021-09-01', '2021-09-15');

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message) 
  VALUES 
  (1, 1, 1, '3', 'message'),
  (2, 2, 2, '4', 'message'),
  (3, 3, 3, '3', 'message');