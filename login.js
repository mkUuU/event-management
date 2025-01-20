document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log('Login attempt with:', { email, password });
    // Here you would typically send a request to your server to authenticate the user
    // For now, we'll just redirect to the dashboard
    window.location.href = 'dashboard.html';
});

function socialLogin(provider) {
    console.log(`Attempting to login with ${provider}`);
    // Here you would typically initiate the OAuth flow for the selected provider
    // For now, we'll just log the attempt and redirect to the dashboard
    window.location.href = 'dashboard.html';
}

