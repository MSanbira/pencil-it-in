// Content script - runs on every page
console.log('Chrome extension loaded!');

// Example: Add a simple message to the page
const message = document.createElement('div');
message.textContent = 'Extension is active!';
message.id = 'extension-message';
document.body.appendChild(message);
