import express from 'express';
import mongoose from 'mongoose';

// Connection to Database
mongoose.connect('mongodb://127.0.0.1:27017/testDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection error:', err));

// Schema for User
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  status: { type: String, default: "active" }
})

// Model
const User = mongoose.model('User', userSchema);

const app = express();
app.use(express.json());

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json({data: users})
  } catch (error) {
    console.error('Error fetching users:', error);
  }
})

app.listen(3000, '127.0.0.1', () => {
  console.log('Running server at http://127.0.0.1:3000');
});