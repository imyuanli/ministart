import {createRouter, createWebHistory} from "vue-router";
import {defineAsyncComponent} from "vue";

const _import = (path) => defineAsyncComponent(() => import(`../pages/${path}.vue`));
const routes = [
    {
        path: '/',
        name: 'index',
        component: _import('index'),
    },
    {
        path: '/test',
        name: 'fad',
        component: _import('test'),
    },
    {
        path: '/dad',
        name: 'dd',
        component: _import('dadtest'),
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router;



