import{a as y,i as l,S as g}from"./assets/vendor-f67ecabd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();async function f(s,t=1){const r="https://pixabay.com/api/",n=new URLSearchParams({key:"40878380-6ee06a62f90a8337fbd0b4096",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:40});console.log(t);const e=await y.get(`${r}?${n}`);if(e.data.totalHits===0)throw new Error("Sorry, there are no images matching your search query. Please try again.");return e.data}function d(s){return s.hits.map(({webformatURL:t,largeImageURL:r,tags:n,likes:e,views:o,comments:i,downloads:p})=>`<div class="photo-card">
    <a href="${r}"><img src="${t}" alt="${n}" loading="lazy" /></a>
    <div class="info">
        <p class="info-item">
            <b>Likes</b><br>
            ${e}
        </p>
            <p class="info-item">
        <b>Views</b><br>
         ${o}
        </p>
        <p class="info-item">
            <b>Comments</b><br>
            ${i}
        </p>
        <p class="info-item">
            <b>Downloads</b><br>
            ${p}
        </p>
    </div>
</div>`).join("")}let h;const u={searchForm:document.querySelector(".search-form"),gallery:document.querySelector(".gallery")};let a=1,c="";u.searchForm.addEventListener("submit",v);let b={root:null,rootMargin:"300px",threshold:0};const m=new IntersectionObserver(w,b);async function v(s){s.preventDefault();const t=s.currentTarget.elements.searchQuery.value;if(t!==""){c!==t&&(a=1,c=t);try{const r=await f(t,a);a+=1,l.info({message:`Hooray! We found ${r.totalHits} images.`,position:"topRight"}),u.gallery.innerHTML=await d(r),m.observe(document.querySelector(".js-guarg"))}catch(r){console.log(r),l.error({message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"})}h=new g(".gallery a")}}async function w(s){for(const t of s)if(t.isIntersecting)try{const r=await f(c,a);if(console.log(r),a*40>=r.totalHits)throw c="",a=1,m.disconnect(),new Error("We're sorry, but you've reached the end of search results.");u.gallery.insertAdjacentHTML("beforeend",d(r)),a++,h.refresh()}catch(r){l.error({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),console.log(r)}}
//# sourceMappingURL=commonHelpers.js.map
