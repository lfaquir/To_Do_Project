const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer = null;

async function connectDB() {
  const mongoURI = process.env.MONGO_URI;

  if (mongoURI) {
    // Try to connect to provided MongoDB URI (Atlas or local)
    try {
      await mongoose.connect(mongoURI);
      console.log('Connected to MongoDB');
      return;
    } catch (err) {
      console.error('Failed to connect to MongoDB URI:', err.message);
    }
  }

  // Fallback: try local MongoDB
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mern-todo-app');
    console.log('Connected to local MongoDB');
    return;
  } catch (err) {
    console.warn('Local MongoDB not available, starting in-memory server...');
  }

  // Fallback: use in-memory MongoDB
  try {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
    console.log('Connected to in-memory MongoDB');
  } catch (err) {
    console.error('Failed to start in-memory MongoDB:', err.message);
    throw err;
  }
}

async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  if (mongoServer) {
    await mongoServer.stop();
  }
}

module.exports = { connectDB, disconnectDB };
