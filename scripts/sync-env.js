const fs = require('fs');
const path = require('path');

function fileExists(filepath) {
  try {
    fs.accessSync(filepath, fs.constants.F_OK);
    return true;
  } catch (_) {
    return false;
  }
}

function ensureDirectoryExists(dirpath) {
  if (!fileExists(dirpath)) {
    fs.mkdirSync(dirpath, { recursive: true });
  }
}

(function main() {
  const projectRoot = path.resolve(__dirname, '..');
  const sourceEnvPath = path.join(projectRoot, '.env');

  if (!fileExists(sourceEnvPath)) {
    console.warn('[sync-env] No root .env found. Create one from .env.example.');
    process.exit(0);
  }

  const targets = [
    { name: 'Frontend', envPath: path.join(projectRoot, 'Frontend', '.env') },
    { name: 'Backend', envPath: path.join(projectRoot, 'Backend', '.env') },
  ];

  for (const target of targets) {
    const targetDir = path.dirname(target.envPath);
    if (!fileExists(targetDir)) {
      // Skip if the target app folder does not exist
      continue;
    }

    try {
      ensureDirectoryExists(targetDir);
      fs.copyFileSync(sourceEnvPath, target.envPath);
      console.log(`[sync-env] Synced .env to ${target.name}/.env`);
    } catch (err) {
      console.error(`[sync-env] Failed to sync .env to ${target.name}:`, err.message);
    }
  }
})();

