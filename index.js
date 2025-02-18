#!/usr/bin/env node
import path from 'path';
import { fileURLToPath } from 'url';
import chalk from 'chalk';

import { connect, disconnect, addTask, listTasks } from './db.js';

const args = process.argv.slice(2);

// task (help)
if (args.length === 0 || (args.length === 1 && args.at(0) === "help")){
    console.log(
`
Welcome to My Task Manager CLI App! 
    Usage:  
    
    help ~ to list all commands
    list ~ to list all tasks
    add <name> <description> ~ to add a new task
    `
    );

    // task add <name> <description>
} else if (args.length >= 2 && args.at(0) == "add"){
    try{
        await connect();
        await addTask(args.at(1), args.at(2));
    } finally {
        await disconnect();
    }

    //task list
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

