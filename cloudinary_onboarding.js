/**
 * Cloudinary Onboarding Script
 * 1) Upload a demo image
 * 2) Print secure URL + public ID
 * 3) Fetch and print metadata
 * 4) Generate an optimized transformed URL (f_auto + q_auto)
 *
 * Run: node cloudinary_onboarding.js
 */

const cloudinary = require('cloudinary').v2;

// Configure Cloudinary (inline credentials as required)
cloudinary.config({
  cloud_name: 'dahsfmv7b', // ← replace this if needed
  api_key: '367413197717465', // ← replace this if needed
  api_secret: 'a9osx8CLc1hVNyHwwZ9rhyqMfOo', // ← replace this if needed
});

async function main() {
  // Upload a sample image from Cloudinary's demo domain
  const uploadUrl = 'https://res.cloudinary.com/demo/image/upload/sample.jpg';

  const uploadResult = await cloudinary.uploader.upload(uploadUrl, {
    // Keep behavior simple for onboarding
    folder: 'onboarding',
  });

  console.log('--- Upload result ---');
  console.log('secure_url:', uploadResult.secure_url);
  console.log('public_id:', uploadResult.public_id);

  // Get image details (metadata)
  const details = await cloudinary.api.resource(uploadResult.public_id, {
    resource_type: 'image',
    // Public ID already identifies the uploaded file
    // We'll request raw fields for width/height/format
  });

  const width = details.width;
  const height = details.height;
  const format = details.format;
  const bytes = details.bytes;

  console.log('--- Image metadata ---');
  console.log('width:', width);
  console.log('height:', height);
  console.log('format:', format);
  console.log('file_size_bytes:', bytes);

  // Transform the image URL
  // f_auto: automatically pick the best image format for the viewer/client.
  // q_auto: automatically pick the best quality to balance size vs. perceptual quality.
  const transformedUrl = cloudinary.url(uploadResult.public_id, {
    transformation: [
      { format: 'auto' },
      { quality: 'auto' },
    ],
    secure: true,
  });

  console.log('--- Done! ---');
  console.log('Done! Click link below to see optimized version of the image. Check the size and the format.');
  console.log('transformed_url:', transformedUrl);
}

main().catch((err) => {
  console.error('Script failed:', err && err.message ? err.message : err);
  process.exit(1);
});

