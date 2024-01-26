import{S as b,i as w,a as v}from"./assets/vendor-eacb4d5c.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=n(e);fetch(e.href,t)}})();const L=document.querySelector(".search-form"),f=document.querySelector(".gallery"),$=document.querySelector(".load-more");let i=0,c,l=0,d;function S(o,r,n){o.preventDefault(),r.innerHTML="";const s=new FormData(o.currentTarget),{searchQuery:e}=Object.fromEntries(s.entries());i+=1,c!==e.toLowerCase()&&(c=e.toLowerCase(),i=1),m(c,i).then(t=>{if(t.hits.length===0){u("Sorry, there are no images matching your search query. Please try again.","red");return}i===1&&(l=Math.ceil(t.totalHits/40),u(`Hooray! We found ${t.totalHits} images.`,"green")),l>i&&O($),h(t.hits,f),d=new b(".photo-card a")}).catch(t=>{console.log(t.message)})}L.addEventListener("submit",o=>{S(o,f)});function h(o,r){const n=o.map(({webformatURL:s,largeImageURL:e,tags:t,likes:a,views:p,comments:g,downloads:y})=>`<div class="photo-card">
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
                ${p}
              </p>
              <p class="info-item">
                  <b>Comments</b>
                  ${g}
              </p>
              <p class="info-item">
                  <b>Downloads</b>
                  ${y}
              </p>
          </div>
        </div>`).join("");r.insertAdjacentHTML("beforeend",n)}function u(o,r){return w.show({message:`${o}`,color:`${r}`,position:"topRight",transitionIn:"fadeInDown"})}function M(o,r){o.forEach(n=>{n.isIntersecting&&(i+=1,m(c,i).then(s=>{if(h(s.hits,f),d.refresh(),P(),l<=i){u("We're sorry, but you've reached the end of search results.","red");return}}).catch(s=>{console.log(s.message)}))})}async function m(o,r){const n="42008350-fb6f0dd148ae0c7c4d4cd1d49",s=await v.get("https://pixabay.com/api/",{params:{key:n,q:`${o}`,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:`${r}`}}),{totalHits:e,hits:t}=await s.data;return{totalHits:e,hits:t}}function P(){const{height:o}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}function O(o){new IntersectionObserver(M,{rootMargin:"0px"}).observe(o)}
//# sourceMappingURL=commonHelpers.js.map
