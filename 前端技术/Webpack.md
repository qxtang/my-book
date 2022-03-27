# Webpack

# Webpack

原理：

- 是一个 JavaScript 的模块打包工具。
- 基于入口文件，自动地递归解析入口所需要加载的所有资源，然后用不同的 loader 来处理不同的文件，用 Plugin 来扩展 webpack 的功能
- 通过分析模块之间的依赖，最终将所有模块打包成一份或者多份代码包，供 HTML 直接引用。
- 实质上，Webpack 仅仅提供了 打包功能 和一套 文件处理机制，然后通过生态中的各种 Loader 和 Plugin 对代码进行预编译和打包。
- 因此 Webpack 具有高度的可拓展性，能更好的发挥社区生态的力量。

概念：

- Entry: 入口文件，Webpack 会从该文件开始进行分析与编译；
- Output: 出口路径，打包后创建 bundler 的文件路径以及文件名；
- Module: 源码目录中的每一个文件，在 Webpack 中任何文件都可以作为一个模块，会根据配置的不同的 Loader 进行加载和打包；
- Chunk: webpack 打包过程中的产物，在进行模块的依赖分析的时候，代码分割出来的代码块，可以根据配置，将所有模块代码合并成一个或多个代码块，以便按需加载，提高性能；
- Loader: 模块加载器，进行各种文件类型的加载与转换，比如 babel-loader 将 jsx 转为 React.createElement；
- Plugin: 拓展插件，可以通过 Webpack 相应的事件钩子，介入到打包过程中的任意环节，从而对代码按需修改；
- Bundle: webpack 打包出来的文件，webpack 最终输出的东西，可以直接在浏览器运行。在抽离 css(当然也可以是图片、字体文件之类的)的情况下，一个 chunk 是会输出多个 bundle 的，但是默认情况下一般一个 chunk 也只是会输出一个 bundle

# 工作流程 (加载 - 编译 - 输出)

- 1、读取配置文件，按命令 初始化 配置参数，创建 Compiler 对象；
- 2、调用插件的 apply 方法 挂载插件 监听，然后从入口文件开始执行编译；
- 3、按文件类型，调用相应的 Loader 对模块进行 编译，并在合适的时机点触发对应的事件，调用 Plugin 执行，最后再根据模块 依赖查找 到所依赖的模块，递归执行第三步；
- 4、将编译后的所有代码包装成一个个代码块 (Chuck)， 并按依赖和配置确定 输出内容。这个步骤，仍然可以通过 Plugin 进行文件的修改;
- 5、最后，根据 Output 把文件内容一一写入到指定的文件夹中，完成整个过程；

# webpack 打包原理

- 根据配置中的 entry 找出所有的入口文件。
- 从入口文件出发,调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理。
- 在经过上一步使用 Loader 翻译完所有模块后,得到了每个模块被翻译后的最终内容以及它们之间的依赖关系。

# hash、chunkhash、contenthash

- hash：所有的 bundle 使用同一个 hash 值，跟每一次 webpack 打包的过程有关
- chunkhash：根据每一个 chunk 的内容进行 hash，同一个 chunk 的所有 bundle 产物的 chunkhash 值是一样的。因此若其中一个 bundle 的修改，同一 chunk 的所有产物 hash 也会被修改
- contenthash：与文件内容本身相关
- 注意：开发环境热更新下只能使用 hash 或者不使用 hash。在生产环境中我们一般使用 contenthash 或者 chunkhash，因为在热更新模式下，会导致 chunkhash 和 contenthash 计算错误

# rollup 和 webpack 区别

- webpack 拆分代码， 按需加载；
- Rollup 所有资源放在同一个地方，一次性加载，利用 tree-shake 特性来剔除项目中未使用的代码，减少冗余
- 对于应用使用 webpack，对于类库使用 Rollup，rollup 适用于基础库的打包，如 vue、react
- 如果你需要代码拆分(Code Splitting)，或者你有很多静态资源需要处理，再或者你构建的项目需要引入很多 CommonJS 模块的依赖，那么 webpack 是个很不错的选择。
- 如果您的代码库是基于 ES2015 模块的，而且希望你写的代码能够被其他人直接使用，你需要的打包工具可能是 Rollup。

# 常见 loader

- image-loader：加载并且压缩图片文件
- file-loader: 加载文件资源，如 字体 / 图片 等，具有移动/复制/命名等功能、把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
- url-loader: 通常用于加载图片，可以将小图片直接转换为 Date Url，减少请求；和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
- babel-loader: 加载 js / jsx 文件， 将 ES6 / ES7 代码转换成 ES5，抹平兼容性问题；
- ts-loader: 加载 ts / tsx 文件，编译 TypeScript；
- style-loader: 将 css 代码以
