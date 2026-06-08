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
    },
    {
        question: "A resistência à insulina, excesso de peso e sedentarismo são fatores de risco para a Síndrome Metabólica.",
        answer: "verdade",
        explanation: "Estes são os principais fatores que aumentam as chances de desenvolvimento da síndrome."
    },
    {
        question: "A SM aumenta drasticamente o risco de doenças cardiovasculares, diabetes e até câncer.",
        answer: "verdade",
        explanation: "A condição afeta todo o organismo e eleva o risco dessas e outras comorbidades."
    },
    {
        question: "A prática de Tai Chi Chuan e Ioga não traz benefícios comprovados para a Síndrome Metabólica, sendo apenas recursos para relaxamento mental.",
        answer: "mito",
        explanation: "O Tai Chi Chuan reduz peso, circunferência da cintura e melhora a glicemia. Já o ioga reduz colesterol total, LDL e triglicerídeos, além de melhorar a sensibilidade à insulina."
    },
    {
        question: "A baixa adesão ao tratamento da Síndrome Metabólica está relacionada apenas à falta de força de vontade do paciente.",
        answer: "mito",
        explanation: "Existem múltiplas barreiras: complexidade do tratamento, efeitos colaterais, natureza assintomática e carência de educação em saúde preventiva."
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

function getSections() {
    return Array.from(document.querySelectorAll('section[id], main > div[id]'));
}

// Custom Gliding Scroll Function
function glideTo(targetY) {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    const duration = 1000; // Slightly faster but still smooth
    let start = null;

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const time = Math.min(progress / duration, 1);
        
        // Easing function: easeOutQuart (snappier start, very smooth landing)
        const easing = 1 - Math.pow(1 - time, 4);
        
        window.scrollTo(0, startY + distance * easing);
        
        if (progress < duration) {
            window.requestAnimationFrame(step);
        }
    }
    
    window.requestAnimationFrame(step);
}

function scrollToNextSection() {
    const sections = getSections();
    const currentScroll = window.pageYOffset;
    // Search for a section that is at least 150px below the current view to ensure a substantial move
    const next = sections.find(section => section.offsetTop > currentScroll + 150);
    
    if (next) {
        glideTo(next.offsetTop);
    } else {
        glideTo(document.body.scrollHeight);
    }
}

function scrollToPrevSection() {
    const sections = getSections();
    const currentScroll = window.pageYOffset;
    // Search for a section that is at least 150px above the current view
    const prev = sections.slice().reverse().find(section => section.offsetTop < currentScroll - 150);
    
    if (prev) {
        glideTo(prev.offsetTop);
    } else {
        glideTo(0);
    }
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

function toggleTestimonial(btn) {
    const textContainer = btn.previousElementSibling;
    const isCollapsed = textContainer.classList.contains('collapsed');
    
    if (isCollapsed) {
        textContainer.classList.remove('collapsed');
        textContainer.style.maxHeight = textContainer.scrollHeight + "px";
        btn.innerHTML = 'Ver Menos <i class="fas fa-chevron-up"></i>';
    } else {
        textContainer.classList.add('collapsed');
        textContainer.style.maxHeight = "150px";
        btn.innerHTML = 'Ver Mais <i class="fas fa-chevron-down"></i>';
        
        // Scroll back to card if needed
        const card = btn.closest('.mb-bezel-outer');
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
