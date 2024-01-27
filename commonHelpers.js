import{a as v,i as L,S as $}from"./assets/vendor-88275603.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();async function m(t,o){const s="42008350-fb6f0dd148ae0c7c4d4cd1d49",n=await v.get("https://pixabay.com/api/",{params:{key:s,q:`${t}`,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:`${o}`}}),{totalHits:e,hits:r}=await n.data;return{totalHits:e,hits:r}}function p(t,o){const s=t.map(({webformatURL:n,largeImageURL:e,tags:r,likes:a,views:y,comments:b,downloads:w})=>`<div class="photo-card">
          <a href=${e}>
            <img src=${n} alt='${r}' loading="lazy" width="300" height="200" />
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
        </div>`).join("");o.insertAdjacentHTML("beforeend",s)}function P(t){const{height:o}=t.firstElementChild.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}function u(t,o){return L.show({message:`${t}`,color:`${o}`,position:"topRight",transitionIn:"fadeInDown"})}const M=document.querySelector(".search-form"),l=document.querySelector(".gallery"),f=document.querySelector(".load-more");let i=0,d=0,g,c,h=new IntersectionObserver(O,{rootMargin:"0px"});function S(t,o){t.preventDefault(),h.unobserve(f),o.innerHTML="";const s=new FormData(t.currentTarget),{searchQuery:n}=Object.fromEntries(s.entries());c!==n.toLowerCase()&&(c=n.toLowerCase(),i=0),i+=1,m(c,i).then(e=>{if(e.hits.length===0){u("Sorry, there are no images matching your search query. Please try again.","red");return}i==1&&(d=Math.ceil(e.totalHits/40),u(`Hooray! We found ${e.totalHits} images.`,"green")),p(e.hits,l),d>i&&h.observe(f),g=new $(".photo-card a")}).catch(e=>{console.log(e.message)})}M.addEventListener("submit",t=>{S(t,l)});function O(t){t.forEach(o=>{o.isIntersecting&&(i+=1,m(c,i).then(s=>{if(p(s.hits,l),g.refresh(),P(l),d<=i){u("We're sorry, but you've reached the end of search results.","red"),h.unobserve(f);return}}).catch(s=>{console.log(s.message)}))})}
//# sourceMappingURL=commonHelpers.js.map
