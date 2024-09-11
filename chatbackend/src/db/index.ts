import mongoose from 'mongoose';

const dbURI = 'mongodb+srv://admin:admin@cluster0.jdbss.mongodb.net/chatappdb?retryWrites=true&w=majority&appName=Cluster0';

const connectToDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(dbURI, );

    console.log('Successfully connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1); // Exit process with failure code
  }
};

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('MongoDB connection open');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB connection disconnected');
});

// Handle process termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed due to app termination');
  process.exit(0);
});

export default connectToDatabase;
