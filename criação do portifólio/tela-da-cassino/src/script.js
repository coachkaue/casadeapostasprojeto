document.addEventListener('DOMContentLoaded', () => {
    // Slider
    const slider = document.querySelectorAll('.slider');
    const btnPrev = document.getElementById('prev-button');
    const btnNext = document.getElementById('next-button');

    let currentSlide = 0;

    function hideSlider() {
        slider.forEach(item => item.classList.remove('on'));
    }

    function showSlider() {
        slider[currentSlide].classList.add('on');
    }

    function nextSlider() {
        hideSlider();
        if (currentSlide === slider.length - 1) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }
        showSlider();
    }

    function prevSlider() {
        hideSlider();
        if (currentSlide === 0) {
            currentSlide = slider.length - 1;
        } else {
            currentSlide--;
        }
        showSlider();
    }

    setInterval(nextSlider, 2000);

    if (btnNext && btnPrev) {
        btnNext.addEventListener('click', nextSlider);
        btnPrev.addEventListener('click', prevSlider);
    }

    
    const carousel = document.querySelector(".carousel");
    const arrowBtns = document.querySelectorAll(".wrapper i");
    const firstCardwidth = carousel ? carousel.querySelector(".card").offsetWidth : 0;

    let isDragging = false, startX, startScrollLeft;

    if (carousel) {
        arrowBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                carousel.scrollLeft += btn.id === "left" ? -firstCardwidth : firstCardwidth;
            });
        });

        const dragStart = (e) => {
            isDragging = true;
            carousel.classList.add("dragging");
            startX = e.pageX;
            startScrollLeft = carousel.scrollLeft;
        }

        const dragging = (e) => {
            if (!isDragging) return;
            carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
        }

        const dragStop = () => {
            isDragging = false;
            carousel.classList.remove("dragging");
        }

        carousel.addEventListener("mousedown", dragStart);
        carousel.addEventListener("mousemove", dragging);
        document.addEventListener("mouseup", dragStop);
    }
});

// Segundo carrosel de jogos
const carouselContainer = document.querySelector(".carousel-items");
const navigationButtons = document.querySelectorAll(".carousel-wrapper i");
const cardWidth = carouselContainer ? carouselContainer.querySelector(".carousel-card").offsetWidth : 0;

if (carouselContainer) {
    navigationButtons.forEach(button => {
        button.addEventListener("click", () => {
            carouselContainer.scrollLeft += button.id === "left-arrow" ? -cardWidth : cardWidth;
        });
    });

    const startDrag = (event) => {
        isDragging = true;
        carouselContainer.classList.add("dragging");
        startX = event.pageX;
        initialScrollLeft = carouselContainer.scrollLeft;
    }

    const performDrag = (event) => {
        if (!isDragging) return;
        carouselContainer.scrollLeft = initialScrollLeft - (event.pageX - startX);
    }

    const stopDrag = () => {
        isDragging = false;
        carouselContainer.classList.remove("dragging");
    }

    carouselContainer.addEventListener("mousedown", startDrag);
    carouselContainer.addEventListener("mousemove", performDrag);
    document.addEventListener("mouseup", stopDrag);
}

/* dark */
document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('btn');
    const bodyElement = document.body;

    toggleSwitch.addEventListener('change', () => {
        bodyElement.classList.toggle('dark', toggleSwitch.checked);
    });
});
/* fim dark */ 
/* sessão formulario */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    const submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener('submit', (event) => {
        let allFieldsFilled = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                allFieldsFilled = false;
                input.style.border = '2px solid red';
            } else {
                input.style.border = '2px solid green';
            }
        });

        if (!allFieldsFilled) {
            event.preventDefault();
            alert("Por favor, preencha todos os campos obrigatórios.");
        }
    });

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim()) {
                input.style.border = '2px solid green';
            } else {
                input.style.border = '2px solid red';
            }
        });
    });
});

/* fim formulário */

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
        addMessageToChat('Usuário', userMessage, 'src/images/usuario.jpg');  
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

    addMessageToChat('Chatbot', botResponse, 'src/images/logo.png');  
}


/* fim chatbot */ 