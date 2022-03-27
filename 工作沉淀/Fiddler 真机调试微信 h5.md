> 需求：真机上通过 https 和微信可信域名访问本地服务

# 前提条件

- 手机和电脑处在同一局域网环境
- 电脑安装 Fiddler

# 本地 hosts 文件添加映射

- 假设可信域名为 abc.com
- 假设电脑局域网 ip 为 192.168.1.106

编辑 hosts 文件，将域名映射到电脑局域网 ip

```txt
# 微信开发
192.168.1.106 abc.com
```

# 设置 Fiddler

- tools -> options
- https 相关设置

![](../resource/20210801123947.png)

- 代理相关设置，这里设置代理端口号为 8002，可以设置任意合法端口号

![](../resource/20210801124045.png)

# 修改 webpack 配置

- 开启 https
  <https://webpack.js.org/configuration/dev-server/#devserverhttps>

- 本地服务端口号改成 443

此时可在电脑浏览器通过 https://abc.com 访问本地服务

# 修改手机代理

- 进入手机 wlan 设置，选择连接的 wifi，代理选择手动
- 主机名填电脑局域网 ip，端口填 Fiddler 代理设置中的端口号

![](../resource/20210801124751.jpg)

# 手机安装 Fiddler 证书

- 手机浏览器访问 `http://[电脑局域网ip]:[Fiddler 代理端口号]`，这里是 `http://192.168.1.106:8002`
- 点击下载 Fiddler 证书，进入手机 wlan 设置安装证书

![](../resource/20210801125321.jpg)

此时手机浏览器可通过 https://abc.com 访问电脑上的本地服务。

结束
