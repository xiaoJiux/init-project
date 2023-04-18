import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/base.css'

const app = createApp(App)

//pinia
const pinia = createPinia();
//修复$reset问题
// 因为状态管理使用的是setup的方式构建所以我们重写一个$reset并挂载到pinia中
pinia.use(({store}) => {
		const initialState = JSON.parse(JSON.stringify(store.$state));
		store.$reset = () => {
				store.$patch(initialState);
		}
})
app.use(pinia)
		.use(router)

app.mount('#app')
