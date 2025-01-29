import mongoose from 'mongoose';

// Define a schema
const taskSchema = new mongoose.Schema({
    name: String,
    description: String,
});

// Create a model
const Task = mongoose.model('Task', taskSchema);

export default Task;