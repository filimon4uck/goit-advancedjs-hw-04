import axios from 'axios';
export async function serviceSearch(requestValue, page = 1) {
  const url = 'https://pixabay.com/api/';
  const param = new URLSearchParams({
    key: '40878380-6ee06a62f90a8337fbd0b4096',
    q: requestValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: 40,
  });
  console.log(page);
  const response = await axios.get(`${url}?${param}`);
  if (response.data.totalHits === 0) {
    throw new Error(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
  return response.data;
}
