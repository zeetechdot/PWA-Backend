const email=document.getElementById('email');
email.value=new URLSearchParams(location.search).get('email') || '';
const message=document.getElementById('message');
async function send(path, payload) {
  const res=await fetch(City4ChristAPI.BASE+path,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(payload)});
  const data=await res.json().catch(()=>({}));
  if(!res.ok) throw new Error(data.error?.message || data.message || `Request failed (${res.status})`);
  return data;
}
document.getElementById('verifyForm').addEventListener('submit',async event=>{
  event.preventDefault(); const btn=document.getElementById('submitButton'); btn.disabled=true; message.textContent='Checking code…';
  try {await send('/auth/verification/verify',{email:email.value.trim(),code:document.getElementById('code').value.trim()}); message.textContent='Email verified! You can now log in.'; setTimeout(()=>{location.href='login.html';},1200);}
  catch(e){message.textContent=e instanceof TypeError ? 'Could not connect to API. Check CORS and network.' : e.message;}
  finally{btn.disabled=false;}
});
document.getElementById('resendButton').addEventListener('click',async()=>{
 const btn=document.getElementById('resendButton'); btn.disabled=true; message.textContent='Requesting a new code…';
 try {await send('/auth/verification/resend',{email:email.value.trim()}); message.textContent='If eligible, a new code will be sent to your email.';}
 catch(e){message.textContent=e instanceof TypeError ? 'Could not connect to API. Check CORS and network.' : e.message;}
 finally{btn.disabled=false;}
});
