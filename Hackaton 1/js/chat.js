// Chat message append (demo/client-side only)
document.addEventListener('DOMContentLoaded', function() {
    const chatInputForm = document.getElementById('chatInputForm');
    if (chatInputForm) {
        chatInputForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const chatInput = document.getElementById('chatInput');
            const chatArea = document.getElementById('chatArea');
            const messageText = chatInput.value.trim();
            if (!messageText) return;
            // Create message bubble
            const msgDiv = document.createElement('div');
            msgDiv.className = 'chat-message sent';
            msgDiv.innerHTML = `
                <img class="avatar" src="assets/avatar-mentor.png" alt="You">
                <div class="chat-bubble">${messageText}</div>
            `;
            chatArea.appendChild(msgDiv);
            chatArea.scrollTop = chatArea.scrollHeight;
            chatInput.value = '';
        });
    }
});