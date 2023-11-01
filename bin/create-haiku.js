#! /usr/bin/env node
import { execSync } from 'child_process';

const projectName = process.argv[2];
const gitCheckoutCommand = `git clone https://github.com/jay19240/Haiku.git ${projectName}`;
const npmInstallCommand = `cd ${projectName} && npm install`;

console.log(`Creating a new haiku project called ${projectName}...`);

const checkedOut = runCommand(gitCheckoutCommand);
if (!checkedOut) {
  console.error('Failed to checkout the repo');
  process.exit(-1);
}

console.log(`Installing dependencies for ${projectName}...`);
const installed = runCommand(npmInstallCommand);
if (!installed) {
  console.error('Failed to install dependencies');
  process.exit(-1);
}

console.log(`Success! Created ${projectName} at ${process.cwd()}/${projectName}`);
console.log('Inside that directory, you can run several commands:');
console.log('Ex: npm run dev && npm run build');

function runCommand(command) {
  try {
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to execute ${command}`, error);
    return false;
  }
  return true;
}