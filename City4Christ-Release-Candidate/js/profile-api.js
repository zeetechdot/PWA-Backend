document.addEventListener('DOMContentLoaded', async () => {
 const name=document.querySelector('.profile-name-area h1');
 const role=document.querySelector('.profile-name-area p');
 if (!name || !role) return;
 name.textContent='Loading profile…';
 try {
  const user=await City4ChristAPI.authed('/me');
  name.textContent=[user.firstName,user.lastName].filter(Boolean).join(' ') || user.email || 'Member';
  role.textContent='City4Christ member';
  const loc=document.querySelector('.profile-name-area span'); if(loc) loc.hidden=true;
 } catch(e) { name.textContent='Sign in required';role.textContent='Your account could not be loaded';
  const a=document.createElement('a'); a.href='login.html';a.textContent='Go to login';role.after(a); }
});
