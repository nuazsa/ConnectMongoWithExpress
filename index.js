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
}, { timestamps: true });

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

app.post('/users', async (req, res) => {
  try {
    await User.insertOne(req.body);
    res.json({message: 'success input user'});
  } catch (error) {
    console.error('Error while input data user: ', error);
  }
});

app.put('/users', async (req, res) => {
  try {
    const id = req.body.id;
    await User.findByIdAndUpdate(id, req.body)
    res.json({message: 'success update user'});
  } catch (error) {
    console.error('Error while update data user: ', error);
  }
});

app.delete('/users', async (req, res) => {
  try {
    const {id} = req.body;
    await User.findByIdAndDelete(id)
    res.json({message: 'success delete user'});
  } catch (error) {
    console.error('Error while delete data user: ', error);
  }
});

app.listen(3000, '127.0.0.1', () => {
  console.log('Running server at http://127.0.0.1:3000');
});