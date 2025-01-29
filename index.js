#!/usr/bin/env node
import { connect, disconnect, addTask } from './db.js';

async function main(){
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log("Welcome to My CLI App! Please provide some arguments.");
    } else if (args.length >= 2 && args.at(0) == "add"){
        try{
            await connect();
            await addTask(args.at(1), args.at(2));
        } finally {
            await disconnect();
        }
    }
}

