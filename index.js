#!/usr/bin/env node

const args = process.argv.slice(2);

if (args.length === 0) {
  console.log("Welcome to My CLI App! Please provide some arguments.");
} else {
  console.log(`You provided the following arguments: ${args.join(", ")}`);
}
