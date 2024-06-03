import { createRouter, createWebHistory } from 'vue-router';
import TestOver from './components/TestOver.vue';
import TestArea from './components/TestArea.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: TestArea
    },
    {
      path: '/end_exam',
      name: 'exit',
      component: TestOver
    }
  ]
});

export default router;