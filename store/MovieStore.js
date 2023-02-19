import { defineStore } from 'pinia'
import axios from 'axios';

export const useMovieStore = defineStore('movie', {
  state: () => {
        return {
          movies: [],
          searchMovie: [],
          loading: false,
          singleMovie: ''
        }
  },
  getters: {
    moviesGetter(state) {
      return state.movies;
    },
    searchMoviesGetters(state){
      return state.searchMovie;
    },
    loadingGetters(state){
      return state.loading;
    },
    singleMoiveGetter(state){
      return state.singleMovie;
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async getMovies() {
      this.loading = true;
      const data = await axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=37ed43a4f8eaa2abd75f9283692947bc&language=en-US&page=1');
      const result = await data.data;
      this.movies = result.results;
      console.log('result store ', this.movies);
      this.loading = false;
    },

    async searchMovies(searchInput) {
      this.loading = true;
      const data = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=37ed43a4f8eaa2abd75f9283692947bc&language=en-US&page=1&query=${searchInput}`);
      const result = await data.data;
      this.searchMovie = result.results;
      console.log('result store search ', this.searchMovie);
      this.loading = false;
    },
    async getSingleMovie(id) {
      this.loading = true;
      const data = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=37ed43a4f8eaa2abd75f9283692947bc&language=en-US`)
      const result = await data;
      this.singleMovie = result.data;
      console.log('single movie ', this.singleMovie);
      this.loading = false;
    },
    clearSearch(){
      this.searchMovie = '';
    }
  },
})