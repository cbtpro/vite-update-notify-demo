import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		name: 'Home',
		component: () => import('../views/home/index.vue'),
		meta: {
			title: '首页'
		}
	}
];

const router = createRouter({
	history: createWebHistory(),
	routes
});

// 路由守卫 - 设置页面标题
router.beforeEach((to, _from, next) => {
	if (to.meta?.title) {
		document.title = `${to.meta.title} - Vue + Ant Design Vue 项目`;
	}
	next();
});

export default router;
