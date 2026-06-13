const fs = require('fs');
const path = require('path');

const files = [
  'src/components/Footer.tsx',
  'src/components/Navbar.tsx',
  'src/components/LoadingScreen.tsx',
  'src/components/CanvasParticles.tsx',
  'src/app/(site)/about/page.tsx',
  'src/app/(site)/services/page.tsx',
  'src/app/(site)/contact/page.tsx',
  'src/app/(site)/page.tsx' // There are still issues on Home page according to user "in the home page only the mockups visible"
];

files.forEach(file => {
  const fullPath = path.join('d:/Next JS apps/ecomxpertstudio', file);
  if (!fs.existsSync(fullPath)) {
    console.log(`Skipping ${file}`);
    return;
  }
  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Basic replacements for light theme
  content = content.replace(/text-white\/([0-9]+)/g, 'text-slate-900/$1');
  content = content.replace(/text-white/g, 'text-slate-900');
  content = content.replace(/border-white\/([0-9]+)/g, 'border-slate-900/$1');
  content = content.replace(/bg-white\/([0-9]+)/g, 'bg-slate-900/$1');
  content = content.replace(/bg-black\/([0-9]+)/g, 'bg-white/$1');
  
  fs.writeFileSync(fullPath, content);
  console.log(`Updated ${file}`);
});
