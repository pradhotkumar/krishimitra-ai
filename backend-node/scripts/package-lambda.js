const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('📦 Creating Lambda deployment package...');

// Create dist directory if not exists
if (!fs.existsSync('dist')) {
  console.error('❌ dist/ folder not found. Run npm run build first.');
  process.exit(1);
}

// Copy package.json to dist for npm install
fs.copyFileSync('package.json', path.join('dist', 'package.json'));

// Install production dependencies in dist
console.log('📥 Installing production dependencies...');
execSync('cd dist && npm install --production --omit=dev', { stdio: 'inherit' });

// Create zip
console.log('🗜️  Zipping...');
execSync('cd dist && zip -r ../krishimitra-lambda.zip .', { stdio: 'inherit' });

console.log('✅ Done! Upload krishimitra-lambda.zip to AWS Lambda.');
console.log('   Handler: lambda.handler');
