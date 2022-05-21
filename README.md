# popper-next
是一款轻量的 Tooltip 插件

## vue、react安装使用 推荐yarn
``` bash
yarn add popper-next
或者
cnpm install popper-next -S
```  


## 在html页面中如何使用
``` bash
<script src="https://unpkg.com/popper-next"></script>
<script>
const btn = document.querySelector('.btn');
const tip = document.querySelector('.tip');
const Popper = createPopper(btn, tip);
</script>

<div class="btn">按钮</div>
<div class="tip">提示信息</div>
```  


## 在VUE3 + ts中如何使用
``` bash
<script setup lang="ts">
import { ref } from 'vue'
import createPopper, { PopperConfig } from 'popper-next'

const btn = ref<HTMLElement>();
const tip = ref<HTMLElement>();
const Popper: PopperConfig = createPopper(btn.value as HTMLElement, tip.value as HTMLElement);
</script>

<div ref="btn">按钮</div>
<div ref="tip">提示信息</div>
```

## 属性配置
### 全局配置属性
例如：所有tooltip位置默认初始化右边
``` bash
import createPopper from 'popper-next'

createPopper.defaults.placement = 'right';
```  

### 单个配置属性
例如：以下这个tooltip默认没有动画效果
``` bash
import createPopper from 'popper-next'

const Popper = createPopper(referene, popper, {
  placement: 'top'
});
Popper.defaults.animate = false;
```  

## 所有属性

| 属性 | 说明 | 类型 | 可选值 | 默认值 | 必填 |
| ---- | ---- | ---- | ---- | ---- | ---- |
| placement | 出现的位置 | string | top/bottom/left/right | bottom | 否 |
| trigger | 触发行为 | string | hover/click/contextmenu | hover | 否 |
| offset | 出现位置的偏移量 | number | — | 10 | 否 |
| animate | 添加动画 | boolean | true / false | true | 否 |
| speed | 动画速度，单位毫秒 | number | — | 400 | 否 |
| zIndex | 设置元素的堆叠顺序 | number | — | 2000 | 否 |  

## 所有事件

| 事件 | 说明 | 类型 | 返回值
| ---- | ---- | ---- |
| show | 显示tooltip | function | void |
| hide | 隐藏tooltip | function | void |

## umd版本

https://unpkg.com/popper-next  