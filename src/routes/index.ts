/*
+-----------------------------------------------------------------------------------------------------------------------
| Author: 植成樑 <atzcl0310@gmail.com>  Blog：https://www.atzcl.cn
+-----------------------------------------------------------------------------------------------------------------------
| 路由配置
|
*/

'use strict';

import Vue from 'vue';
import Router from 'vue-router';

// 引入 vuex
import store from '../store';

// 导入路由文件
import cmsRoutes from './cms';
import errorRoutes from './error';

// 引入进度条模块跟样式
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 默认标题
const title = 'Web 管理系统';

// 应用路由
Vue.use(Router);

// 创建路由实例
const router = new Router({
  base: '/app/',
  mode: 'history',
  linkActiveClass: 'active',
  routes: cmsRoutes.concat(errorRoutes as any),
});

// 路由全局前置守卫
router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start();

  // 初始化 tags 的 vuex 状态
  // if (store.getters.cachePage.length === 0) {
  //   store.commit('initCachepage');
  // }

  let titleStr = '';
  for (let i = to.matched.length - 1; i >= 0; i--) {
    if (to.matched[i].meta.title) {
      titleStr = `${to.matched[i].meta.title} - `;
    }
  }

  titleStr += title;
  document.title = titleStr;
  next();
});

router.afterEach((to, from) => {
  // // 触发 tags 的新增
  // if (to.name !== '*') {
  //   store.commit('addCachePage', { title: to.meta.title, name: to.name, path: to.path, params: to.params, query: to.query });
  // }

  // 回到顶部
  window.scrollTo(0, 0);

  // 关闭进度条
  NProgress.done();
});

export default router;
