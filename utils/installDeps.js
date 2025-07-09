/**
 * 📦 Utility: installDeps
 * ------------------------
 * Installs core React dependencies along with optional tools
 * like ESLint, Tailwind, Husky, and React Router — based on user selection.
 *
 * 🧠 Used in: bin/index.js
 *
 * SOLID Principles:
 * 🔸 S — Single Responsibility: Handles only package installations
 * 🔸 O — Open for Extension: Easily extendable for new tools
 * 🔸 L — Liskov Substitution: Respects input contract (targetPath, tools[])
 * 🔸 I — Interface Segregation: Doesn’t manage file structure or prompts
 * 🔸 D — Dependency Inversion: Uses `execa` to abstract away process execution
 */

export async function installDeps(targetPath, tools = []) {
  const { execa } = await import('execa'); // Dynamically import to support ESM
  const baseDeps = ['react', 'react-dom'];
  const devDeps = [];

  // 🧠 Optional tool-specific dependencies
  if (tools.includes('eslint')) {
    devDeps.push('eslint', 'eslint-plugin-react');
  }

  if (tools.includes('tailwind')) {
    devDeps.push('tailwindcss', 'postcss', 'autoprefixer');
  }

  if (tools.includes('router')) {
    baseDeps.push('react-router-dom');
  }

  if (tools.includes('husky')) {
    // husky will be initialized separately after main install
    devDeps.push('husky');
  }

  // 📦 Step 1: Install base dependencies
  if (baseDeps.length > 0) {
    console.log(`📦 Installing core dependencies: ${baseDeps.join(', ')}`);
    await execa('npm', ['install', ...baseDeps], {
      cwd: targetPath,
      stdio: 'inherit',
    });
  }

  // 🛠️ Step 2: Install dev dependencies
  if (devDeps.length > 0) {
    console.log(`🛠️  Installing dev tools: ${devDeps.join(', ')}`);
    await execa('npm', ['install', '-D', ...devDeps], {
      cwd: targetPath,
      stdio: 'inherit',
    });
  }

  // 🪝 Step 3: Run husky-init script if selected
  if (tools.includes('husky')) {
    console.log('🔧 Initializing Husky Git hooks...');
    await execa('npx', ['husky-init'], {
      cwd: targetPath,
      stdio: 'inherit',
    });

    // Re-run install to finalize hooks
    await execa('npm', ['install'], {
      cwd: targetPath,
      stdio: 'inherit',
    });
  }

  console.log('\n✅ All dependencies and tools have been installed successfully!\n');
}
