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
            message: 'Choose a project setup:',
            choices: [
                { name: 'useReducer + useContext', value: 'reducer' },
                { name: 'Redux', value: 'redux', disabled: '🚧 Coming Soon' },
                { name: 'Redux Toolkit', value: 'redux-toolkit', disabled: '🚧 Coming Soon' }
            ]
        },

        // 🧰 Ask which tools to include during bootstrapping
        {
            name: 'tools',
            type: 'checkbox',
            message: '🛠️  Include extra tools?',
            choices: [
                { name: 'None (no extra tools)', value: 'none' }, // ✅ ENABLED
                { name: 'ESLint + Prettier (Coming Soon)', value: 'eslint', disabled: '🚧 Coming Soon' },
                { name: 'Husky Pre-commit hooks (Coming Soon)', value: 'husky', disabled: '🚧 Coming Soon' },
                { name: 'Tailwind CSS (Coming Soon)', value: 'tailwind', disabled: '🚧 Coming Soon' },
                { name: 'Routing (React Router) (Coming Soon)', value: 'router', disabled: '🚧 Coming Soon' }
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
