const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36389589-446fc5b150afa5fbf95e75562';

const per_page = 12;

export const fetchPhotos = async (searchImages, page = 1) => {
  try {
    const getImages = await fetch(
      `${BASE_URL}?q=${searchImages}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${per_page}`
    );
    return await getImages.json();
  } catch (error) {
    throw new Error('Server error');
  }
};
