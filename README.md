
# reactbackend - React 前端项目

基于 Create React App 搭建的 React 前端项目，采用模块化目录结构，适配前端工程化开发流程，可快速扩展接口请求、路由管理、状态管理等功能。

## 项目简介

本项目是 React 前端基础脚手架，已预置标准化目录结构，包含：

- 接口请求层（api/）：统一管理接口调用逻辑
- 组件层（component/）：存放通用UI组件/业务组件
- 页面层（pages/）：对应路由页面
- 路由配置（router/）：集中管理页面路由
- 状态管理（store/）：预留状态管理目录（可适配Redux/Mobx/Zustand等）
- 全局配置（config/）：存放环境变量、接口域名等配置
适合快速启动中小型 React 前端项目，降低前期目录搭建成本。

## 技术栈

- 核心框架：React（基于 Create React App 5.x）
- 开发环境：Node.js 16+（推荐18.x LTS）
- 包管理工具：npm
- 目录规范：模块化分层（API/组件/页面/路由/状态分离）

## 快速开始

### 环境要求

- Node.js：16.0.0 及以上版本（可通过 `node -v` 检查）
- npm：8.0.0 及以上版本（随Node.js自带）
- 浏览器：Chrome/Firefox/Edge 现代浏览器

### 安装与运行

#### 1. 克隆代码（或下载源码）

#### 2. 安装依赖

#### 3. 启动开发服务

启动后访问 [http://localhost:3000](http://localhost:3000) 即可查看项目，代码修改后页面会自动热重载。

#### 4. 构建生产包

```
npm run build
```

构建完成后会生成 `build/` 目录，包含压缩后的静态资源（HTML/CSS/JS），可直接部署到Nginx/Apache等静态服务器。

## 项目目录结构

```
reactbackend/
├── .gitignore                # Git忽略规则（排除node_modules/、build/等）
├── package.json              # 项目依赖/脚本配置
├── package-lock.json         # 依赖版本锁定文件
├── public/                   # 静态公共资源（不会被Webpack处理）
│   ├── favicon.ico           # 网站图标
│   ├── index.html            # 应用入口HTML（唯一根页面）
│   ├── logo192.png/logo512.png # PWA图标
│   ├── manifest.json         # PWA配置文件
│   └── robots.txt            # 搜索引擎爬虫规则
├── src/                      # 核心源码目录（所有业务代码）
│   ├── App.css               # 根组件样式
│   ├── App.js                # 根组件（路由出口/全局布局）
│   ├── api/                  # 接口请求层（封装API调用、拦截器等）
│   ├── assets/               # 静态资源（图片/字体/全局样式，会被Webpack处理）
│   ├── component/            # 通用组件（如Button/Table/Modal，可跨页面复用）
│   ├── config/               # 全局配置（接口域名、环境变量、常量等）
│   ├── index.css             # 全局基础样式
│   ├── index.js              # 应用入口文件（渲染根组件到DOM）
│   ├── pages/                # 页面组件（对应路由，如Home/About/Login等）
│   ├── router/               # 路由配置（定义页面路由映射、权限路由等）
│   └── store/                # 状态管理（存放Redux/Mobx等状态逻辑）
└── README.md                 # 项目说明文档
```

## 目录规范说明

| 目录          | 用途说明                                                     |
| ------------- | ------------------------------------------------------------ |
| src/api/      | 按业务模块拆分接口（如 `userApi.js`/`orderApi.js`），统一封装axios请求 |
| src/component | 区分通用UI组件（如 `CommonButton/`）和业务组件（如 `OrderCard/`），按需拆分 |
| src/pages/    | 每个页面对应一个子目录（如 `pages/Home/`），包含页面组件+专属样式+逻辑 |
| src/assets/   | 按类型分类（如 `assets/images/`/`assets/styles/`），避免资源杂乱 |
| src/config/   | 建议拆分环境配置（`dev.js`/`prod.js`），通过环境变量自动切换 |

## 常见问题

### 1. npm start 启动失败？

- 检查Node.js版本是否≥16，低版本可能不兼容CRA 5.x
- 执行 `npm cache clean --force` 清理缓存后重新安装依赖
- 确认端口3000未被占用（可修改package.json的start脚本：`set PORT=3001 && react-scripts start`）

### 2. build目录部署后页面空白？

- 检查Nginx配置是否正确指向build目录的index.html
- 若部署在非根路径，需修改package.json添加 `homepage` 字段（如 `"homepage": "/reactbackend/"`）

### 3. 如何添加接口请求功能？

1. 在 `src/api/` 下创建 `request.js` 封装axios（设置baseURL、请求拦截器）
2. 按业务创建API文件（如 `src/api/user.js`），导出接口函数
3. 在页面/组件中导入并调用

## 扩展建议

- 状态管理：推荐集成 Redux Toolkit（轻量版Redux）或 Zustand（极简状态管理）到 `src/store/`
- 路由管理：推荐使用 React Router 6+ 配置 `src/router/index.js`，支持嵌套路由/路由守卫
- UI组件库：可按需集成 Ant Design/Element Plus 到 `src/component/`，减少重复开发
- 接口请求：推荐使用 axios 封装请求层，统一处理token、错误提示、加载状态

## 部署说明

1. 执行 `npm run build` 生成build目录
2. 将build目录下的所有文件上传到静态服务器（如Nginx）

## 学习资源

- [React 官方文档](https://react.dev/)
- [Create React App 文档](https://create-react-app.dev/)
- [React Router 文档](https://reactrouter.com/en/main)
