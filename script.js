window.addEventListener('load', () => {
    // --- LÓGICA DO PRÉ-LOADER ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 750);
    }
    
    // --- LÓGICA DA ANIMAÇÃO DO TEXTO HERO (GSAP) ---
    const impactPhrase = document.querySelector('.impact-phrase');
    if (impactPhrase) {
        const text = impactPhrase.textContent;
        const chars = text.split('');
        impactPhrase.innerHTML = '';
        chars.forEach(char => {
            const charSpan = char === ' ' ? '&nbsp;' : char;
            impactPhrase.innerHTML += `<span class="char">${charSpan}</span>`;
        });
        gsap.from('.impact-phrase .char', {
            opacity: 0, y: 50, duration: 1, ease: 'power4.out', stagger: 0.05, delay: 0.5
        });
    }

    // --- ANIMAÇÕES DE SCROLL COM SCROLLTRIGGER ---
    gsap.registerPlugin(ScrollTrigger);
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        const elementsToAnimate = section.children;
        gsap.from(elementsToAnimate, {
            y: 50, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.2,
            scrollTrigger: {
                trigger: section, start: 'top 85%', toggleActions: 'play none none none',
            }
        });
    });

    // --- LÓGICA PARA O PLAYER DE ÁUDIO CUSTOMIZADO (PÁGINA MÚSICAS) ---
    const audioPlayer = document.getElementById('audio-player');
    const playBtns = document.querySelectorAll('.play-btn');
    if (audioPlayer && playBtns.length > 0) {
        let currentPlayingBtn = null;

        playBtns.forEach(btn => {
            const playIcon = btn.querySelector('.icon-play');
            const pauseIcon = btn.querySelector('.icon-pause');
            const trackItem = btn.closest('.track-item');

            btn.addEventListener('click', () => {
                const trackSrc = btn.getAttribute('data-src');
                if (currentPlayingBtn === btn) {
                    audioPlayer.pause();
                } else {
                    if (currentPlayingBtn) {
                        const oldPlayIcon = currentPlayingBtn.querySelector('.icon-play');
                        const oldPauseIcon = currentPlayingBtn.querySelector('.icon-pause');
                        oldPlayIcon.style.display = 'block';
                        oldPauseIcon.style.display = 'none';
                        currentPlayingBtn.closest('.track-item').classList.remove('playing');
                    }
                    audioPlayer.src = trackSrc;
                    audioPlayer.play();
                    currentPlayingBtn = btn;
                }
            });

            audioPlayer.addEventListener('play', () => {
                if (audioPlayer.src.includes(btn.getAttribute('data-src'))) {
                    playIcon.style.display = 'none';
                    pauseIcon.style.display = 'block';
                    trackItem.classList.add('playing');
                }
            });
            audioPlayer.addEventListener('pause', () => {
                if (audioPlayer.src.includes(btn.getAttribute('data-src'))) {
                    playIcon.style.display = 'block';
                    pauseIcon.style.display = 'none';
                    trackItem.classList.remove('playing');
                    currentPlayingBtn = null;
                }
            });
        });
    }

    // --- LÓGICA DA PÁGINA DE GALERIA ---
    if (document.querySelector('.swiper')) {
        const swiper = new Swiper('.swiper', {
            loop: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
        });
    }
    if (document.querySelector('.filter-buttons')) {
        const filterContainer = document.querySelector('.filter-buttons');
        const galleryItems = document.querySelectorAll('.gallery-item');
        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                filterContainer.querySelector('.active').classList.remove('active');
                e.target.classList.add('active');
                const filterValue = e.target.getAttribute('data-filter');
                galleryItems.forEach(item => {
                    if (item.dataset.category === filterValue || filterValue === 'all') {
                        item.classList.remove('hide');
                    } else {
                        item.classList.add('hide');
                    }
                });
            }
        });
    }
    if(document.querySelector('.gallery-grid')) {
        const galleryGrid = document.querySelector('.gallery-grid');
        galleryGrid.addEventListener('click', (e) => {
            const item = e.target.closest('.gallery-item');
            if (item) {
                const imageSrc = item.querySelector('img').src;
                const instance = basicLightbox.create(`<img src="${imageSrc}" style="max-width: 90vw; max-height: 90vh;">`);
                instance.show();
            }
        });
    }
});