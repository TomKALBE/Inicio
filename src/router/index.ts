import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieView from '../views/MovieView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Help me find a movie' }
    },
    {
        path: '/movie/:id/:slug',
        name: 'movie',
        component: MovieView,
        meta: { title: 'Movie '}
      }
  ]
})

router.beforeEach((to) => {
    const titleFromParams = to.params?.slug
    if(titleFromParams) {
        document.title = titleFromParams
    }else{
        document.title = to.meta?.title ?? 'Default Title'
    }
})

export default router
