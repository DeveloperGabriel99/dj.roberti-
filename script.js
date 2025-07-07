document.addEventListener('DOMContentLoaded', () => {

    // 1. LÓGICA DO MENU HAMBURGER
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('.main-nav');
    const body = document.querySelector('body');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('is-active');
        navMenu.classList.toggle('is-active');
        body.classList.toggle('no-scroll');
    });

    // Fechar menu ao clicar em um link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('is-active');
            navMenu.classList.remove('is-active');
            body.classList.remove('no-scroll');
        });
    });

    // 2. LÓGICA DO LINK ATIVO NO MENU CONFORME A ROLAGEM
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav a');

    function updateActiveLink() {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // 3. LÓGICA PARA ANIMAÇÕES AO ROLAR A PÁGINA
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    elementsToAnimate.forEach(el => observer.observe(el));

    // 4. LÓGICA DO PLAYER DE MÚSICA SOUNDCLOUD EM MODAL
    const playButton = document.getElementById('play-spell-button');

    if (playButton) {
      
      // CÓDIGO FINAL COM O LINK CORRETO E AJUSTES
      const soundcloudPlayerHTML = `
        <iframe 
          width="100%" 
          height="300" 
          scrolling="no" 
          frameborder="no" 
          allow="autoplay" 
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1970188531&color=%23ab61ff&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true">
        </iframe>
      `;

      playButton.addEventListener('click', () => {
        const lightbox = basicLightbox.create(soundcloudPlayerHTML);
        lightbox.show();
      });
    }
});