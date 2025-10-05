// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== VARIÁVEIS GLOBAIS ==========
    const header = document.getElementById('header');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const formContato = document.getElementById('form-contato');
    const stats = document.querySelectorAll('.stat-number');
    
    // ========== NAVEGAÇÃO FIXA ==========
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // ========== MENU MOBILE ==========
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // ========== ANIMAÇÃO DE SCROLL SUAVE ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ========== CONTADOR DE ESTATÍSTICAS ==========
    function iniciarContador() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stats.forEach(stat => {
                        const target = parseInt(stat.getAttribute('data-count'));
                        const duration = 2000; // 2 segundos
                        const step = target / (duration / 16); // 60 FPS
                        let current = 0;
                        
                        const timer = setInterval(() => {
                            current += step;
                            if (current >= target) {
                                current = target;
                                clearInterval(timer);
                            }
                            stat.textContent = Math.floor(current);
                        }, 16);
                    });
                    
                    // Para de observar após a animação
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(document.querySelector('.diferenciais'));
    }
    
    // Inicia o contador quando a página carrega
    iniciarContador();
    
    // ========== VALIDAÇÃO DE FORMULÁRIO ==========
    if (formContato) {
        // Elementos do formulário
        const nomeInput = document.getElementById('nome');
        const emailInput = document.getElementById('email');
        const telefoneInput = document.getElementById('telefone');
        const assuntoInput = document.getElementById('assunto');
        const mensagemInput = document.getElementById('mensagem');
        
        // Função para validar nome
        function validarNome() {
            const nome = nomeInput.value.trim();
            const errorElement = nomeInput.nextElementSibling;
            
            if (nome === '') {
                mostrarErro(nomeInput, 'Por favor, insira seu nome completo.');
                return false;
            } else if (nome.length < 3) {
                mostrarErro(nomeInput, 'O nome deve ter pelo menos 3 caracteres.');
                return false;
            } else {
                removerErro(nomeInput);
                return true;
            }
        }
        
        // Função para validar email
        function validarEmail() {
            const email = emailInput.value.trim();
            const errorElement = emailInput.nextElementSibling;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email === '') {
                mostrarErro(emailInput, 'Por favor, insira seu e-mail.');
                return false;
            } else if (!emailRegex.test(email)) {
                mostrarErro(emailInput, 'Por favor, insira um e-mail válido.');
                return false;
            } else {
                removerErro(emailInput);
                return true;
            }
        }
        
        // Função para validar telefone
        function validarTelefone() {
            const telefone = telefoneInput.value.trim();
            const errorElement = telefoneInput.nextElementSibling;
            const telefoneRegex = /^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/;
            
            if (telefone === '') {
                mostrarErro(telefoneInput, 'Por favor, insira seu telefone.');
                return false;
            } else if (!telefoneRegex.test(telefone)) {
                mostrarErro(telefoneInput, 'Por favor, insira um telefone válido.');
                return false;
            } else {
                removerErro(telefoneInput);
                return true;
            }
        }
        
        // Função para validar assunto
        function validarAssunto() {
            const assunto = assuntoInput.value;
            const errorElement = assuntoInput.nextElementSibling;
            
            if (assunto === '') {
                mostrarErro(assuntoInput, 'Por favor, selecione um assunto.');
                return false;
            } else {
                removerErro(assuntoInput);
                return true;
            }
        }
        
        // Função para validar mensagem
        function validarMensagem() {
            const mensagem = mensagemInput.value.trim();
            const errorElement = mensagemInput.nextElementSibling;
            
            if (mensagem === '') {
                mostrarErro(mensagemInput, 'Por favor, insira sua mensagem.');
                return false;
            } else if (mensagem.length < 10) {
                mostrarErro(mensagemInput, 'A mensagem deve ter pelo menos 10 caracteres.');
                return false;
            } else {
                removerErro(mensagemInput);
                return true;
            }
        }
        
        // Função para mostrar erro
        function mostrarErro(input, mensagem) {
            const errorElement = input.nextElementSibling;
            input.style.borderColor = '#e74c3c';
            errorElement.textContent = mensagem;
            errorElement.style.display = 'block';
        }
        
        // Função para remover erro
        function removerErro(input) {
            const errorElement = input.nextElementSibling;
            input.style.borderColor = '#ddd';
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
        
        // Event listeners para validação em tempo real
        nomeInput.addEventListener('blur', validarNome);
        emailInput.addEventListener('blur', validarEmail);
        telefoneInput.addEventListener('blur', validarTelefone);
        assuntoInput.addEventListener('change', validarAssunto);
        mensagemInput.addEventListener('blur', validarMensagem);
        
        // Validação ao enviar o formulário
        formContato.addEventListener('