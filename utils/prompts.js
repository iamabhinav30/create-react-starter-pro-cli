/**
 * 🎯 Utility: promptUser
 * -----------------------
 * This module defines and handles interactive CLI prompts using Inquirer.
 * It collects project-specific preferences like name, state management setup,
 * and optional tools such as ESLint, Husky, Tailwind, and React Router.
 * 
 * 📦 Used in: bin/index.js
 *
 * SOLID Principles:
 * 🔸 S — Single Responsibility: Only handles user input prompts
 * 🔸 O — Open for Extension: Easily extendable to add new tools or templates
 * 🔸 I — Interface Segregation: No unrelated logic (e.g., validation, config writing)
 */

import inquirer from 'inquirer';

/**
 * Prompts the user for key configuration settings.
 * 
 * @returns {Promise<Object>} Object containing:
 *  - projectName
 *  - template
 *  - tools (array of selected extras)
 */
export async function promptUser() {
    return await inquirer.prompt([
        // ✏️ Ask for the project name
        {
            name: 'projectName',
            type: 'input',
            message: '📛 Enter your project name:',
            validate: input => {
                // Ensure name is safe (no invalid characters or directory traversal)
                if (!/^[a-zA-Z0-9_-]+$/.test(input)) {
                    return '⚠️  Project name can only contain letters, numbers, hyphens, and underscores.';
                }
                return true;
            }
        },

        // 📦 Ask for preferred state management strategy
        {
            name: 'template',
            type: 'list',
            message: '🧱 Choose a project setup:',
            choices: [
                { name: 'useReducer + useContext (Minimal Global State)', value: 'reducer' },
                { name: 'Redux (Standard Setup) --> Coming soon', value: 'redux' },
                { name: 'Redux Toolkit (Modern & Recommended)  --> Coming soon', value: 'redux-toolkit' }
            ]
        },

        // 🧰 Ask which tools to include during bootstrapping
        {
            name: 'tools',
            type: 'checkbox',
            message: '🛠️  Include extra tools?',
            choices: [
                { name: 'ESLint + Prettier (Code quality & formatting)', value: 'eslint' },
                { name: 'Husky Pre-commit hooks (Git automation)', value: 'husky' },
                { name: 'Tailwind CSS (Utility-first CSS)', value: 'tailwind' },
                { name: 'Routing (React Router)', value: 'router' }
            ]
        },
        {
            name: 'installDeps',
            type: 'confirm',
            message: '📦 Do you want to run "npm install" after project creation?',
            default: true
        }
    ]);
}
