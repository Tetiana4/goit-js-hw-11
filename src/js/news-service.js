const BASE_URL = 'https://pixabay.com/api/';
const KEY = '22656000-e53b2481d23a663acaf14b7cd';

export default class NewsApiService{
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    fetchImages() {
        console.log(this);
      const options = {
          headers: {
            Authorization: '22656000-e53b2481d23a663acaf14b7cd',
          },
        };
        
      const url = `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

      fetch(url, options)
        .then(r => r.json())
          .then(data => {
              this.incrementPage()
        });
    }


    incrementPage() {
        this.page += 1;
    }


    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}