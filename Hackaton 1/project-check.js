const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const glob = require('glob');

const projectRoot = process.cwd();

// Helper to resolve possible static asset paths
function assetExists(assetPath) {
  if (!assetPath) return true; // ignore empty
  if (/^https?:\/\//.test(assetPath)) return true; // ignore external
  if (assetPath.startsWith('data:')) return true; // ignore data URLs
  const p = path.resolve(projectRoot, assetPath.replace(/^\//, ''));
  return fs.existsSync(p);
}

function extractCssUrls(cssFile) {
  const content = fs.readFileSync(cssFile, 'utf8');
  const urls = [];
  const urlRegex = /url\((['"]?)([^'")]+)\1\)/g;
  let match;
  while ((match = urlRegex.exec(content))) {
    urls.push(match[2]);
  }
  return urls;
}

function checkHtmlFile(filepath) {
  const html = fs.readFileSync(filepath, 'utf8');
  const $ = cheerio.load(html);
  const errors = [];
  const htmlDir = path.dirname(filepath);

  // Check <a href="">
  $('a[href]').each((_, el) => {
    const href = $(el).attr('href');
    if (
      href &&
      !/^#|^mailto:|^tel:|^javascript:|^https?:\/\//.test(href) &&
      !href.endsWith('.pdf') &&
      !href.includes('{{') // template
    ) {
      const target = path.resolve(htmlDir, href);
      if (!fs.existsSync(target)) {
        errors.push(`Broken link: <a href="${href}"> (target ${target} does not exist)`);
      }
    }
  });

  // Check <link rel="stylesheet">
  $('link[rel="stylesheet"]').each((_, el) => {
    const href = $(el).attr('href');
    if (href && !assetExists(href)) {
      errors.push(`Missing CSS: ${href}`);
    }
  });

  // Check <script src="">
  $('script[src]').each((_, el) => {
    const src = $(el).attr('src');
    if (src && !assetExists(src)) {
      errors.push(`Missing JS: ${src}`);
    }
  });

  // Check <img src="">
  $('img[src]').each((_, el) => {
    const src = $(el).attr('src');
    if (src && !assetExists(src)) {
      errors.push(`Missing image: ${src}`);
    }
  });

  // Check inline style background images
  $('[style]').each((_, el) => {
    const style = $(el).attr('style');
    const urlMatch = /url\((['"]?)([^'")]+)\1\)/.exec(style);
    if (urlMatch && !assetExists(urlMatch[2])) {
      errors.push(`Missing background-image: ${urlMatch[2]}`);
    }
  });

  return errors;
}

// Check all HTML, CSS asset usage, and summarize
async function main() {
  const htmlFiles = glob.sync('**/*.html', { cwd: projectRoot, ignore: 'node_modules/**' });
  const cssFiles = glob.sync('**/*.css', { cwd: projectRoot, ignore: 'node_modules/**' });

  let hasError = false;
  // HTML checks
  for (const file of htmlFiles) {
    const errors = checkHtmlFile(path.join(projectRoot, file));
    if (errors.length) {
      hasError = true;
      console.log(`\n[${file}]`);
      errors.forEach(e => console.log('  - ' + e));
    }
  }

  // CSS url() checks
  for (const cssFile of cssFiles) {
    const urls = extractCssUrls(path.join(projectRoot, cssFile));
    for (const url of urls) {
      if (!assetExists(url)) {
        hasError = true;
        console.log(`\n[${cssFile}]`);
        console.log(`  - Missing CSS asset: ${url}`);
      }
    }
  }

  if (!hasError) {
    console.log('✅ No missing assets or broken links detected!');
  }
}

function createMissingJsFiles(htmlFiles) {
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(html);
    $('script[src]').each((_, el) => {
      const src = $(el).attr('src');
      if (src && !assetExists(src) && src.endsWith('.js')) {
        const jsPath = path.resolve(projectRoot, src.replace(/^\//, ''));
        fs.mkdirSync(path.dirname(jsPath), { recursive: true });
        fs.writeFileSync(jsPath, '// Auto-generated stub JS file\n');
        console.log(`Created stub: ${jsPath}`);
      }
    });
  }
}
main();