const fs = require('fs').promises;
const path = require('path');

const BACKEND_URL = process.env.BACKEND_URL || process.env.URL || 'http://localhost:4000';

// Use node-fetch for Node.js versions that don't have built-in fetch
let fetch;
if (typeof globalThis.fetch === 'undefined') {
  try {
    fetch = require('node-fetch').default;
  } catch (e) {
    console.error('node-fetch not available and no built-in fetch. Please install node-fetch or use Node.js 18+');
    process.exit(1);
  }
} else {
  fetch = globalThis.fetch;
}

async function fetchData(endpoint) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/${endpoint}`);
    if (!response.ok) {
      console.warn(`Failed to fetch ${endpoint}: ${response.status}`);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.warn(`Error fetching ${endpoint}:`, error.message);
    return null;
  }
}

async function syncArtworks() {
  console.log('Syncing artworks...');
  const data = await fetchData('artworks');

  if (data && data.artworks) {
    const artworksDir = path.join(__dirname, 'src', '_data');
    await fs.mkdir(artworksDir, { recursive: true });

    // Write artworks data for 11ty
    await fs.writeFile(
      path.join(artworksDir, 'artworks.json'),
      JSON.stringify(data, null, 2)
    );

    console.log(`✓ Synced ${data.artworks.length} artworks`);
  } else {
    // Create empty structure if no data
    const fallbackData = { artworks: [] };
    const artworksDir = path.join(__dirname, 'src', '_data');
    await fs.mkdir(artworksDir, { recursive: true });
    await fs.writeFile(
      path.join(artworksDir, 'artworks.json'),
      JSON.stringify(fallbackData, null, 2)
    );
    console.log('✓ Created empty artworks structure');
  }
}

async function syncPosts() {
  console.log('Syncing blog posts...');
  const data = await fetchData('posts');

  if (data && data.posts) {
    const postsDir = path.join(__dirname, 'src', '_data');
    await fs.mkdir(postsDir, { recursive: true });

    // Write posts data for 11ty
    await fs.writeFile(
      path.join(postsDir, 'posts.json'),
      JSON.stringify(data, null, 2)
    );

    console.log(`✓ Synced ${data.posts.length} blog posts`);
  } else {
    // Create empty structure if no data
    const fallbackData = { posts: [] };
    const postsDir = path.join(__dirname, 'src', '_data');
    await fs.mkdir(postsDir, { recursive: true });
    await fs.writeFile(
      path.join(postsDir, 'posts.json'),
      JSON.stringify(fallbackData, null, 2)
    );
    console.log('✓ Created empty posts structure');
  }
}

async function main() {
  console.log('Starting data sync...');

  try {
    await syncArtworks();
    await syncPosts();
    console.log('✓ Data sync completed successfully');
  } catch (error) {
    console.error('✗ Data sync failed:', error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { syncArtworks, syncPosts, main };