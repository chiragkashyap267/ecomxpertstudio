const fs = require('fs');

const files = [
  'src/app/(site)/page.tsx',
  'src/app/(site)/portfolio/page.tsx',
  'src/app/(site)/layout.tsx',
  'src/components/GlowCard.tsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`Skipping ${file}`);
    return;
  }
  let content = fs.readFileSync(file, 'utf8');
  
  // Flip text-white to text-slate-900
  content = content.replace(/text-white\/([0-9]+)/g, 'text-slate-900/$1');
  content = content.replace(/text-white/g, 'text-slate-900');
  
  // Flip border-white to border-slate-900
  content = content.replace(/border-white\/([0-9]+)/g, 'border-slate-900/$1');
  
  // Flip bg-white to bg-slate-900 (for faint overlays)
  content = content.replace(/bg-white\/([0-9]+)/g, 'bg-slate-900/$1');
  
  // Flip bg-black/XX to bg-white/XX for overlays
  content = content.replace(/bg-black\/([0-9]+)/g, 'bg-white/$1');
  
  fs.writeFileSync(file, content);
  console.log(`Updated ${file}`);
});
