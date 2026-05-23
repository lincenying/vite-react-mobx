# 改动记录

## 2026-05-23 08:15:00

### 改动内容

- 为 `src/utils/request.ts` 中 `file`、`post`、`get` 方法参数补充显式类型，修复隐式 `any` 报错

### Commit Message

```
fix: 修复 request 方法参数隐式 any 类型错误
```

## 2026-05-23 08:10:00

### 改动内容

- 新增 `src/components/Nav.tsx`，修复 `BasicLayout` 中 `~/components/Nav` 无法解析的 Vite 报错
- 导航栏展示站点标题与用户 Cookie 中的用户名

### Commit Message

```
fix: 补充缺失的 Nav 导航组件
```

## 2026-05-23

### 改动内容

- 按 global-07-react 规范重构项目目录结构
- 新增 `src/types/` 目录，统一 `IApiResponse`、`IArticle` 等 I/T 前缀类型命名
- 新增 `src/utils/request.ts`、`message.ts`、`format.ts`，移除 `composables/` 目录
- 新增 `src/api/articleApi.ts` 模块 API 封装
- 新增 `src/router/index.tsx`，迁移至 `createBrowserRouter` + `RouterProvider`
- 新增 `src/layouts/BasicLayout.tsx`，接入 Nav、ScrollToTop、Outlet
- 新增 `src/App.tsx`，精简 `main.tsx` 为纯挂载入口
- 更新 MobX stores 使用新 API 与类型，移除单例 default 导出
- 迁移 `useAutoScroll` 至 `src/hooks/useAutoScroll.ts`
- 规范组件 Props 类型（`INavProps`、`IScrollToTopProps` 等）
- 404 页面改用 Ant Design Result 组件
- 移除 toastr 依赖，错误提示改用 Ant Design message
- 更新 auto-import 配置，移除 react-redux 与 composables 引用
- 新增 `.env.example`，修复 favicon 路径

### Commit Message

```
refactor: 按 React 规范重构项目目录与 API/路由层
```
