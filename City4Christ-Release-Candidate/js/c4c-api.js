/* City4Christ Go API adapter. Tokens are kept only in memory. */
(function () {
  "use strict";
  const BASE = 'https://city4christ-staging-api.onrender.com/api/v1';
  let token = null;
  let inFlight = null;
  async function request(path, options = {}) {
    let headers = {Accept: 'application/json', ...(options.body ? {'Content-Type':'application/json'} : {}), ...(options.headers || {})};
    let response = await fetch(BASE + path, {...options, credentials:'include', headers});
    let payload = await response.json().catch(()=>({}));
    if (!response.ok) throw new Error(payload.error?.message || payload.message || `Request failed (${response.status})`);
    return payload.data;
  }
  async function login(email,password) {
    const data = await request('/auth/login',{method:'POST', body:JSON.stringify({email,password})});
    token = data.accessToken;
    return data;
  }
  async function refresh() {
    if (!inFlight) inFlight = request('/auth/refresh',{method:'POST'}).then(data=>(token=data.accessToken,data)).finally(()=>{inFlight=null;});
    return inFlight;
  }
  async function authed(path,options={}) {
    if (!token) await refresh();
    try {return await request(path,{...options,headers:{...options.headers,Authorization:'Bearer '+token}});}
    catch(e) { if (!String(e.message).includes('401') && !String(e.message).toLowerCase().includes('unauthorized')) throw e;
      await refresh(); return request(path,{...options,headers:{...options.headers,Authorization:'Bearer '+token}}); }
  }
  async function logout() {try {await request('/auth/logout',{method:'POST'});} finally {token=null;}}
  window.City4ChristAPI = Object.freeze({login,refresh,authed,logout,BASE});
})();
