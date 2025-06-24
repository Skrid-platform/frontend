import { createRouter, createWebHistory } from 'vue-router';
import  HomeView from '@/views/HomeView.vue';
import  PlusView from '@/views/PlusView.vue';
import  CollectionsView from '@/views/CollectionsView.vue';
import ReferencesView from '@/views/ReferencesView.vue';
import SearchInterfaceView from '@/views/SearchInterfaceView.vue';

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
    {
      path: '/references',
      name: 'references',
      component: ReferencesView,
    },
    {
      path: '/help',
      name: 'help',
      component: () => import('@/views/HelpView.vue'),
    },
    {
      path: '/searchInterface',
      name: 'searchInterface',
      component: SearchInterfaceView
    }
  ],
})

export default router
