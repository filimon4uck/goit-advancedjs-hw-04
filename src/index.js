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
};

let page = 1;
let value = '';
elements.searchForm.addEventListener('submit', searchHandler);
let options = {
  root: null,
  rootMargin: '300px',
  threshold: 0,
};

const observer = new IntersectionObserver(loadMoreHandler, options);

async function searchHandler(evt) {
  evt.preventDefault();
  const searchValue = evt.currentTarget.elements.searchQuery.value;
  if (searchValue === '') {
    return;
  }
  if (value !== searchValue) {
    page = 1;
    value = searchValue;
  }
  try {
    const data = await serviceSearch(searchValue, page);
    page += 1;
    // console.log(data);
    iziToast.info({
      message: `Hooray! We found ${data.totalHits} images.`,
      position: 'topRight',
    });
    elements.gallery.innerHTML = await createMarkup(data);
    observer.observe(document.querySelector('.js-guarg'));
  } catch (error) {
    console.log(error);
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
        console.log(data);
        if (page * 40 >= data.totalHits) {
          value = '';
          page = 1;
          observer.disconnect();
          throw new Error(
            "We're sorry, but you've reached the end of search results."
          );
        }
        elements.gallery.insertAdjacentHTML('beforeend', createMarkup(data));
        page++;
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
