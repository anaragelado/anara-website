import fs from 'fs';
import path from 'path';

const rawData = `IMG_20260412_104357.jpg -> Oreo (Save as: cone-oreo-v1.jpg)
IMG_20260412_104438.jpg -> Oreo (Save as: cone-oreo-v2.jpg)
IMG_20260412_104958.jpg -> Raspberry (Save as: cone-raspberry-v1.jpg)
IMG_20260412_105412.jpg -> No (Save as: cone-no-v1.jpg)
IMG_20260412_105903.jpg -> Hazelnut Piemont (Save as: cone-hazelnut-piemont-v1.jpg)
IMG_20260412_110253.jpg -> Hazelnut (Save as: cone-hazelnut-v1.jpg)
IMG_20260412_110611.jpg -> Coconut (Save as: cone-coconut-v1.jpg)
IMG_20260412_110819.jpg -> No (Save as: cone-no-v2.jpg)
IMG_20260412_111222.jpg -> Natas (Save as: cone-natas-v1.jpg)
IMG_20260412_111608.jpg -> Natas (Save as: cone-natas-v2.jpg)
IMG_20260412_111949.jpg -> Doce de Leite Argentino (Save as: cone-doce-de-leite-argentino-v1.jpg)
IMG_20260412_112757.jpg -> Pineapple (Save as: cone-pineapple-v1.jpg)
IMG_20260412_113342.jpg -> Cinnamon (Save as: cone-cinnamon-v1.jpg)
IMG_20260412_113759.jpg -> Algarve Orange (Save as: cone-algarve-orange-v1.jpg)
IMG_20260412_114011.jpg -> Algarve Orange (Save as: cone-algarve-orange-v2.jpg)
IMG_20260412_184152.jpg -> Peanut with Chocolate Chunks (Save as: cone-peanut-with-chocolate-chunks-v1.jpg)
IMG_20260412_184243.jpg -> Pineapple   (Save as: cone-pineapple-v2.jpg)
IMG_20260412_184545.jpg -> Pineapple (Save as: cone-pineapple-v3.jpg)
IMG_20260412_185103.jpg -> Baunilha Bourbon Madagascar (Save as: cone-baunilha-bourbon-madagascar-v1.jpg)
IMG_20260412_185151.jpg -> No (Save as: cone-no-v3.jpg)
IMG_20260413_113933.jpg -> No (Save as: cone-no-v4.jpg)
IMG_20260413_173533.jpg -> Belgian Chocolate (Save as: cone-belgian-chocolate-v1.jpg)
IMG_20260413_173902.jpg -> No (Save as: cone-no-v5.jpg)
IMG_20260413_174437.jpg -> Belgian Chocolate (Save as: cone-belgian-chocolate-v2.jpg)
IMG_20260413_175926.jpg -> Coffee (Save as: cone-coffee-v1.jpg)
IMG_20260413_180559.jpg -> Strawberry (Save as: cone-strawberry-v1.jpg)
IMG_20260413_180852.jpg -> Strawberry (Save as: cone-strawberry-v2.jpg)
IMG_20260413_181154.jpg -> Strawberry (Save as: cone-strawberry-v3.jpg)
IMG_20260413_181533.jpg -> Carrot Cake (Save as: cone-carrot-cake-v1.jpg)
IMG_20260414_125252.jpg -> Mango (Save as: cone-mango-v1.jpg)
IMG_20260414_125457.jpg -> Mango (Save as: cone-mango-v2.jpg)
IMG_20260414_130038.jpg -> Cinnamon (Save as: cone-cinnamon-v2.jpg)
ice-cream-cone-lemon-brown-background.jpeg -> No (Save as: cone-no-v6.jpg)
ice-cream-cone-vanilla-watermelon-symbol-background.jpeg -> No (Save as: cone-no-v7.jpg)
product-double-scoop-apricot-chocolate-gelato-outdoor.jpg -> No (Save as: cone-no-v8.jpg)
product-double-scoop-chocolate-cream-cone.jpg -> No (Save as: cone-no-v9.jpg)
product-double-scoop-chocolate-strawberry-cone.jpg -> No (Save as: cone-no-v10.jpg)
product-double-scoop-chocolate-white-cone-closeup.jpg -> No (Save as: cone-no-v11.jpg)
product-double-scoop-chocolate-white-cone.jpg -> No (Save as: cone-no-v12.jpg)
product-double-scoop-strawberry-vanilla-cone.jpg -> No (Save as: cone-no-v13.jpg)
product-single-scoop-cookies-cream-gelato-closeup.jpg -> No (Save as: cone-no-v14.jpg)
product-single-scoop-dark-chocolate-gelato-closeup.jpg -> Belgian Chocolate (Save as: cone-belgian-chocolate-v3.jpg)
product-single-scoop-dark-chocolate-gelato-v1.jpg -> Belgian Chocolate with Algarve Orange (Save as: cone-belgian-chocolate-with-algarve-orange-v1.jpg)
product-single-scoop-dark-chocolate-gelato-v2.jpg -> Belgian Chocolate with Algarve Orange (Save as: cone-belgian-chocolate-with-algarve-orange-v2.jpg)
product-single-scoop-marble-chocolate-vanilla-gelato.jpg -> No (Save as: cone-no-v15.jpg)
product-single-scoop-matcha-green-gelato-closeup.jpg -> No (Save as: cone-no-v16.jpg)
product-single-scoop-matcha-green-gelato-large-scoop.jpg -> Salted Pistachio (Save as: cone-salted-pistachio-v1.jpg)
product-single-scoop-strawberry-gelato-hero.jpg -> Morango Natas com calda de Morango (Save as: cone-morango-natas-com-calda-de-morango-v1.jpg)
product-single-scoop-strawberry-gelato-outdoor-closeup.jpg -> No (Save as: cone-no-v17.jpg)
product-single-scoop-vanilla-cream-gelato-studio.jpg -> Natas (Save as: cone-natas-v3.jpg)
promo-card-apricot-gelato-single-scoop.webp -> No (Save as: cone-no-v18.jpg)
promo-card-basil-gelato-single-scoop.jpg -> No (Save as: cone-no-v19.jpg)
promo-card-belgian-chocolate-orange-gelato-double-scoop.webp -> No (Save as: cone-no-v20.jpg)
promo-card-chocolate-gelato-single-scoop-outdoor.webp -> No (Save as: cone-no-v21.jpg)
promo-card-chocolate-mascarpone-lemon-gelato-double-scoop.jpg -> No (Save as: cone-no-v22.jpg)
promo-card-chocolate-orange-coconut-gelato-double-scoop.webp -> No (Save as: cone-no-v23.jpg)
promo-card-chocolate-strawberry-gelato-double-scoop.webp -> No (Save as: cone-no-v24.jpg)
promo-card-chocolate-strawberry-morango-familia-gelato.jpg -> No (Save as: cone-no-v25.jpg)
promo-card-coffee-orange-spice-chocolate-gelato.webp -> No (Save as: cone-no-v26.jpg)
promo-card-mascarpone-mango-passionfruit-gelato.webp -> No (Save as: cone-no-v27.jpg)
promo-card-natas-toffee-caramel-gelato-double-scoop.webp -> Didn't I sent you one without text?text? (Save as: cone-didnt-i-sent-you-one-without-texttext-v1.jpg)
promo-card-pastel-de-nata-gelato-single-scoop.webp -> Didn't I sent you one without text?  (Save as: cone-didnt-i-sent-you-one-without-text-v1.jpg)
promo-card-persimmon-cinnamon-gelato-double-scoop.webp -> No (Save as: cone-no-v28.jpg)
promo-card-salted-pistachio-gelato-single-scoop.webp -> No (Save as: cone-no-v29.jpg)
promo-card-strawberry-gelato-last-day-season.webp -> No (Save as: cone-no-v30.jpg)
promo-card-watermelon-gelato-single-scoop-v1.webp -> Watermelon (Save as: cone-watermelon-v1.jpg)
promo-card-watermelon-gelato-single-scoop-v2.webp -> Didn't I sent you one without text? (Save as: cone-didnt-i-sent-you-one-without-text-v2.jpg)`;

