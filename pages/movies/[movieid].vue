<template>
    <Loading v-if="load" style="color: red;">Loading...</Loading>
    <div v-else class="container single-movie">
        <NuxtLink class="button" :to="{name: 'index'}">Back</NuxtLink>
        <div class="movie-info">
            <div class="movie-img">
                <img :src="`https://image.tmdb.org/t/p/w500/${singleMoive.poster_path}`" alt="">
            </div>
            <div class="movie-content">
                <h1>Title: {{ singleMoive.title }}</h1>
                <p class="movie-fact tagline">
                    <span>Tagline: </span>"{{ singleMoive.tagline }}"
                </p>
                <p class="movie-fact">
                    <span>Release: </span>
                    {{ new Date(singleMoive.release_date).toLocaleString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                }) }}
                </p>
                <p class="movie-fact">
                    <span>Duration: </span> {{ singleMoive.runtime }} minutes
                </p>
                <p class="movie-fact">
                    <span>Revenue: </span>
                    {{ 
                        singleMoive.revenue.toLocaleString('en-us', {
                            style: 'currency',
                            currency: 'USD'
                        })
                     }}
                </p>
                <p class="movie-fact">
                    <span>Overview: </span>{{ singleMoive.overview }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
// import { computed } from 'vue';
import { useMovieStore } from '../../store/MovieStore';

const movieStore = useMovieStore();
const route = useRoute();
const id = route.params.movieid;

const load = computed(() => movieStore.loadingGetters);
const singleMoive = computed(() => movieStore.singleMoiveGetter);
await movieStore.getSingleMovie(id);

useHead({
  title: singleMoive.value.title,
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
  bodyAttrs: {
    class: 'test'
  },
  script: [ { children: 'console.log(\'Hello world\')' } ]
})
</script>

<style lang="scss" scoped>
.single-movie {
  color: #fff;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 16px;
  .button {
    align-self: flex-start;
    margin-bottom: 32px;
  }
  .movie-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    color: #fff;
    @media (min-width: 800px) {
      flex-direction: row;
      align-items: flex-start;
    }
    .movie-img {
      img {
        max-height: 500px;
        width: 100%;
        @media (min-width: 800px) {
          max-height: 700px;
          width: initial;
        }
      }
    }
    .movie-content {
      h1 {
        font-size: 56px;
        font-weight: 400;
      }
      .movie-fact {
        margin-top: 12px;
        font-size: 20px;
        line-height: 1.5;
        span {
          font-weight: 600;
          text-decoration: underline;
        }
      }
      .tagline {
        font-style: italic;
        span {
          font-style: normal;
        }
      }
    }
  }
}
</style>