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
  
  window.installPwa = function() {
    if (!deferredPrompt) {
      alert('Uh oh! The beforeinstallprompt must not have fired. You are either using iOS or have already installed the PWA.')
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
})(window);
