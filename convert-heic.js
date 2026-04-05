const heicConvert = require('heic-convert');
const fs = require('fs');
const path = require('path');

const inputDir = path.join(__dirname, 'Bildspel');
const outputDir = path.join(__dirname, 'Bildspel');

const files = fs.readdirSync(inputDir).filter(f => f.toLowerCase().endsWith('.heic'));

async function convertAll() {
  for (const file of files) {
    const inputPath = path.join(inputDir, file);
    const outputName = file.replace(/\.heic$/i, '.jpg');
    const outputPath = path.join(outputDir, outputName);

    if (fs.existsSync(outputPath)) {
      console.log(`Skipping (exists): ${outputName}`);
      continue;
    }

    const inputBuffer = fs.readFileSync(inputPath);
    try {
      const outputBuffer = await heicConvert({
        buffer: inputBuffer,
        format: 'JPEG',
        quality: 0.88
      });
      fs.writeFileSync(outputPath, Buffer.from(outputBuffer));
      console.log(`Converted: ${file} → ${outputName}`);
    } catch (err) {
      console.error(`Failed: ${file} – ${err.message}`);
    }
  }
  console.log('Done.');
}

convertAll();
