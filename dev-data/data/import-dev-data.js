const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
// eslint-disable-next-line prettier/prettier
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection sucessful'));

//READ FILE DATA

const tour = JSON.parse(
  fs.readFileSync(`${__dirname}./tours-simple.json-simple.json`, 'utf8')
);

//import data into db
const importData = async () => {
  try {
    await Tour.create(tour);
    console.log('Data sucessful loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//delete all data from db
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data sucessful deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
