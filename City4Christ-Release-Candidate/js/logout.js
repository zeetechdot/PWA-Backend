document.addEventListener('DOMContentLoaded',()=>{
 const btn=document.getElementById('logoutButton');if(!btn)return;
 btn.addEventListener('click',async()=>{btn.disabled=true;try{await City4ChristAPI.logout();window.location.replace('login.html');}catch(e){alert('Logout request failed: '+e.message);btn.disabled=false;}});
});
