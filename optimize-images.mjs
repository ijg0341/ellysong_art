import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const galleryDir = join(__dirname, 'public', 'images', 'gallery');
const TARGET_SIZE_MB = 2.9; // Target 2.9MB to ensure under 3MB after filesystem rounding
const TARGET_SIZE_BYTES = TARGET_SIZE_MB * 1024 * 1024;

async function optimizeImage(filePath) {
  try {
    console.log(`Processing: ${filePath}`);

    // Get original metadata
    const metadata = await sharp(filePath).metadata();
    console.log(`  Original: ${metadata.width}x${metadata.height}, ${metadata.space}, ${(metadata.size / 1024 / 1024).toFixed(2)}MB`);

    // Start with quality 90
    let quality = 90;
    let outputBuffer;
    let attempts = 0;
    const maxAttempts = 10;

    while (attempts < maxAttempts) {
      // Convert to RGB and optimize
      outputBuffer = await sharp(filePath)
        .toColorspace('srgb') // Convert CMYK to RGB
        .jpeg({
          quality,
          mozjpeg: true, // Use mozjpeg for better compression
        })
        .toBuffer();

      const outputSize = outputBuffer.length;
      console.log(`  Attempt ${attempts + 1}: quality=${quality}, size=${(outputSize / 1024 / 1024).toFixed(2)}MB`);

      if (outputSize <= TARGET_SIZE_BYTES) {
        // Success! Write the optimized image
        await sharp(outputBuffer).toFile(filePath);
        console.log(`  ✓ Optimized successfully at quality ${quality}`);
        return true;
      }

      // Reduce quality for next attempt
      quality -= 5;
      attempts++;

      if (quality < 50) {
        // If quality is too low, try resizing instead
        const scale = Math.sqrt(TARGET_SIZE_BYTES / outputSize);
        const newWidth = Math.floor(metadata.width * scale * 0.9); // 0.9 for safety margin

        console.log(`  Quality too low, resizing to width: ${newWidth}`);

        // Try multiple resize attempts to ensure under 3MB
        let resizeQuality = 85;
        let resizeWidth = newWidth;

        for (let i = 0; i < 5; i++) {
          outputBuffer = await sharp(filePath)
            .toColorspace('srgb')
            .resize(resizeWidth, null, {
              fit: 'inside',
              withoutEnlargement: true,
            })
            .jpeg({
              quality: resizeQuality,
              mozjpeg: true,
            })
            .toBuffer();

          const currentSize = outputBuffer.length;
          console.log(`    Resize attempt ${i + 1}: width=${resizeWidth}, quality=${resizeQuality}, size=${(currentSize / 1024 / 1024).toFixed(2)}MB`);

          if (currentSize <= TARGET_SIZE_BYTES) {
            await sharp(outputBuffer).toFile(filePath);
            console.log(`  ✓ Resized and optimized: ${(currentSize / 1024 / 1024).toFixed(2)}MB`);
            return true;
          }

          // Reduce both quality and size for next attempt
          resizeQuality = Math.max(60, resizeQuality - 5);
          resizeWidth = Math.floor(resizeWidth * 0.9);
        }

        // Last resort: use the last buffer even if slightly over
        await sharp(outputBuffer).toFile(filePath);
        const finalSize = outputBuffer.length;
        console.log(`  ⚠ Resized (slightly over target): ${(finalSize / 1024 / 1024).toFixed(2)}MB`);
        return true;
      }
    }

    console.log(`  ✗ Failed to optimize under ${TARGET_SIZE_MB}MB`);
    return false;
  } catch (error) {
    console.error(`  ✗ Error processing ${filePath}:`, error.message);
    return false;
  }
}

async function main() {
  try {
    const files = await readdir(galleryDir);
    const imageFiles = files.filter(file =>
      /\.(jpg|jpeg)$/i.test(file)
    );

    console.log(`Found ${imageFiles.length} images to process\n`);

    let successCount = 0;
    let failCount = 0;

    for (const file of imageFiles) {
      const filePath = join(galleryDir, file);
      const success = await optimizeImage(filePath);

      if (success) {
        successCount++;
      } else {
        failCount++;
      }

      console.log('---\n');
    }

    console.log(`\nComplete!`);
    console.log(`Success: ${successCount}`);
    console.log(`Failed: ${failCount}`);

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
