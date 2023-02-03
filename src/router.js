import Vue from 'vue'
import VueRouter from 'vue-router'

export const router = new VueRouter({
    routes: [
        { name: 'Home', path: '/', component: () => import('./views/HomeView.vue'), meta:{ hideNavbar:true} },
        { name: 'Trading Chart', path: '/chart', component: () => import('./views/TradingChartView.vue') },
        { name: 'Heat Map', path: '/map', component: () => import('./components/MapComponent.vue') },

    ],
    mode:'history'
})
router.beforeEach((to, from, next) => {
    document.title = to.name;
    next();
});

Vue.use(VueRouter)