const mappings = rawData.split('\n').filter(Boolean).map(line => {
  const [oldParts, rest] = line.split(' -> ');
  const oldFilename = oldParts.trim();
  const newFilenameMatch = rest.match(/Save as:\s+(.*)\)$/);
  const newFilename = newFilenameMatch ? newFilenameMatch[1].trim() : null;
  return { oldFilename, newFilename };
}).filter(m => m.newFilename);

const baseDir = process.cwd();
const publicImagesDir = path.join(baseDir, 'public/assets/images');
const tempConesDir = path.join(baseDir, 'public/assets/temp-cones');

const changedMapping = [];

for (const { oldFilename, newFilename } of mappings) {
  let oldPath = path.join(tempConesDir, oldFilename);
  if (!fs.existsSync(oldPath)) {
    oldPath = path.join(publicImagesDir, oldFilename);
  }
  
  const newPath = path.join(publicImagesDir, newFilename);
  
  if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, newPath);
    // Track replacing logic just in case the path was absolute /assets/...
    changedMapping.push({
      oldValue: oldFilename,
      newValue: newFilename
    });
    // Also change the "/assets/temp-cones" path to "/assets/images" on next replace.
  }
}

// Ensure the code paths in temp-cones now point to images
changedMapping.push({
  oldValue: '/assets/temp-cones',
  newValue: '/assets/images'
});

const getFiles = (dir, extFilter) => {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(filePath, extFilter));
    } else {
      if (extFilter.some(ext => file.endsWith(ext))) {
        results.push(filePath);
      }
    }
  }
  return results;
};

const targetExts = ['.ts', '.tsx', '.json', '.js', '.jsx'];
const srcFiles = getFiles(path.join(baseDir, 'src'), targetExts);

for (const file of srcFiles) {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  for (const mapping of changedMapping) {
    const oldRegex = new RegExp(mapping.oldValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    content = content.replace(oldRegex, mapping.newValue);
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated file references in: ${file}`);
  }
}

// Cleanup phase
if (fs.existsSync(tempConesDir)) {
  const contents = fs.readdirSync(tempConesDir);
  if (contents.length === 0) {
    fs.rmdirSync(tempConesDir);
    console.log('Deleted temp-cones directory');
  } else {
    console.log('temp-cones not deleted, contains files:', contents);
  }
}

console.log('Bulk processing completed successfully!');
