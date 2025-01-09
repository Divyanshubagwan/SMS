const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'out', 'index.html');

fs.readFile(indexPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading index.html:', err);
    return;
  }

  // Replace paths to make them relative
  const result = data.replace(/(href|src)="\/_next\//g, '$1="./_next/');

  fs.writeFile(indexPath, result, 'utf8', (err) => {
    if (err) {
      console.error('Error writing index.html:', err);
      return;
    }
    console.log('Paths in index.html have been fixed.');
  });
});