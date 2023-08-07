require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect(process.env.REMOTE_DB);

// Define the User model
const User = mongoose.model('User', mongoose.Schema({
  pernum: { type: String, unique: true },
  gdud: String,
  isManager: Boolean
}));

const carData = mongoose.model('carData', {
  carNumber: { type: String, unique: true },
  makat: String,
  kshirot: Boolean,
  gdud: String
}, 'carDatas');

// Function to generate random gdud (2-3 digits)
function generateRandomGdud() {
  return Math.floor(Math.random() * 900) + 100; // Generates a 2-3 digit number
}

// Function to generate random pernum (always 4 digits)
function generateRandomPernum() {
  return Math.floor(Math.random() * 9000) + 1000; // Generates a 4-digit number
}

// Function to create users
async function createUsers() {
  const users = [];
  for (let i = 0; i < 4; i++) {
    const gdud = generateRandomGdud().toString();
    const managerUser = new User({
      pernum: generateRandomPernum().toString(),
      gdud,
      isManager: true
    });

    const nonManagerUser = new User({
      pernum: generateRandomPernum().toString(),
      gdud,
      isManager: false
    });

    await managerUser.save();
    await nonManagerUser.save();
    users.push(managerUser);
    users.push(nonManagerUser);
  }
  console.log('Users created successfully');
  return users;
}

// Function to generate random gdud (2-3 digits)
function generateRandomGdud() {
  return Math.floor(Math.random() * 990) + 10; // Generates a 2-3 digit number
}

// Function to generate a list of random makats
function generateRandomMakats(count) {
  const makats = [];
  for (let i = 0; i < count; i++) {
    makats.push(Math.floor(Math.random() * 90000000) + 10000000); // Generates a 8-digit number
  }
  return makats;
}

// Function to choose a random item from an array
function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Function to generate random carNumber (9 digits)
function generateRandomCarNumber() {
  return Math.floor(Math.random() * 900000000) + 100000000; // Generates a 9-digit number
}

// Function to create carData
async function createCarData(users) {
  const makats = generateRandomMakats(25); // Generate 300 random makats
  const gdudCounts = {};
  console.log(users);
  for (const user of users) {
    gdudCounts[user.gdud] = gdudCounts[user.gdud] || 0;
    const rekems = [];
    while (gdudCounts[user.gdud] < 4096) {
      const makat = getRandomFromArray(makats);
      const carNumber = generateRandomCarNumber().toString();
      const kshirot = Math.random() < 0.5; // Random boolean

      const newCarData = new carData({
        carNumber,
        makat: makat.toString(),
        kshirot,
        gdud: user.gdud
      });

      rekems.push(newCarData);
      gdudCounts[user.gdud]++;
    }
    await carData.insertMany(rekems);
    console.log("added new 4096 rekems");
  }

  console.log('carData created successfully');
}

// Call the createUsers function
createUsers().then(async (users) => {
  await createCarData(users);  
  mongoose.disconnect();
}).catch(err => {
  console.error('Error:', err);
});
