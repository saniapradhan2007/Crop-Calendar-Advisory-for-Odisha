/* AI Chatbot Assistant Script */

let chatHistory = [];

async function sendChatMessage(presetQuestion = null) {
  const inputEl = document.getElementById('chatInput');
  const chatContainer = document.getElementById('chatBoxContainer');
  if (!chatContainer) return;

  const question = presetQuestion || (inputEl ? inputEl.value.trim() : '');
  if (!question) return;

  if (inputEl) inputEl.value = '';

  // Append user message
  appendMessage('user', question);

  // Show typing animation
  const typingId = 'typing_' + Date.now();
  chatContainer.insertAdjacentHTML('beforeend', `
    <div id="${typingId}" class="chat-message chat-bot">
      <i class="fas fa-robot text-primary me-2"></i>
      <span class="spinner-grow spinner-grow-sm text-primary" role="status"></span>
      <span class="ms-1 text-muted">Odisha Krushi AI is thinking...</span>
    </div>
  `);
  chatContainer.scrollTop = chatContainer.scrollHeight;

  try {
    const res = await fetch('/api/chatbot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, language: currentLang })
    });
    const data = await res.json();

    document.getElementById(typingId)?.remove();

    if (data.success) {
      appendMessage('bot', data.answer);
    } else {
      appendMessage('bot', '⚠️ Sorry, I could not process your query right now. Please try again.');
    }
  } catch (err) {
    document.getElementById(typingId)?.remove();
    appendMessage('bot', '⚠️ Server connection error. Please check your internet connection.');
  }
}

function appendMessage(sender, text) {
  const chatContainer = document.getElementById('chatBoxContainer');
  if (!chatContainer) return;

  const messageDiv = document.createElement('div');
  messageDiv.className = `chat-message ${sender === 'user' ? 'chat-user' : 'chat-bot'}`;

  const formattedText = text.replace(/\n/g, '<br>');

  if (sender === 'bot') {
    messageDiv.innerHTML = `
      <div class="d-flex align-items-center justify-content-between mb-1">
        <strong class="text-primary"><i class="fas fa-robot me-1"></i>Krushi AI Assistant</strong>
        <button onclick="speakText(\`${text.replace(/'/g, "\\'").replace(/"/g, '&quot;')}\`)" class="btn btn-sm btn-link p-0 text-muted" title="Listen Voice">
          <i class="fas fa-volume-up"></i>
        </button>
      </div>
      <div>${formattedText}</div>
    `;
  } else {
    messageDiv.innerHTML = `<div>${formattedText}</div>`;
  }

  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// Voice input handler (Web Speech API)
function startVoiceRecognition() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showToast('Voice speech recognition not supported in this browser.', 'error');
    return;
  }

  const recognition = new SpeechRecognition();
  recognition.lang = currentLang === 'or' ? 'or-IN' : 'en-IN';
  recognition.interimResults = false;

  showToast('🎙️ Listening... Speak your question now', 'info');

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const inputEl = document.getElementById('chatInput');
    if (inputEl) inputEl.value = transcript;
    sendChatMessage(transcript);
  };

  recognition.onerror = (err) => {
    showToast('Voice recognition error: ' + err.error, 'error');
  };

  recognition.start();
}

document.addEventListener('DOMContentLoaded', () => {
  const sendBtn = document.getElementById('sendChatBtn');
  const chatInput = document.getElementById('chatInput');
  const voiceBtn = document.getElementById('voiceInputBtn');

  if (sendBtn) sendBtn.addEventListener('click', () => sendChatMessage());
  if (chatInput) {
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendChatMessage();
    });
  }
  if (voiceBtn) voiceBtn.addEventListener('click', startVoiceRecognition);
});
