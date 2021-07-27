
import './css/main.css';
import newsApiService from './js/news-service';
import imagesTpl from './templates/photo.hbs'
import Notiflix from "notiflix";

const refs = {
    searchForm: document.querySelector('.search-form'),
    cardGallery: document.querySelector('.gallery'),
    loadMoreButton: document.querySelector('.load-more'),
}

refs.searchForm.addEventListener('submit', onSearch)
refs.loadMoreButton.addEventListener('click', loadMore)

const newImageService = new newsApiService();

async function onSearch(e) {
    e.preventDefault();

    newImageService.query = e.currentTarget.elements.searchQuery.value;

    if (newImageService.query === '') {
        return Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }

    newImageService.resetPage();
    const response = await newImageService.fetchImages();
    clearImageContainer();
    return await imageMarkup(response);
}

async function loadMore() {
    const response = await newImageService.fetchImages();
    return imageMarkup(response);
}

function imageMarkup(images) {
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

function clearImageContainer() {
    refs.cardGallery.innerHTML = '';
}