(function(){
  var $=function(i){return document.getElementById(i)},C=window.KANDI_CONFIG,A=window.KandiAPI,user=null,gender=null,rid=0,cat0=false;
  var S={category:"featured",q:"",sort:"relevance",min:"",max:"",page:1};
  function opts(id,arr){arr.forEach(function(v){var o=document.createElement("option");o.textContent=v;$(id).appendChild(o)})}
  opts("m",["January","February","March","April","May","June","July","August","September","October","November","December"]);
  var D=[],Y=[],i,y;for(i=1;i<=31;i++)D.push(i);for(y=new Date().getFullYear();y>=1950;y--)Y.push(y);opts("d",D);opts("y",Y);
  function pad(n){return(n<10?"0":"")+n}
  document.querySelectorAll(".gen button").forEach(function(b){b.addEventListener("click",function(){document.querySelectorAll(".gen button").forEach(function(x){x.classList.remove("on")});b.classList.add("on");gender=b.dataset.g})});
  function fail(e){var f=e.fields&&Object.keys(e.fields).map(function(k){return e.fields[k]}).join(" ");$("msg").textContent=f||e.message||"Something went wrong."}
  function enter(u){user=u;location.hash="home"}
  $("demo-entry").onclick=function(){A.preview().then(enter)};
  function show(){ $("who").hidden=!user;if(user)$("who").textContent=user.username+" · "+(user.kandies||0)+" K$" }
  $("f").onsubmit=function(ev){
    ev.preventDefault();var u=$("su-user").value.trim(),p=$("su-pass").value,p2=$("su-pass2").value,m=$("m").selectedIndex,d=$("d").selectedIndex,yi=$("y").selectedIndex;
    var e=!/^[A-Za-z0-9_]{3,20}$/.test(u)?"Username must be 3-20 letters, numbers or underscores.":p.length<8?"Password must be at least 8 characters.":p!==p2?"Passwords do not match.":(!m||!d||!yi)?"Please enter your birthday.":"";
    if(e){$("msg").textContent=e;return} $("msg").textContent="";var b=$("su-btn");b.disabled=true;
    A.signup({username:u,password:p,birthday:$("y").value+"-"+pad(m)+"-"+pad(d),gender:gender}).then(enter).catch(fail).then(function(){b.disabled=false});
  };
  $("hl").onsubmit=function(ev){ev.preventDefault();var u=$("h-user").value.trim(),p=$("h-pass").value;if(!u||!p){$("msg").textContent="Enter your username and password.";return} $("msg").textContent="";A.login({username:u,password:p}).then(enter).catch(fail)};
  $("logout").onclick=function(){A.logout().then(function(){user=null;show();location.hash=""})};
  function card(it){var d=document.createElement("div"),t,n=document.createElement("b"),p=document.createElement("small");d.className="item";if(it.thumbnail&&/^(https?:)?\/\/|^\//.test(it.thumbnail)){t=document.createElement("img");t.src=it.thumbnail;t.alt=""}else t=document.createElement("div");t.className="th";n.textContent=n.title=it.name||"";p.textContent=it.price?it.price+" Kandies":"Free";d.appendChild(t);d.appendChild(n);d.appendChild(p);return d}
  function load(reset){var my=++rid,st=$("c-status");if(reset){S.page=1;$("grid").textContent="";$("more").hidden=true}st.textContent="Loading...";A.catalog({category:S.category,q:S.q,sort:S.sort,min:S.min,max:S.max,page:S.page,limit:C.PAGE_SIZE}).then(function(r){if(my!==rid)return;((r&&r.items)||[]).forEach(function(x){$("grid").appendChild(card(x))});st.textContent=$("grid").children.length?"":"No items found."; $("more").hidden=!(r&&r.hasMore)}).catch(function(e){if(my===rid)st.textContent=e.message||"Could not load the catalog."})}
  function apply(){S.q=$("c-q").value.trim();S.min=$("c-min").value.trim();S.max=$("c-max").value.trim();S.sort=$("c-sort").value;load(true)}
  document.querySelectorAll("[data-cat]").forEach(function(a){a.onclick=function(){document.querySelectorAll("[data-cat]").forEach(function(x){x.classList.remove("on")});a.classList.add("on");S.category=a.dataset.cat;load(true)}});
  $("c-search").onclick=apply;$("c-go").onclick=apply;$("c-sort").onchange=apply;$("c-q").onkeydown=function(e){if(e.key==="Enter")apply()};$("more").onclick=function(){S.page++;load(false)};
  $("gs").onsubmit=function(e){e.preventDefault();$("c-q").value=$("g-q").value.trim();if(location.hash==="#catalog")apply();else{cat0=true;location.hash="catalog";apply()}};
  var ml=$("ml"),links=document.querySelectorAll("#nl a"),act=links[0];
  function mv(a){if(!ml||!a)return;ml.style.left=a.offsetLeft+"px";ml.style.width=a.offsetWidth+"px"}
  links.forEach(function(a){a.onmouseenter=function(){mv(a)};a.onmouseleave=function(){mv(act)};a.onclick=function(){act=a;mv(a)}});
  window.addEventListener("resize",function(){mv(act)});
  function ensure(){return user?Promise.resolve(user):A.me().then(function(u){user=u;return u}).catch(function(){return null})}
  function route(){var h=location.hash.slice(1),app=h==="home"||h==="catalog";$("v-landing").hidden=app;$("v-app").hidden=!app;["home","catalog"].forEach(function(n){$("p-"+n).hidden=n!==h});$("n-catalog").classList.toggle("on",h==="catalog");if(!app){mv(act);return}ensure().then(function(u){if(!u&&h==="home"){location.hash="";return}show();if(h==="catalog"&&!cat0){cat0=true;load(true)}})}
  window.addEventListener("hashchange",route);route();
})();