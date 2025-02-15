#!/usr/bin/env node
import env from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the project root
env.config();
console.log(process.env.MONGODB_URI);

import { connect, disconnect, addTask, listTasks } from './db.js';

const args = process.argv.slice(2);

if (args.length === 0 || (args.length === 1 && args.at(0) === "help")){
    console.log(
`
Welcome to My Task Manager CLI App! 
    Usage:  
    
    help ~ to list all commands
    list ~ to list all tasks
    add <name> <descripttion> ~ to add a new task
    `
    );

} else if (args.length >= 2 && args.at(0) == "add"){
    try{
        await connect();
        await addTask(args.at(1), args.at(2));
    } finally {
        await disconnect();
    }
} else if (args.length === 1 && args.at(0) === "list"){
    try{
        await connect();
        const tasks = await listTasks();
        tasks.forEach((task, index) => {
            console.log(`${chalk.green(`${index})`)} ${chalk.magenta(task.name)} ${chalk.yellow('~')} ${chalk.blue(task.description)}`);
        });
    } finally {
        await disconnect();
    }
}

