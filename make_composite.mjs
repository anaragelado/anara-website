import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function main() {
  const dir = path.join(process.cwd(), 'public/assets/temp-cones');
  const files = fs.readdirSync(dir).filter(f => f.toLowerCase().endsWith('.jpg'));
  
  const cols = 8;
  const rows = Math.ceil(files.length / cols);
  const cellW = 300;
  const cellH = 400; // a bit taller for cones
  
  const compositeItems = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const x = (i % cols) * cellW;
    const y = Math.floor(i / cols) * cellH;
    
    const svgText = `
      <svg width="${cellW}" height="${cellH}">
        <rect x="0" y="0" width="${cellW}" height="30" fill="white" opacity="0.9" />
        <text x="5" y="20" font-family="sans-serif" font-size="16" fill="black" font-weight="bold">${file}</text>
      </svg>
    `;
    
    const resized = await sharp(path.join(dir, file))
      .resize(cellW, cellH, { fit: 'cover' })
      .composite([{ input: Buffer.from(svgText), top: 0, left: 0 }])
      .jpeg()
      .toBuffer();
      
    compositeItems.push({
      input: resized,
      top: y,
      left: x
    });
  }
  
  await sharp({
    create: {
      width: cols * cellW,
      height: rows * cellH,
      channels: 3,
      background: { r: 255, g: 255, b: 255 }
    }
  })
  .composite(compositeItems)
  .jpeg({ quality: 80 })
  .toFile('composite.jpg');
  
  console.log('Done creating composite.jpg');
}

main().catch(console.error);
