const { query } = require('express');
const { Pool } = require('pg'); //using pool is preferred over { Client }
const properties = require('./json/properties.json');
const users = require('./json/users.json');

//configuration object
const pool = new Pool({ 
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb'
});



/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = (email) => {
  // console.log('getUserWithEmail', email);
  return pool.query(`
    SELECT * FROM users
    WHERE email = $1
  `, [email])
  .then((data) => {
    // console.log(data.rows[0]);
    return data.rows[0];
  })
  .catch(() => err(null));
}
exports.getUserWithEmail = getUserWithEmail;



/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  // console.log('getUserWithid', id);
  return pool.query(`
    SELECT * FROM users
    WHERE id = $1
  `, [id])
  .then((data) => {
    // console.log(data.rows[0]);
    return data.rows[0];
  })
  .catch(() => err(null));
}

exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  const userId = Object.keys(users).length + 1;
  user.id = userId;
  users[userId] = user;
  return pool.query(`
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `, [user.name, user.email, user.password])
  .then((data) => {
    console.log(data.rows[0]);
    return data.rows[0];
  })
  .catch(() => err(null));
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  // console.log('guest id', guest_id)
  return pool.query(`
  SELECT properties.*, reservations.*, avg(property_reviews.rating) as average_rating
  FROM reservations
  JOIN properties ON reservations.property_id = properties.id
  JOIN property_reviews ON properties.id = property_reviews.property_id 
  WHERE reservations.guest_id = $1 
  AND reservations.end_date < now()::date
  GROUP BY properties.id, reservations.id
  ORDER BY reservations.start_date, end_date
  LIMIT $2;
  `, [guest_id, limit])
  .then((data) => {
    // console.log(data.rows);
    return data.rows;
  })
  .catch(() => err(null));
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
  let hasCondition = false;
  // 1
  const queryParams = [];
  // 2
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  WHERE TRUE
  `;
  // console.log('options', options)
  // 3
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `\n AND city ILIKE $${queryParams.length} `;
  }

  if (options.owner_id) {
    queryParams.push(`%${options.owner_id}%`);
    queryString += `\n  AND users LIKE $${queryParams.length}`;
  }
  
  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night);
    queryString += `\n  AND properties.cost_per_night > $${queryParams.length}*100`
  }

  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night);
    queryString += `\n  AND properties.cost_per_night < $${queryParams.length}*100`
  }
  
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `\n  AND rating >= $${queryParams.length}`;
  }

  // 4
  queryParams.push(limit);
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length};
  `;

  // 5
  console.log('query string is returning', queryString);
  console.log('query param is returning',  queryParams);
  
  // 6
  return pool.query(queryString, queryParams)
  .then((res) => {
    // console.log('pool query is retrunung', res.rows)
    return res.rows});
}

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);
}
exports.addProperty = addProperty;

