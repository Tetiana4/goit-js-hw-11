import Notiflix from "notiflix";

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '22656000-e53b2481d23a663acaf14b7cd';

export default class NewsApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImages() {
         return fetch(`${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
        
            .then(r => r.json())
             .then(({ total, max }) => {
                 if (total > 0 && this.page === 1) {
                     Notiflix.Notify.success(`Hooray! We found ${total} images.`);
                 }
                 this.page += 1;
                 return max;
            });
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}