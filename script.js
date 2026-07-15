(() => {
      const stage = document.querySelector('.stage');
      const button = document.getElementById('replayButton');

      if (!stage || !button) return;

      button.addEventListener('click', () => {
        button.disabled = true;
        stage.classList.add('is-restarting');

        // Force the browser to apply the reset state before restarting animations.
        void stage.offsetWidth;

        window.setTimeout(() => {
          stage.classList.remove('is-restarting');
          button.disabled = false;
          button.focus({ preventScroll: true });
        }, 50);
      });
    })();
