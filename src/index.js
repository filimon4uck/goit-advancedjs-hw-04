import { serviceSearch } from './api_search';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createMarkup } from './markup.js';
let lightbox;
const elements = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  js_guard: document.querySelector('.js-guarg'),
};

let page = 1;
let value = '';

let options = {
  root: null,
  rootMargin: '300px',
  threshold: 0,
};
const observer = new IntersectionObserver(loadMoreHandler, options);

elements.searchForm.addEventListener('submit', searchHandler);
async function searchHandler(evt) {
  evt.preventDefault();
  const searchValue = evt.currentTarget.elements.searchQuery.value;
  if (searchValue.trim() === '') {
    return;
  }
  if (value !== searchValue) {
    value = searchValue;
  }
  page = 1;
  try {
    const data = await serviceSearch(searchValue, page);
    page += 1;
    elements.gallery.innerHTML = await createMarkup(data);
    iziToast.info({
      message: `Hooray! We found ${data.totalHits} images.`,
      position: 'topRight',
    });
    observer.observe(elements.js_guard);
  } catch (error) {
    console.log(error);
    elements.gallery.innerHTML = '';
    observer.unobserve(elements.js_guard);
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again.',
      position: 'topRight',
    });
  }
  lightbox = new SimpleLightbox('.gallery a');
}

async function loadMoreHandler(entries) {
  for (const entry of entries) {
    if (entry.isIntersecting) {
      try {
        const data = await serviceSearch(value, page);
        const imagesOfOnePage = page * 40;
        if (imagesOfOnePage >= data.totalHits) {
          console.log(data);
          console.log(imagesOfOnePage);
          observer.unobserve(elements.js_guard);
          throw new Error(
            "We're sorry, but you've reached the end of search results."
          );
        }
        elements.gallery.insertAdjacentHTML(
          'beforeend',
          await createMarkup(data)
        );
        page += 1;
        lightbox.refresh();
      } catch (error) {
        iziToast.error({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
        console.log(error);
      }
    }
  }
}
