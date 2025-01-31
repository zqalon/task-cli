import Task from './models/Task.js';
import mongoose from 'mongoose';
import env, { configDotenv } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

env.config();

const uri = process.env.MONGODB_URI;


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

export async function listTasks(){
    // Fetch all documents
    const tasks = await Task.find();
    return tasks;
}


