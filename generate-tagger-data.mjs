import fs from 'fs';
import path from 'path';

function parseImageFlavor(filename) {
  let cleanName = filename.replace(/\.(png|jpe?g|webp)$/i, '');
  const prefixes = [
    'ice-cream-cone-',
    'product-double-scoop-',
    'product-single-scoop-',
    'promo-card-'
  ];
  for (const prefix of prefixes) {
    if (cleanName.startsWith(prefix)) {
      cleanName = cleanName.substring(prefix.length);
      break;
    }
  }
  return cleanName.split('-').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  ).join(' ');
}

const tempConesMap = {
    'IMG_20260412_104357.jpg': 'Oreo',
    'IMG_20260412_104438.jpg': 'Oreo',
    'IMG_20260412_104958.jpg': 'Morango',
    'IMG_20260412_105412.jpg': 'Natas',
    'IMG_20260412_105903.jpg': 'Baunilha Madagascar',
    'IMG_20260412_110253.jpg': 'Baunilha Madagascar',
    'IMG_20260412_110611.jpg': 'Limão',
    'IMG_20260412_110819.jpg': 'Coco',
    'IMG_20260412_111222.jpg': 'Banana da Madeira',
    'IMG_20260412_111608.jpg': 'Ananás',
    'IMG_20260412_111949.jpg': 'Doce de Leite Argentino',
    'IMG_20260412_112757.jpg': 'Meloa',
    'IMG_20260412_113342.jpg': 'Avelã Piedmont',
    'IMG_20260412_113759.jpg': 'Manga',
    'IMG_20260412_114011.jpg': 'Laranja do Algarve',
    'IMG_20260412_184152.jpg': 'Canela',
    'IMG_20260413_113933.jpg': 'Chocolate Belga',
    'IMG_20260413_173533.jpg': 'Chocolate Belga',
    'IMG_20260413_173902.jpg': 'Chocolate Belga c/ Laranja',
    'IMG_20260413_174437.jpg': 'Chocolate Belga',
    'IMG_20260413_175926.jpg': 'Café',
    'IMG_20260413_180559.jpg': 'Melancia',
    'IMG_20260413_180852.jpg': 'Melancia',
    'IMG_20260413_181154.jpg': 'Morango',
    'IMG_20260414_130038.jpg': 'Caramelo salgado'
};

const initialFlavors = [];

const tempConesDir = path.join(process.cwd(), 'public/assets/temp-cones');
if (fs.existsSync(tempConesDir)) {
  const files = fs.readdirSync(tempConesDir).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  files.forEach(file => {
    initialFlavors.push({
      filename: file,
      src: `/assets/temp-cones/${file}`,
      suggestion: tempConesMap[file] || '',
      status: 'pending',
      finalName: ''
    });
  });
}

const imagesDir = path.join(process.cwd(), 'public/assets/images');
if (fs.existsSync(imagesDir)) {
  const files = fs.readdirSync(imagesDir).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  const prefixes = [
    'ice-cream-cone-',
    'product-double-scoop-',
    'product-single-scoop-',
    'promo-card-'
  ];
  files.forEach(file => {
    if (prefixes.some(p => file.startsWith(p))) {
      initialFlavors.push({
        filename: file,
        src: `/assets/images/${file}`,
        suggestion: parseImageFlavor(file),
        status: 'pending',
        finalName: ''
      });
    }
  });
}

fs.writeFileSync(
  path.join(process.cwd(), 'src/data/flavor-tagger-images.json'), 
  JSON.stringify(initialFlavors, null, 2)
);
console.log('Successfully generated src/data/flavor-tagger-images.json');
