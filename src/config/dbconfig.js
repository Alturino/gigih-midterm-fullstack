const DB_HOST = 'mongo';
const DB_NAME = 'gigih_midterm';
const DB_USERNAME = 'root';
const DB_PASSWORD = 'example';
const DB_PORT = '27017';
const DB_URI = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

export default DB_URI;
