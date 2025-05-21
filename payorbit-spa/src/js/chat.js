// src/js/chat.js

/**
 * Prepare a new chat message object.
 * @param {string} messageText - The message text.
 * @param {string} [avatar='assets/avatar-mentor.png'] - The avatar image path.
 * @param {string} [sender='you'] - Sender identifier.
 * @returns {Object} Message object with all info to render.
 */
export function createChatMessage(messageText, avatar = 'assets/avatar-mentor.png', sender = 'you') {
  return {
    sender,
    messageText,
    avatar,
    timestamp: new Date().toISOString(),
  };
}

/**
 * (Optional) Demo handler for file attachment (returns a stub).
 * @returns {string}
 */
export function handleAttachFile() {
  return 'File attachment is not implemented in this demo.';
}