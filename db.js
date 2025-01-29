import Task from './models/Task.js';
import mongoose from 'mongoose';
import env, { configDotenv } from 'dotenv';

env.config();
const uri = process.env.MONGO_URI;

export async function connect(){
    // Connect to MongoDB
    await mongoose.connect(uri);
    console.log('Connected to MongoDB');
}

export async function disconnect(){
    await mongoose.disconnect();
    console.log('Mongodb connection closed');
}

export async function addTask(name, description){
    // Create a document
    const task = new Task({ name, description });

    // Save the document
    await task.save();
    console.log('Task added');
}


