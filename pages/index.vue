<template>
    <div class="home" >
        
        <Hero />
        
        <div class="container search" :sss="sss">
            <input type="text" placeholder="search movie" v-model.lazy="searchText">
            <button class="button" v-show="searchText !== ''" @click.prevent="clearSearch">Clear Search</button>
        </div>
        <!-- <Loading class="loading" v-if="loadingComp === true" /> -->
        <h1 v-if="loadingComp === true" style="color: white;">Loading</h1>
        <div v-else class="container movies">
          <!-- Search text not Empty Start -->
            <div id="movie-grid" class="movies-grid" >            
                    <div class="movie" v-for="(movie, index) of searchMovie" :key="index">
                        <div class="movie-img">
                            <img :src="`https://image.tmdb.org/t/p/w500/${movie.poster_path}`" alt="" />
                            <p class="review">{{ movie.vote_average }}</p>
                            <p class="overview">{{ movie.overview }}</p>
                        </div>
                        <div class="info">
                            <p class="title">{{ movie.title.slice(0, 25) }} <span v-if="movie.title > 25">....</span></p>
                            <p class="release">
                                Release: {{ new Date(movie.release_date).toLocaleString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                }) }}
                            </p>
                            <NuxtLink class="button button-light" :to="{name: 'movies-movieid', params: {movieid: movie.id}}">Get more info</NuxtLink>
                        </div>
                    </div>               
            </div>
            <!-- Search not Empty ENd -->
            
            <!-- Search text is Empty End -->
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMovieStore } from '../store/MovieStore.js';

useHead({
  title: 'Movie App',
  meta: [
    {name: 'description', content: 'Movie content app'}
  ],
  
})

const movieStore = useMovieStore();
const searchText = ref('');

const searchMovie = computed(() => {
    if(searchText.value === ''){
      return movieStore.moviesGetter;
    } else {
      return movieStore.searchMoviesGetters;
    }

});

const loadingComp = computed(() => movieStore.loadingGetters);
const sss = computed(async () => {
  if(searchText.value === ''){
 return await movieStore.getMovies();
} else {
  return await movieStore.searchMovies(searchText.value);
}
});

const clearSearch = () => {
  searchText.value = '';
  movieStore.clearSearch();
}
</script>

<style lang="scss">
.loading {
    padding-top: 120px;
    align-items: flex-start;
  }
  
.home {
  .loading {
    padding-top: 120px;
    align-items: flex-start;
  }
  .search {
    display: flex;
    padding: 32px 16px;
    input {
      max-width: 350px;
      width: 100%;
      padding: 12px 6px;
      font-size: 14px;
      border: none;
      &:focus {
        outline: none;
      }
    }
    .button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
  }
  .movies {
    padding: 32px 16px;
    .movies-grid {
      display: grid;
      column-gap: 32px;
      row-gap: 64px;
      grid-template-columns: 1fr;
      @media (min-width: 500px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 750px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media (min-width: 1100px) {
        grid-template-columns: repeat(4, 1fr);
      }
      .movie {
        position: relative;
        display: flex;
        flex-direction: column;
        .movie-img {
          position: relative;
          overflow: hidden;
          &:hover {
            .overview {
              transform: translateY(0);
            }
          }
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
          .review {
            position: absolute;
            top: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 40px;
            height: 40px;
            background-color: #c92502;
            color: #fff;
            border-radius: 0 0 16px 0;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
              0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          .overview {
            line-height: 1.5;
            position: absolute;
            bottom: 0;
            background-color: rgba(201, 38, 2, 0.9);
            padding: 12px;
            color: #fff;
            transform: translateY(100%);
            transition: 0.3s ease-in-out all;
          }
        }
        .info {
          margin-top: auto;
          .title {
            margin-top: 8px;
            color: #fff;
            font-size: 20px;
          }
          .release {
            margin-top: 8px;
            color: #c9c9c9;
          }
          .button {
            margin-top: 8px;
          }
        }
      }
    }
  }
}
</style>
