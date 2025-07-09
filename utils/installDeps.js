/**
 * 📦 Utility: installDeps
 * ------------------------
 * This function installs all necessary npm dependencies inside the target
 * project directory. It can also install optional dev tools like Husky
 * based on user selection.
 * 
 * 🧠 Used in: bin/index.js
 *
 * SOLID Principles:
 * 🔸 S — Single Responsibility: Focuses only on dependency-related setup
 * 🔸 O — Open for Extension: Can support more tools (like Tailwind, ESLint)
 * 🔸 I — Interface Segregation: Doesn't deal with project structure or scaffolding
 * 🔸 D — Dependency Inversion: Uses `execa` abstracted process runner
 */

export async function installDeps(targetPath, tools = []) {
  const { execa } = await import('execa'); // Dynamically import to support ESM

  // 📦 Step 1: Run npm install inside the generated project directory
  console.log(`🔧 Installing dependencies in ${targetPath}...`);
  await execa('npm', ['install'], {
    cwd: targetPath,
    stdio: 'inherit', // Show real-time logs from terminal
  });

  // 🪝 Step 2: If user opted for Husky, set it up using husky-init
  if (tools.includes('husky')) {
    console.log('🪝 Setting up Husky for Git hooks...');
    await execa('npx', ['husky-init'], {
      cwd: targetPath,
      stdio: 'inherit',
    });

    // 📦 Install husky as a dev dependency after init
    await execa('npm', ['install'], {
      cwd: targetPath,
      stdio: 'inherit',
    });
  }

  // ✅ Done
  console.log('\n✅ Dependencies and tools installed successfully!\n');
}
