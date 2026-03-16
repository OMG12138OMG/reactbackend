// src/components/RouterAuth.js
import { Navigate, useLocation } from 'react-router-dom';

/**
 * 权限校验组件：
 * 1. 登录态校验（token）
 * 2. 路由权限校验（是否在用户的menu列表中）
 */
export const RouterAuth = ({ children }) => {
  const location = useLocation(); // 获取当前访问的路由地址
  const token = localStorage.getItem('token');
  const userMenu = JSON.parse(localStorage.getItem('menu') || '[]'); // 登录后存储的权限菜单

  // 未登录 → 跳登录页
  if (!token) {
    return <Navigate to='/login' replace />;
  }

  // 提取用户有权限的所有路由路径
  const getAuthRoutes = (menuList) => {
    let routes = [];
    menuList.forEach(item => {
      // 一级菜单路径
      if (item.path) routes.push(item.path);
      // 子菜单路径
      if (item.children && item.children.length) {
        routes = [...routes, ...item.children.map(sub => sub.path)];
      }
    });
    return routes;
  };
  const authRoutes = getAuthRoutes(userMenu);

  // 当前路由不在权限列表中 → 跳403
  // 兼容根路由（/）自动匹配/home
  const currentPath = location.pathname === '/' ? '/home' : location.pathname;
  if (!authRoutes.includes(currentPath)) {
    return <Navigate to='/403' replace />;
  }

  // 权限合法 → 渲染页面
  return children;
};

// 防止已登录用户访问登录页
export const LoginAuth = ({ children }) => {
  const token = localStorage.getItem('token');
  if (token) {
    return <Navigate to='/' replace />;
  }
  return children;
};