import fs from 'fs-extra';
import path from 'path';

export async function configureTools(targetPath, tools = []) {
    if (tools.includes('eslint')) {
        await addESLint(targetPath);
    }
    if (tools.includes('tailwind')) {
        await addTailwind(targetPath);
    }
    if (tools.includes('husky')) {
        await addHuskyScripts(targetPath);
    }
    if (tools.includes('router')) {
        await addRouterFiles(targetPath);
    }
}

// Example function
async function addESLint(targetPath) {
    const eslintrc = {
        extends: ['eslint:recommended', 'plugin:react/recommended'],
        parserOptions: {
            ecmaVersion: 2020,
            sourceType: 'module',
            ecmaFeatures: { jsx: true },
        },
        env: {
            browser: true,
            node: true,
        },
        rules: {}
    };
    await fs.writeJson(path.join(targetPath, '.eslintrc.json'), eslintrc, { spaces: 2 });
}

// Repeat for Tailwind, Router, etc.
