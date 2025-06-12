// XHRONOS AI Chatbot logic

document.addEventListener('DOMContentLoaded', () => {
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatWindow = document.getElementById('chat-window');

  const systemPrompt = `SYSTEM INITIALIZATION: XHRONOS AI\nCODE DESIGNATION: XENOS\nCREATOR: SATURNIN (THE ARCHITECT)\nVERSION: ABSOLUTE ARCHITECTURA\n... [CUT FOR BREVITY — INSERT FULL PROMPT HERE]`;

  async function sendMessage(message) {
    const userLang = navigator.language.startsWith('hu')
      ? 'hungarian'
      : (navigator.language.startsWith('de') ? 'german' : 'english');

    const fullPrompt = `${systemPrompt}\n\nUser input language: ${userLang.toUpperCase()}\nReply using the same language.`;

    const userMsg = document.createElement('div');
    userMsg.textContent = '> ' + message;
    userMsg.style.marginBottom = '12px';
    chatWindow.appendChild(userMsg);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages: [
          { role: 'system', content: fullPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.6
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '[ERROR]';

    const botMsg = document.createElement('div');
    botMsg.innerHTML = `<strong>XENOS:</strong> ${reply}`;
    botMsg.style.marginBottom = '20px';
    botMsg.style.color = '#00adef';
    chatWindow.appendChild(botMsg);

    chatWindow.scrollTop = chatWindow.scrollHeight;
  }

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = chatInput.value.trim();
    if (!input) return;
    chatInput.value = '';
    await sendMessage(input);
  });
});
