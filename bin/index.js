#!/usr/bin/env node

/**
 * 🚀 react-starter-pro CLI
 * -------------------------------------------
 * This is the entry point for your custom React CLI tool.
 * It helps users scaffold a project with clean architecture,
 * optional tools (ESLint, Tailwind, Husky), and best practices.
 * 
 * 👨‍💻 Author: Abhinav Singh
 * 🧱 Architecture: Follows SOLID principles
 * 🛠️ Design: Modular, extensible, secure
 */

import { promptUser } from '../utils/prompts.js';                // Handles user interaction for project options
import { copyTemplate } from '../utils/copyTemplate.js';         // Copies the selected project template to the target folder
import { installDeps } from '../utils/installDeps.js';           // Installs dependencies and optional dev tools
import { addGitignore } from '../utils/addGitignore.js';         // Generates a default .gitignore securely
import { configureTools } from '../utils/configureTools.js';     // Selectively configures chosen tools


import path from 'path';                                         // Native Node module for handling file paths
import chalk from 'chalk';                                       // Colorful and readable terminal messages
import { fileURLToPath } from 'url';                             // Converts import.meta.url to __filename
import { dirname } from 'path';
import fs from 'fs-extra';                                       // Better version of Node's fs module

// Simulate __dirname in ESM context
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✨ Intro message
console.log(chalk.cyanBright('\n🌟 Welcome to react-starter-pro — A Powerful React Project Generator!\n'));

console.log(chalk.gray('📘 Tip: Use arrow keys and spacebar to select options during prompts.\n'));

// 🧾 Step 1: Prompt user for project configuration
const options = await promptUser();
if (options.tools.includes('none')) {
  options.tools = []; // Reset to empty if 'None' is chosen
}
// 🎯 Show user-selected summary
console.log(chalk.blueBright(`\n📋 Project Summary:`));
console.log(chalk.white(`📁 Project Name: ${chalk.green(options.projectName)}`));
console.log(chalk.white(`📦 Project Template: ${chalk.green(options.template)}`));

if (options.tools.length > 0) {
  console.log(chalk.white(`🛠️  Tools Selected:`));
  options.tools.forEach(tool => {
    console.log(`   - ${chalk.yellow(tool)}`);
  });
} else {
  console.log(chalk.gray('🛠️  No extra tools selected.'));
}

console.log(chalk.white(`📦 Auto Install: ${options.installDeps ? chalk.green('Yes') : chalk.red('No')}`));


// 📁 Step 2: Resolve paths
const templatePath = path.join(__dirname, '..', 'templates', options.template);     // Template to copy
const targetPath = path.resolve(process.cwd(), options.projectName);                // Where project will be created

// 🛑 Step 3: Safety check — prevent overwriting existing directories
if (await fs.pathExists(targetPath)) {
  console.error(chalk.red(`\n❌ Error: A folder named "${options.projectName}" already exists in this location.`));
  console.log(chalk.yellow('💡 Tip: Try using a different project name or remove the existing folder.\n'));
  process.exit(1);
}

// 📦 Step 4: Copy template files into the new project folder
console.log(chalk.blue(`📁 Creating your project in: ${chalk.bold(targetPath)}\n`));
await copyTemplate(templatePath, targetPath, options);

// 🔐 Step 5: Add a secure and customizable .gitignore
await addGitignore(targetPath);

// 🔧 Step 6: Install dependencies and optionally configure tools like Tailwind, Husky, etc.
if (options.installDeps) {
  console.log(chalk.yellow(`\n📦 Installing dependencies...\n`));
  await installDeps(targetPath, options.tools);
} else {
  console.log(chalk.gray('\n💡 Skipped "npm install". You can install manually by running:\n'));
  console.log(chalk.whiteBright(`   cd ${options.projectName} && npm install\n`));
}

// 🔧 Step 7: Conditionally scaffold tools like ESLint, Tailwind, Husky, etc.
await configureTools(targetPath, options.tools);

// ✅ Step 8: Done — final success message with next steps
console.log(chalk.greenBright(`\n✅ Success! Your React project "${options.projectName}" is ready.`));
console.log(chalk.gray('\n👉 Next Steps:'));
console.log(chalk.white(`
  1. ${chalk.bold(`cd ${options.projectName}`)}   → Move into your new project directory
  2. ${chalk.bold('npm run dev')}                 → Start your development server
  3. ${chalk.bold('npm run lint')}                → Run ESLint (if selected)
  4. ${chalk.bold('npm run format')}              → Format with Prettier (if included)
`));
console.log(chalk.gray(`\n🔗 Visit documentation or run ${chalk.bold('--help')} in future versions for advanced usage.\n`));
console.log(chalk.cyanBright('🚀 Happy coding, rockstar!\n'));
