import './sass/main.scss';
// import photoCard from '../templates/photo-card';
import Notiflix from "notiflix";
import NewsApiService from './js/news-service';


const newsApiService = new NewsApiService();

console.log(newsApiService);

const refs = {
    searchForm: document.querySelector('.search-form'),
    cardGallery: document.querySelector('.gallery'),
    loadMoreButton: document.querySelector('.load-more'),
}


refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreButton.addEventListener('click', onLoadMore);

function onSearch(e) {
    e.preventDefault();

    newsApiService.query = e.currentTarget.elements.searchQuery.value;
    
    if (newsApiService.query === '') {
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }

    newsApiService.fetchImages();
};

function onLoadMore() {
    newsApiService.fetchImages();
}