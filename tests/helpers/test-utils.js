const path = require('path');

/**
 * Get the file:// URL for the index.html file
 * This is used to load the local HTML file in tests
 * @returns {string} The file URL to the index.html
 */
function getFileUrl() {
  const indexPath = path.join(__dirname, '../../index.html');
  return `file://${indexPath}`;
}

module.exports = {
  getFileUrl
};
