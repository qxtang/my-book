# 参考

- https://github.com/chinanf-boy/didact-explain

## 通用模型

- 描述 dom 结构的 js 对象：Element

  ```js
  // 类似这样的一种描述 dom 结构
  const element = {
    type: 'div',
    props: {
      id: 'container',
      children: [
        { type: 'input', props: { value: 'foo', type: 'text' } },
        { type: 'a', props: { href: '/bar' } },
        { type: 'span', props: {} },
      ],
    },
  };
  ```

- 实例：Instance
  ```ts
  
  ```

## render 方法的简单实现

```js
/**
 * @param element
 * @param parentDom dom对象，需要插入的节点
 */
function render(element, parentDom) {
  const { type, props } = element;

  // Create DOM element
  const isTextElement = type === 'TEXT ELEMENT'; // 文本类型判定
  const dom = isTextElement ? document.createTextNode('') : document.createElement(type);

  // Add event listeners
  const isListener = (name) => name.startsWith('on');
  Object.keys(props)
    .filter(isListener)
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, props[name]);
    });

  // Set properties
  const isAttribute = (name) => !isListener(name) && name != 'children';
  Object.keys(props)
    .filter(isAttribute)
    .forEach((name) => {
      dom[name] = props[name];
    });

  // Render children
  const childElements = props.children || [];
  childElements.forEach((childElement) => render(childElement, dom));

  // Append to parent
  parentDom.appendChild(dom);
}
```

## createElement 简单实现（JSX 语法糖）

```js
const TEXT_ELEMENT = 'TEXT ELEMENT'; // 类型

/**
 * @param type 元素类型
 * @param config 属性
 * @param args
 * @returns element
 */
function createElement(type, config, ...args) {
  const props = Object.assign({}, config);
  const hasChildren = args.length > 0;
  const rawChildren = hasChildren ? [].concat(...args) : [];
  props.children = rawChildren
    .filter((c) => c != null && c !== false)
    .map((c) => (c instanceof Object ? c : createTextElement(c)));
  // 过滤-空-值, 剩下的-不属于-Object的值 -> createTextElement -> 变为 类型为TEXT_ELEMENT- Didact元素
  return { type, props };
}

function createTextElement(value) {
  // 规范数据
  return createElement(TEXT_ELEMENT, { nodeValue: value });
}
```

# 差异化对比（reconciliation）
