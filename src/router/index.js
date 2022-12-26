import {createRouter, createWebHistory} from "vue-router";
import {defineAsyncComponent} from "vue";

const _import = (path) => defineAsyncComponent(() => import(`../pages/${path}.vue`));
const routes = [
    {
        path: '/',
        name: 'index',
        component: _import('index'),
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router;



