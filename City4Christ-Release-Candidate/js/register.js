const form = document.getElementById('registerForm');
const message = document.getElementById('message');
const button = document.getElementById('submitButton');
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (document.getElementById('password').value !== document.getElementById('confirmPassword').value) {message.textContent='Passwords do not match.'; return;}
  button.disabled=true; message.textContent='Creating your account…';
  const email=document.getElementById('email').value.trim();
  try {
    const res=await fetch(City4ChristAPI.BASE+'/auth/register', {method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({firstName:document.getElementById('firstName').value.trim(),lastName:document.getElementById('lastName').value.trim(),email,password:document.getElementById('password').value})});
    const data=await res.json().catch(()=>({}));
    if (!res.ok) throw new Error(data.error?.message || data.message || `Registration failed (${res.status})`);
    window.location.href='verify.html?email='+encodeURIComponent(email);
  } catch(e) {message.textContent=e instanceof TypeError ? 'Cannot reach API. Check deployment, network and CORS origin settings.' : e.message;}
  finally {button.disabled=false;}
});
