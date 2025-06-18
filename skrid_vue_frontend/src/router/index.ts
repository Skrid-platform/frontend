import { createRouter, createWebHistory } from 'vue-router';
import  HomeView from '@/views/HomeView.vue';
import  PlusView from '@/views/PlusView.vue';
import  CollectionsView from '@/views/Collections.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/plus',
      name: 'plus',
      component: PlusView,
    },
    {
      path: '/collections',
      name: 'collections',
      component: CollectionsView,
    },
  ],
})

export default router
