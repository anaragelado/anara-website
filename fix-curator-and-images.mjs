import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function main() {
  const imagesDir = path.join(process.cwd(), 'public/assets/images');
  const files = fs.readdirSync(imagesDir).filter(f => f.startsWith('cone-') && f.endsWith('.jpg'));
  
  const flavorsMap = new Set();
  const problematicFiles = [];
  const groupedRecord = {};
  
  for (const file of files) {
    const oldPath = path.join(imagesDir, file);
    const newFile = file.replace(/\.jpg$/, '.webp');
    const newPath = path.join(imagesDir, newFile);
    
    // Resize & convert to webp
    await sharp(oldPath)
      .resize({ width: 800, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(newPath);
      
    // Delete old jpg safely on Windows
    try {
      fs.unlinkSync(oldPath);
    } catch(e) {
      console.warn('Could not delete ' + oldPath, e.message);
    }
    
    if (newFile.includes('-no-v')) {
      continue;
    }
    if (newFile.includes('-didnt-i-sent')) {
      problematicFiles.push(newFile);
      continue;
    }
    
    const match = newFile.match(/^cone-(.+)-v\d+\.webp$/);
    if (match) {
      const slug = match[1];
      const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      flavorsMap.add(name);
      
      if (!groupedRecord[slug]) groupedRecord[slug] = [];
      groupedRecord[slug].push(newFile);
    }
  }
  
  const groupedFlavors = Object.entries(groupedRecord).map(([slug, images]) => {
    const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    // Sort intelligently by version number
    images.sort((a, b) => {
      const vA = parseInt(a.match(/-v(\d+)\.webp$/)[1]);
      const vB = parseInt(b.match(/-v(\d+)\.webp$/)[1]);
      return vA - vB;
    });
    return { slug, name, images };
  });

  groupedFlavors.sort((a, b) => a.name.localeCompare(b.name));
  
  // Create JSON for curator page
  const outputData = { groupedFlavors, problematicFiles };
  fs.writeFileSync(path.join(process.cwd(), 'src/data/flavor-curator-data.json'), JSON.stringify(outputData, null, 2));

  // Global codebase replacement .jpg -> .webp
  const getFiles = (dir, extFilter) => {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    for (const file of list) {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
         results = results.concat(getFiles(filePath, extFilter));
      } else if (extFilter.some(ext => file.endsWith(ext))) {
         results.push(filePath);
      }
    }
    return results;
  };
  
  const srcFiles = getFiles(path.join(process.cwd(), 'src'), ['.ts', '.tsx', '.json', '.js', '.jsx']);
  for (const file of srcFiles) {
    let content = fs.readFileSync(file, 'utf8');
    // We only replace cone-xxxxx.jpg to cone-xxxxx.webp safely
    const newContent = content.replace(/(cone-[a-zA-Z0-9-]+-v\d+)\.jpg/g, '$1.webp');
    if (content !== newContent) {
      fs.writeFileSync(file, newContent, 'utf8');
      console.log('Updated references in ' + file);
    }
  }

  // Print unique flavors for chat
  console.log('--- UNIQUE FLAVORS ---');
  Array.from(flavorsMap).sort().forEach(f => console.log('- ' + f));
}

main().catch(console.error);
