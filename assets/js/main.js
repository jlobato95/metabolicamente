const quizData = [
    {
        question: "Só quem tem obesidade desenvolve a Síndrome Metabólica.",
        answer: "mito",
        explanation: "A obesidade é apenas um dos fatores de risco. Indivíduos não obesos que possuam resistência à insulina e outros fatores também podem desenvolver a síndrome."
    },
    {
        question: "A medicação deve ser a primeira escolha de tratamento.",
        answer: "mito",
        explanation: "A intervenção com remédios deve ser considerada apenas após a implementação de mudanças no estilo de vida (alimentação e atividade física)."
    },
    {
        question: "Indivíduos com SM possuem sintomas claros.",
        answer: "mito",
        explanation: "Geralmente a síndrome não apresenta sintomas, exigindo exames laboratoriais para diagnóstico."
    },
    {
        question: "A SM também aumenta o risco de desenvolver câncer e Alzheimer.",
        answer: "verdade",
        explanation: "Além do risco cardíaco e diabetes, a SM aumenta as chances de problemas como Alzheimer, apneia do sono, câncer de reto, entre outros."
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const question = quizData[currentQuestionIndex];
    if (document.getElementById('question-text')) {
        document.getElementById('question-text').innerText = question.question;
        updateProgressBar();
    }
}

function updateProgressBar() {
    const progress = (currentQuestionIndex / quizData.length) * 100;
    const progressBar = document.getElementById('quiz-progress');
    if (progressBar) {
        progressBar.style.width = `${progress}%`;
        progressBar.innerText = `${Math.round(progress)}%`;
        progressBar.setAttribute('aria-valuenow', progress);
    }
}

function checkAnswer(userAnswer) {
    const question = quizData[currentQuestionIndex];
    const feedbackArea = document.getElementById('feedback-area');
    const questionArea = document.getElementById('question-area');
    const feedbackText = document.getElementById('feedback-text');
    const explanationText = document.getElementById('explanation-text');

    if (userAnswer === question.answer) {
        score++;
        feedbackText.innerText = "Correto! 🎉";
        feedbackText.className = "text-success font-weight-bold";
    } else {
        feedbackText.innerText = "Incorreto. ❌";
        feedbackText.className = "text-danger font-weight-bold";
    }

    explanationText.innerText = question.explanation;
    
    questionArea.classList.add('d-none');
    feedbackArea.classList.remove('d-none');
}

function nextQuestion() {
    currentQuestionIndex++;
    const feedbackArea = document.getElementById('feedback-area');
    const questionArea = document.getElementById('question-area');

    if (currentQuestionIndex < quizData.length) {
        feedbackArea.classList.add('d-none');
        questionArea.classList.remove('d-none');
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    const feedbackArea = document.getElementById('feedback-area');
    const resultArea = document.getElementById('result-area');
    const finalScoreText = document.getElementById('final-score');
    const progressBar = document.getElementById('quiz-progress');

    if (progressBar) {
        progressBar.style.width = `100%`;
        progressBar.innerText = `100%`;
    }

    feedbackArea.classList.add('d-none');
    resultArea.classList.remove('d-none');
    finalScoreText.innerText = `Você acertou ${score} de ${quizData.length} questões!`;
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('result-area').classList.add('d-none');
    document.getElementById('question-area').classList.remove('d-none');
    loadQuestion();
}

// Controle de Tamanho da Fonte
let currentFontScale = parseInt(localStorage.getItem('mb-font-scale')) || 100;
document.documentElement.style.setProperty('--mb-font-scale', `${currentFontScale}%`);

function changeFontSize(delta) {
    currentFontScale = Math.min(Math.max(currentFontScale + delta, 80), 150);
    document.documentElement.style.setProperty('--mb-font-scale', `${currentFontScale}%`);
    localStorage.setItem('mb-font-scale', currentFontScale);
}

// Suporte a teclado para Flip Cards
function initKeyboardAccessibility() {
    document.querySelectorAll('.mb-card-flip').forEach(card => {
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
            }
        });
    });
}

// Preloader
function hidePreloader() {
    const preloader = document.getElementById('mb-preloader');
    if (preloader) {
        preloader.style.transition = 'opacity 0.6s ease';
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 600);
    }
}

// Revelar elementos ao scroll
function initRevealAnimation() {
    const observerOptions = {
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('mb-active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.mb-reveal').forEach(el => observer.observe(el));
}

// Controle da Navbar ao Scroll
function handleNavbarScroll() {
    const nav = document.querySelector('.mb-nav-floating');
    if (window.scrollY > 50) {
        nav.classList.add('mb-nav-scrolled');
    } else {
        nav.classList.remove('mb-nav-scrolled');
    }
}

// Inicializações ao carregar o conteúdo
document.addEventListener('DOMContentLoaded', () => {
    // Esconder preloader com tempo mínimo de 2.5s para visualização da animação
    setTimeout(() => {
        hidePreloader();
    }, 2500);
    
    // Inicializar Quiz
    loadQuestion();
    initKeyboardAccessibility();

    // Scroll Events
    window.addEventListener('scroll', handleNavbarScroll);
    initRevealAnimation();
    
    // Inicialização do Owl Carousel da Equipe
    if (typeof jQuery !== 'undefined' && $('.team-section-carousel').length) {
        $('.team-section-carousel').owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: true,
            autoplay: true,
            autoplayTimeout: 5000,
            responsive: {
                0: { items: 1 },
                600: { items: 2 },
                1000: { items: 3 }
            }
        });
    }
});
