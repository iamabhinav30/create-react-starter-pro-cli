/**
 * 🧱 Utility: copyTemplate
 * ------------------------
 * This function handles copying the chosen template files into the
 * newly created project directory, and optionally updates metadata
 * like the project name in `package.json`.
 * 
 * 📦 Used in: bin/index.js
 *
 * SOLID Principles:
 * 🔸 S — Single Responsibility: Only responsible for copying and basic customization
 * 🔸 O — Open for Extension: Can support additional post-copy edits (like README updates)
 * 🔸 I — Interface Segregation: Doesn't mix with unrelated logic like dependency installation
 */

import fs from 'fs-extra'; // Enhanced FS module supporting promise-based file operations

/**
 * Copies a project template to the target directory and customizes the metadata.
 *
 * @param {string} sourceDir - The template folder to copy from.
 * @param {string} targetDir - The final project folder to create.
 * @param {object} options - CLI prompt result (e.g., projectName, tools).
 */
export async function copyTemplate(sourceDir, targetDir, options) {
    // 📁 Copy all files from the selected template into the user’s target directory
    await fs.copy(sourceDir, targetDir);

    // 📝 Update the project name in package.json (if it exists in the template)
    const pkgPath = `${targetDir}/package.json`;

    // Try reading and updating package.json safely
    try {
        const pkg = await fs.readJson(pkgPath);
        pkg.name = options.projectName;
        await fs.writeJson(pkgPath, pkg, { spaces: 2 });
    } catch (err) {
        console.warn('⚠️ Warning: package.json not found or could not be modified.');
    }

    // ✅ Template copied and customized
}
