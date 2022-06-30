# Browserslist

- 用特定的语句来查询浏览器列表
  ```sh
  # 查询 Chrome 最后的两个版本
  npx browserslist "last 2 Chrome versions"
  chrome 96
  chrome 95
  ```
- autoprefixer 和 babel 都会用到
- 开发过程中为了减小垫片的体积，避免使用过多没必要的垫片
- 当我们确认的浏览器版本号，那么它的垫片体积就可以确认
- 例如：当我们确认的浏览器版本号，那么它的垫片体积就会确认

## caniuse-lite 与 caniuse-db

- browserslist 是从 caniuse-lite 这个库中查询数据的，caniuse-lite 是 caniuse-db 的精简版本，对 caniuse-db 的数据按一定规则做了简化，减少了库的大小
- caniuse-db 则是 can i use 网站的数据源，提供了网站查询所需的所有数据，caniuse-db 发布时会同步发布 caniuse-lite
- caniuse-lite 这个库也由 browserslist 团队进行维护
- 由于它们都不属于线上数据库，使用时会将数据克隆至本地，所以可能会存在本地数据不是最新的情况，browserslist 提供了更新 caniuse-lite 的命令，可定期运行以获取最新数据
  ```sh
  npx browserslist@latest --update-db
  ```

## 原理

- browserslist 根据正则解析查询语句，对浏览器版本数据库 caniuse-lite 进行查询，返回所得的浏览器版本列表
- 因为 browserslist 并不维护数据库，因此它会经常提醒你去更新 caniuse-lite 这个库
