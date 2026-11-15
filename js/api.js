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
    if(path===E.catalog){var sample=[
      {id:1,name:"Classic World",price:0,category:"featured",thumbnail:"/imagens/game-classic.svg"},
      {id:2,name:"Kandi Town",price:25,category:"featured",thumbnail:"/imagens/game-town.svg"},
      {id:3,name:"Pink Obby",price:10,category:"featured",thumbnail:"/imagens/game-obby.svg"},
      {id:4,name:"Speed Racers",price:40,category:"gear",thumbnail:"/imagens/game-racing.svg"},
      {id:5,name:"Dream Adventure",price:15,category:"accessories",thumbnail:"/imagens/game-adventure.svg"},
      {id:6,name:"Build & Create",price:0,category:"clothing",thumbnail:"/imagens/game-build.svg"},
      {id:7,name:"Kandi Party",price:5,category:"featured",thumbnail:"/imagens/game-party.svg"},
      {id:8,name:"Brick Quest",price:20,category:"collectibles",thumbnail:"/imagens/game-classic.svg"}
    ];var q=o.query||{};var list=sample.filter(function(x){return(!q.q||x.name.toLowerCase().indexOf(q.q.toLowerCase())>=0)&&(!q.category||q.category==="featured"||x.category===q.category)&&(!q.min||x.price>=Number(q.min))&&(!q.max||x.price<=Number(q.max))});if(q.sort==="price_asc")list.sort(function(a,b){return a.price-b.price});if(q.sort==="price_desc")list.sort(function(a,b){return b.price-a.price});var start=((Number(q.page)||1)-1)*(Number(q.limit)||24),items=list.slice(start,start+(Number(q.limit)||24));return{items:items,page:Number(q.page)||1,hasMore:start+items.length<list.length};}
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
    me:function(){return req("GET",C.ENDPOINTS.me).then(function(u){return u&&u.user?u.user:u})},\n    preview:function(){var u={username:"Kandi Guest",kandies:250,kix:120,isDemo:true};save(DEMO_KEY,JSON.stringify(u));return Promise.resolve(u)},
    catalog:function(q){return req("GET",C.ENDPOINTS.catalog,{query:q})}
  };
})();