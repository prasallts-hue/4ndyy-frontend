(function () {
  var C = window.KANDI_CONFIG, DEMO_KEY = "kandi_demo_user";
  function save(k,v){try{v==null?localStorage.removeItem(k):localStorage.setItem(k,v)}catch(e){}}
  function load(k){try{return localStorage.getItem(k)}catch(e){return null}}
  function ApiError(status,message,fields){this.status=status;this.message=message;this.fields=fields||{}}
  async function demo(path,o){
    var E=C.ENDPOINTS;
    if(path===E.signup||path===E.login){var u={username:o.body.username,kandies:0};save(DEMO_KEY,JSON.stringify(u));return{user:u}}
    if(path===E.logout){save(DEMO_KEY,null);return null}
    if(path===E.me){var s=load(DEMO_KEY);if(!s)throw new ApiError(401,"Not logged in.");return JSON.parse(s)}
    if(path===E.catalog)return{items:[],page:1,hasMore:false};
    return null;
  }
  async function req(method,path,o){
    o=o||{};if(!C.API_BASE)return demo(path,o);
    var url=new URL(C.API_BASE.replace(/\/$/,"")+path);
    Object.keys(o.query||{}).forEach(function(k){var v=o.query[k];if(v!==""&&v!=null)url.searchParams.set(k,v)});
    var h={Accept:"application/json"},init={method:method,headers:h};
    if(o.body){h["Content-Type"]="application/json";init.body=JSON.stringify(o.body)}
    var t=load(C.TOKEN_KEY);if(C.AUTH_MODE==="token"&&t)h.Authorization="Bearer "+t;
    if(C.AUTH_MODE==="cookie")init.credentials="include";
    var ac=new AbortController(),to=setTimeout(function(){ac.abort()},C.TIMEOUT_MS);init.signal=ac.signal;
    var r;try{r=await fetch(url,init)}catch(e){throw new ApiError(0,"Could not reach the server.")}finally{clearTimeout(to)}
    var d=null;if(r.status!==204){try{d=await r.json()}catch(e){}}
    if(!r.ok){if(r.status===401)save(C.TOKEN_KEY,null);throw new ApiError(r.status,(d&&d.message)||"Something went wrong.",d&&d.errors)}
    return d;
  }
  function session(r){if(r&&r.token&&C.AUTH_MODE==="token")save(C.TOKEN_KEY,r.token);return r&&r.user?r.user:r}
  window.KandiAPI={
    signup:function(b){return req("POST",C.ENDPOINTS.signup,{body:b}).then(session)},
    login:function(b){return req("POST",C.ENDPOINTS.login,{body:b}).then(session)},
    logout:function(){return req("POST",C.ENDPOINTS.logout).catch(function(){}).then(function(){save(C.TOKEN_KEY,null)})},
    me:function(){return req("GET",C.ENDPOINTS.me).then(function(u){return u&&u.user?u.user:u})},
    catalog:function(q){return req("GET",C.ENDPOINTS.catalog,{query:q})}
  };
})();