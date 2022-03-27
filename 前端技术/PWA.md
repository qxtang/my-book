- 让 Web App 能够达到 Native App 外观体验的主要实现技术，可以将 app 的快捷方式放置到桌面上，全屏运行，与原生 app 无异
- 可以将 app 的快捷方式放置到桌面上，全屏运行，与原生 app 无异
- 网站需要运行在 https
- 由于微信生态的存在，相比 Notification API，微信的服务通知可以更方便的收发消息，所以 PWA 暂时火不起来

# 实现

- 创建 manifest.json
- head 中添加
  ```html
  <link rel="manifest" href="manifest.json" />
  ```

# manifest.json

```json
{
  "name": "name",
  "short_name": "short_name",
  "display": "standalone",
  "start_url": "/",
  "theme_color": "#333333",
  "background_color": "#ffffff",
  "orientation": "any",
  "icons": [
    {
      "src": "./resource/icons/144.png",
      "sizes": "144x144"
    }
  ]
}
```

# service worker 实现离线缓存

- 是 Chrome 团队提出和力推的一个 WEB API，用于给 web 应用提供高级的可持续的后台处理能力
- 就像介于服务器和网页之间的拦截器，能够拦截进出的 HTTP 请求，从而完全控制你的网站（所以 PWA 必须 https）
