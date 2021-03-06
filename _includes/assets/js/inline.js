if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}

(function(window) {
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
  });
  
  const installPwa = () => {
    if (!deferredPrompt) {
      alert('Uh oh! The beforeinstallprompt event must not have fired. You are either using iOS, an older browser, or have already installed the PWA.')
    } else {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('installed');
        } else {
          console.log('not installed :(');
        }
      });
    }
  }

  window.app = {
    installPwa
  };
})(window);
