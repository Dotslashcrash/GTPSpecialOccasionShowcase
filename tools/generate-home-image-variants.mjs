import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';
import { occasions } from '../src/content/occasions.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.join(root, 'public', 'media', 'home');
const widths = [480, 800, 1200];

await mkdir(outputDirectory, { recursive: true });

for (const occasion of occasions) {
  const source = path.join(root, 'public', occasion.heroImage.replace(/^\//, ''));
  for (const width of widths) {
    const destination = path.join(outputDirectory, `${occasion.slug}-${width}.webp`);
    await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(destination);
  }
}

console.log(`Generated ${occasions.length * widths.length} responsive homepage images.`);
