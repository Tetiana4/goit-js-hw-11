import './sass/main.scss';
import imagesTpl from './templates/photo';
import Notiflix from "notiflix";
import NewsApiService from './js/news-service';

const refs = {
    searchForm: document.querySelector('.search-form'),
    cardGallery: document.querySelector('.gallery'),
    loadMoreButton: document.querySelector('.load-more'),
}


const newsApiService = new NewsApiService();

// console.log(newsApiService);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', onLoadMore);

// refs.loadMoreButton.disabled = true;

async function onSearch(e) {
    e.preventDefault();
    // refs.loadMoreButton.disabled = false;

    newsApiService.query = e.currentTarget.elements.searchQuery.value;
    
    if (newsApiService.query === '') {
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }

    newsApiService.resetPage();
    const response = await newsApiService.fetchImages();

    clearImagePage();

    return appendImages(response);
  // newsApiService.fetchImages();
}

async function onLoadMore() {
    const response = await newsApiService.fetchImages();
    return appendImages(response);
}

function appendImages(images) {
    refs.cardGallery.insertAdjacentHTML('beforeend', imagesTpl(images))
    refs.loadMoreButton.classList.remove('is-hidden')

    if (images.length === 0) {
        refs.loadMoreButton.classList.add('is-hidden')
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }

    if (images.length < 40) {
        refs.loadMoreButton.classList.add('is-hidden')
        Notiflix.Notify.info('We are sorry, but you have reached the end of search results.');
    }

}

function clearImagePage(){
    refs.cardGallery.innerHTML = ''
}