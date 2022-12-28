import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router/index.js";
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import locale from 'element-plus/lib/locale/lang/zh-cn'
const app = createApp(App)
app.use(router).use(ElementPlus, {locale}).mount('#app')

//element icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
