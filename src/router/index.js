import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { RouterAuth, LoginAuth } from './routerAuth';

// 懒加载组件
const Main = lazy(() => import("../pages/main"));
const Home = lazy(() => import(/* webpackChunkName: "home" */ '../pages/home'));
const Mail = lazy(() => import(/* webpackChunkName: "mall" */ '../pages/mail'));
const User = lazy(() => import(/* webpackChunkName: "user" */ '../pages/user'));
const PageOne = lazy(() => import(/* webpackChunkName: "other" */ '../pages/other/pageOne'));
const PageTwo = lazy(() => import(/* webpackChunkName: "other" */ '../pages/other/pageTwo'));
const Login = lazy(() => import(/* webpackChunkName: "login" */ '../pages/login'));
const NoAuth = lazy(() => import(/* webpackChunkName: "403" */ '../pages/403')); // 新增403无权限页

// 加载中组件
const Loading = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    fontSize: '18px',
    color: '#666'
  }}>
    🌀 页面加载中...
  </div>
);

// 受保护页面
const LazyWithAuth = ({ children }) => (
  <Suspense fallback={<Loading />}>
    <RouterAuth>{children}</RouterAuth>
  </Suspense>
);
// 登录页
const LazyWithLoginAuth = ({ children }) => (
  <Suspense fallback={<Loading />}>
    <LoginAuth>{children}</LoginAuth>
  </Suspense>
);
// 非受保护页面
const LazyNoAuth = ({ children }) => (
  <Suspense fallback={<Loading />}>{children}</Suspense>
);

const routes = [
  {
    path: "/",
    element: <LazyWithAuth><Main /></LazyWithAuth>, // 主页面需权限
    children: [
      { path: "/", element: <Navigate to="home" replace /> },
      { path: "home", element: <LazyWithAuth><Home /></LazyWithAuth> }, // admin/xiaoxiao都有权限
      { path: "mall", element: <LazyWithAuth><Mail /></LazyWithAuth> }, // admin/xiaoxiao都有权限
      { path: "user", element: <LazyWithAuth><User /></LazyWithAuth> }, // 仅admin有权限
      {
        path: "other",
        children: [
          { path: "pageOne", element: <LazyWithAuth><PageOne /></LazyWithAuth> }, // 仅admin有权限
          { path: "pageTwo", element: <LazyWithAuth><PageTwo /></LazyWithAuth> }, // 仅admin有权限
        ]
      },
    ]
  },
  { path: '/login', element: <LazyWithLoginAuth><Login /></LazyWithLoginAuth> }, // 登录页
  { path: '/403', element: <LazyNoAuth><NoAuth /></LazyNoAuth> } // 403无权限页
];

const router = createBrowserRouter(routes);
export default router;