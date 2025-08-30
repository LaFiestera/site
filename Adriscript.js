window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scroll-active');
    } else {
        navbar.classList.remove('scroll-active');
    }
});

 const btn = document.getElementById('botonFiesta');
  const audio = document.getElementById('audioFiesta');
  let confettiInterval = null;
  let isFiesta = false;

  btn.addEventListener('click', () => {
    if (!isFiesta) {
      
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      confettiInterval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
          clearInterval(confettiInterval);
        }

        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
      }, 250);

      
      audio.play();
      isFiesta = true;
      btn.textContent = "🛑 Acabaron las fiestas";
    } else {
      
      clearInterval(confettiInterval);
      audio.pause();
      audio.currentTime = 0;
      isFiesta = false;
      btn.textContent = "🎉 Fiesta";
    }
  });