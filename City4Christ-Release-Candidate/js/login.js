const form = document.getElementById('loginForm');
const message = document.getElementById('message');
const button = document.getElementById('loginButton');
form.addEventListener('submit', async (event) => {
  event.preventDefault(); button.disabled=true; message.textContent='Signing in…';
  try {
    await City4ChristAPI.login(document.getElementById('username').value.trim(),document.getElementById('password').value);
    window.location.replace('home.html');
  } catch (e) {message.textContent=e.message + ' (If this is a new deployment, check CORS, cookies and account verification.)';}
  finally {button.disabled=false;}
});
