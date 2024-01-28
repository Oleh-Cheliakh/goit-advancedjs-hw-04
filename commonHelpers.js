import{a as v,i as L,S as $}from"./assets/vendor-88275603.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();async function m(r,o){const n="42008350-fb6f0dd148ae0c7c4d4cd1d49",s=await v.get("https://pixabay.com/api/",{params:{key:n,q:`${r}`,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:`${o}`}}),{totalHits:e,hits:t}=await s.data;return{totalHits:e,hits:t}}function g(r,o){const n=r.map(({webformatURL:s,largeImageURL:e,tags:t,likes:a,views:y,comments:b,downloads:w})=>`<div class="photo-card">
          <a href=${e}>
            <img src=${s} alt='${t}' loading="lazy" width="300" height="200" />
          </a>
          <div class="info">
              <p class="info-item">
                <b>Likes</b>
                ${a}
              </p>
              <p class="info-item">
                <b>Views</b>
                ${y}
              </p>
              <p class="info-item">
                  <b>Comments</b>
                  ${b}
              </p>
              <p class="info-item">
                  <b>Downloads</b>
                  ${w}
              </p>
          </div>
        </div>`).join("");o.insertAdjacentHTML("beforeend",n)}function P(r){const{height:o}=r.firstElementChild.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}function c(r,o){return L.show({message:`${r}`,color:`${o}`,position:"topRight",transitionIn:"fadeInDown"})}const S=document.querySelector(".search-form"),u=document.querySelector(".gallery"),f=document.querySelector(".load-more");let i=0,d=0,l,p=new $(".photo-card a"),h=new IntersectionObserver(q,{rootMargin:"0px"});async function M(r,o){r.preventDefault(),h.unobserve(f),o.innerHTML="";const n=new FormData(r.currentTarget);let{searchQuery:s}=Object.fromEntries(n.entries());if(s=s.trim().toLowerCase(),!s){c("You have to write a search query","yellow"),r.currentTarget.reset();return}l!==s&&(l=s,i=0),i+=1;try{const{totalHits:e,hits:t}=await m(l,i);if(t.length===0){c("Sorry, there are no images matching your search query. Please try again.","red");return}i==1&&(d=Math.ceil(e/40),c(`Hooray! We found ${e} images.`,"green")),g(t,u),d>i?h.observe(f):c("Sorry, there are no more images matching your search query","yellow"),p.refresh()}catch(e){console.log(e.message)}}S.addEventListener("submit",r=>{M(r,u)});function q(r){r.forEach(async o=>{if(o.isIntersecting){i+=1;try{const{hits:n}=await m(l,i);if(g(n,u),p.refresh(),P(u),d<=i){c("We're sorry, but you've reached the end of search results.","red"),h.unobserve(f);return}}catch(n){console.log(n.message)}}})}
//# sourceMappingURL=commonHelpers.js.map
