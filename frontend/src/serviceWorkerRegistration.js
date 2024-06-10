// src/serviceWorkerRegistration.js

// This function registers the service worker
export function register() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            const swUrl = `${import.meta.env.VITE_PUBLIC_URL || ''}/service-worker.js`;

            navigator.serviceWorker
                .register(swUrl)
                .then(registration => {
                    console.log('Service Worker registered with scope: ', registration.scope);
                })
                .catch(error => {
                    console.error('Error during service worker registration:', error);
                });
        });
    }
}

// This function unregisters the service worker
export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
            registration.unregister();
        });
    }
}
