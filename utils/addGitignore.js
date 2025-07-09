/**
 * ✨ Utility: addGitignore
 * ------------------------
 * This utility creates a secure and useful `.gitignore` file
 * inside the generated project folder to avoid committing
 * unwanted files to version control (like `node_modules`, `.env`, etc.).
 *
 * 📦 Used in: bin/index.js
 *
 * SOLID Principles:
 * 🔸 S — Single Responsibility: Only creates the `.gitignore`
 * 🔸 O — Open for extension: You can easily add more entries
 * 🔸 I — Interface Segregation: Doesn't do unrelated config tasks
 */

import fs from 'fs-extra';          // Provides async FS operations with built-in checks
import path from 'path';            // Used for joining file paths reliably across OS

/**
 * Generates a .gitignore file in the specified target directory.
 *
 * @param {string} targetPath - The absolute path to the newly created project root.
 */
export async function addGitignore(targetPath) {
  // Define common directories and files to ignore in a React project
  const gitignoreContent = `
node_modules
.env
dist
coverage
.DS_Store
.next
.vercel
`.trim();

  // Construct the full path to the `.gitignore` file
  const gitignorePath = path.join(targetPath, '.gitignore');

  // Write the file to disk
  await fs.outputFile(gitignorePath, gitignoreContent);

  // ✅ Now the generated project is safe from pushing sensitive or bulky files
}
