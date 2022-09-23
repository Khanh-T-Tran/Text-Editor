
const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
//   event.preventDefault();
    // Store the event object in the deferredPrompt variable so it can be used later on to perform the actual installation.
    window.deferredPrompt = event;
      // Set the button to display: block so it appears in the UI for the user to click.
      butInstall.style.display = 'block';

});

// TODO: Implement a click event handler on the `butInstall` element
// https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Add_to_home_screen

butInstall.addEventListener('click', async () => {
    // Hide the button again with display: none — it is no longer needed once the app is installed.
    butInstall.style.display = 'none';
    // Use the prompt() method available on the beforeinstallprompt event object (stored in deferredPrompt) to trigger showing the install prompt.
    window.deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    window.deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        window.deferredPrompt = null;
      });
  });


//     const promptEvent = deferredPrompt;
//     if (!promptEvent) {
//         return;
//     }
//     promptEvent.prompt();
//     deferredPrompt = null;
//     butInstall.style.display = 'block';
// });

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    window.deferredPrompt = null;
});
