(function(){"use strict";
const KEY="candy-theme";
const cfg=window.CANDY_CONFIG||{};
const assets=cfg.assets||{};
function brandText(value){return String(value).replace(/roblox/gi,"CANDY").replace(/robux/gi,"K4NDY");}
function scanText(root){
 if(!root)return;
 const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
 const found=[];
 while(walker.nextNode()){
  const node=walker.currentNode,parent=node.parentElement;
  if(parent&&!/^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|INPUT|CODE|PRE)$/i.test(parent.tagName)&&/(roblox|robux)/i.test(node.nodeValue))found.push(node);
 }
 found.forEach(node=>node.nodeValue=brandText(node.nodeValue));
 if(root.querySelectorAll)root.querySelectorAll("*").forEach(el=>["title","alt","aria-label","placeholder"].forEach(attr=>{const value=el.getAttribute(attr);if(value&&/(roblox|robux)/i.test(value))el.setAttribute(attr,brandText(value));}));
}
function setTheme(mode){
 const theme=mode==="dark"?"dark":"light";
 document.documentElement.setAttribute("data-candy-theme",theme);
 try{localStorage.setItem(KEY,theme);}catch(_){}
 const button=document.getElementById("candy-theme-toggle");
 if(button){button.textContent=theme==="dark"?"Tema claro":"Tema escuro";button.setAttribute("aria-pressed",String(theme==="dark"));}
}
function setLogo(anchor){
 if(anchor.dataset.candyReady==="1")return;
 anchor.dataset.candyReady="1";
 anchor.replaceChildren();
 const logo=document.createElement("img");
 logo.src=assets.logo||"imagens/logo.svg";
 logo.alt="CANDY";
 logo.className="candy-brand-logo";
 anchor.appendChild(logo);
 const tagline=document.createElement("span");
 tagline.className="candy-tagline";
 tagline.textContent="Powering Criativity";
 anchor.appendChild(tagline);
 anchor.setAttribute("aria-label","CANDY — Powering Criativity");
}
function init(){
 document.title=brandText(document.title);
 scanText(document.body);
 document.querySelectorAll(".navbar-brand").forEach(setLogo);
 document.querySelectorAll('meta[content]').forEach(meta=>{if(/roblox|robux/i.test(meta.content))meta.content=brandText(meta.content);});
 let favicon=document.querySelector('link[rel~="icon"]');
 if(!favicon){favicon=document.createElement("link");favicon.rel="icon";document.head.appendChild(favicon);}
 favicon.href=assets.favicon||"imagens/favicon.svg";
 favicon.type="image/svg+xml";
 if(!document.getElementById("candy-theme-toggle")){
  const button=document.createElement("button");
  button.id="candy-theme-toggle";button.className="candy-theme-toggle";button.type="button";
  button.addEventListener("click",()=>setTheme(document.documentElement.getAttribute("data-candy-theme")==="dark"?"light":"dark"));
  document.body.appendChild(button);
 }
 let saved="light";try{saved=localStorage.getItem(KEY)||"light";}catch(_){}
 setTheme(saved);
 if(window.CANDY_ASSETS)window.CANDY_ASSETS.refresh();
 const observer=new MutationObserver(records=>records.forEach(record=>record.addedNodes.forEach(node=>{
  if(node.nodeType===3){if(node.parentElement&&!/^(SCRIPT|STYLE|NOSCRIPT|TEXTAREA|INPUT|CODE|PRE)$/i.test(node.parentElement.tagName))node.nodeValue=brandText(node.nodeValue);}
  else if(node.nodeType===1){scanText(node);if(node.matches&&node.matches(".navbar-brand"))setLogo(node);node.querySelectorAll&&node.querySelectorAll(".navbar-brand").forEach(setLogo);if(window.CANDY_ASSETS)window.CANDY_ASSETS.refresh();}
 })));
 observer.observe(document.body,{childList:true,subtree:true});
}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();