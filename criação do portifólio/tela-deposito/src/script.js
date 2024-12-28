document.getElementById('method').addEventListener('change', function() {
    const method = this.value;
    const paymentDetails = document.getElementById('payment-details');

    paymentDetails.innerHTML = ''; // Limpar detalhes anteriores

    if (method === 'credit-card' || method === 'debit-card') {
        paymentDetails.innerHTML = `
            <label for="card-number">Número do Cartão:</label>
            <input type="text" id="card-number" name="card-number" required pattern="\\d{16}">

            <label for="expiry-date">Data de Validade:</label>
            <input type="text" id="expiry-date" name="expiry-date" required placeholder="MM/AA" pattern="\\d{2}/\\d{2}">

            <label for="cvv">CVV:</label>
            <input type="text" id="cvv" name="cvv" required pattern="\\d{3}">
        `;
    } else if (method === 'paypal') {
        paymentDetails.innerHTML = `
            <label for="paypal-email">Email do PayPal:</label>
            <input type="email" id="paypal-email" name="paypal-email" required>
        `;
    } else if (method === 'bank-transfer') {
        paymentDetails.innerHTML = `
            <label for="account-number">Número da Conta:</label>
            <input type="text" id="account-number" name="account-number" required>

            <label for="bank-code">Código do Banco:</label>
            <input type="text" id="bank-code" name="bank-code" required>
        `;
    }
});

document.getElementById('deposit-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const amount = document.getElementById('amount').value;
    const method = document.getElementById('method').value;

    alert(`Depósito de R$ ${amount} realizado com sucesso via ${method}.`);

    // Aqui você pode adicionar a lógica para processar o depósito no backend
});

/* chatbot */ 

const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const sendBtn = document.getElementById('send-btn');
const chatbotIcon = document.getElementById('chatbot-icon');
const chatbotContainer = document.getElementById('chatbot-container');
const closeBtn = document.getElementById('close-btn');

chatbotIcon.addEventListener('click', function() {
    chatbotContainer.style.display = 'flex';
});

closeBtn.addEventListener('click', function() {
    chatbotContainer.style.display = 'none';
});

sendBtn.addEventListener('click', function() {
    const userMessage = chatbotInput.value;
    if (userMessage.trim()) {
        addMessageToChat('Usuário', userMessage, 'src/usuario.jpg');  
        chatbotInput.value = '';
        getChatbotResponse(userMessage);
    }
});

chatbotInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendBtn.click();
    }
});

function addMessageToChat(sender, message, imageSrc) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    if (sender === 'Usuário') {
        messageElement.classList.add('user-message');
    } else {
        messageElement.classList.add('chatbot-message');
    }

    const imageElement = document.createElement('img');
    imageElement.src = imageSrc;
    messageElement.appendChild(imageElement);

    const messageText = document.createElement('div');
    messageText.classList.add('message-text');
    messageText.textContent = message;
    messageElement.appendChild(messageText);

    chatbotMessages.appendChild(messageElement);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getChatbotResponse(userMessage) {
    // Lógica simples de resposta do chatbot
    let botResponse = 'Desculpe, não entendi sua mensagem.';

    if (userMessage.toLowerCase().includes('olá')) {
        botResponse = 'Olá! Como posso ajudar você hoje?';
    } else if (userMessage.toLowerCase().includes('como funciona?')) {
        botResponse = 'Uma casa de apostas é como uma espécie de "palpiteiro oficial". Ela oferece diversas opções de apostas em diversos eventos, principalmente esportivos. Você escolhe em qual evento quer apostar e qual o resultado você acha que vai acontecer..';
    }

    addMessageToChat('Chatbot', botResponse, 'src/logo.png'); 
}


/* fim chatbot */ 