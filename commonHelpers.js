import{a as y,i as l,S as p}from"./assets/vendor-f67ecabd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();async function d(s,t=1){const r="https://pixabay.com/api/",a=new URLSearchParams({key:"40878380-6ee06a62f90a8337fbd0b4096",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:40});console.log(t);const e=await y.get(`${r}?${a}`);if(e.data.totalHits===0)throw new Error("Sorry, there are no images matching your search query. Please try again.");return e.data}async function g(s){return s.hits.map(({webformatURL:t,largeImageURL:r,tags:a,likes:e,views:o,comments:c,downloads:m})=>`<div class="photo-card">
    <a href="${r}"><img src="${t}" alt="${a}" loading="lazy" /></a>
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
            ${c}
        </p>
        <p class="info-item">
            <b>Downloads</b><br>
            ${m}
        </p>
    </div>
</div>`).join("")}let h;const n={searchForm:document.querySelector(".search-form"),gallery:document.querySelector(".gallery"),js_guard:document.querySelector(".js-guarg")};let i=1,u="",b={root:null,rootMargin:"300px",threshold:0};const f=new IntersectionObserver(w,b);n.searchForm.addEventListener("submit",v);async function v(s){s.preventDefault();const t=s.currentTarget.elements.searchQuery.value;if(t.trim()!==""){u!==t&&(u=t),i=1;try{const r=await d(t,i);i+=1,n.gallery.innerHTML=await g(r),l.info({message:`Hooray! We found ${r.totalHits} images.`,position:"topRight"}),f.observe(n.js_guard)}catch(r){console.log(r),n.gallery.innerHTML="",f.unobserve(n.js_guard),l.error({message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight"})}h=new p(".gallery a")}}async function w(s){for(const t of s)if(t.isIntersecting)try{const r=await d(u,i),a=i*40;if(a>=r.totalHits)throw console.log(r),console.log(a),f.unobserve(n.js_guard),new Error("We're sorry, but you've reached the end of search results.");n.gallery.insertAdjacentHTML("beforeend",await g(r)),i+=1,h.refresh()}catch(r){l.error({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}),console.log(r)}}
//# sourceMappingURL=commonHelpers.js.map
