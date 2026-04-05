const heicConvert = require('heic-convert');
const fs = require('fs');
const path = require('path');

const inputDir  = path.join(__dirname, 'Bilder årsmöte');
const outputDir = path.join(__dirname, 'Bilder årsmöte');

const files = fs.readdirSync(inputDir).filter(f => f.toLowerCase().endsWith('.heic'));

async function convertAll() {
  for (const file of files) {
    const inputPath  = path.join(inputDir, file);
    const outputName = file.replace(/\.heic$/i, '.jpg');
    const outputPath = path.join(outputDir, outputName);
    if (fs.existsSync(outputPath)) { console.log(`Skip: ${outputName}`); continue; }
    const buf = fs.readFileSync(inputPath);
    try {
      const out = await heicConvert({ buffer: buf, format: 'JPEG', quality: 0.88 });
      fs.writeFileSync(outputPath, Buffer.from(out));
      console.log(`OK: ${file} → ${outputName}`);
    } catch (e) { console.error(`FAIL: ${file} – ${e.message}`); }
  }
  console.log('Done.');
}
convertAll();
