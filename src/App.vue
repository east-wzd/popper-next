<script setup lang="ts">
import { onMounted, ref } from 'vue'
import createPopper from './popper'

let btn = ref<HTMLElement>();
let tip = ref<HTMLElement>();
let Popper = ref(null);

onMounted(() => {
  Popper.value = createPopper(btn.value as HTMLElement, tip.value as HTMLElement);
});
</script>

<template>
  <div style="height: 80vh;"></div>
  <div style="width: 50%;height: 300px;margin: 50px auto;overflow-y: auto;">
    <div style="height: 350px;overflow-y: auto;">
      <div style="height: 400px;"></div>
      <div class="btn btn-top" ref="btn">按钮</div>
      <div class="tip tip-top" ref="tip">提示信息<div class="toolip__arrow toolip__arrow--bottom"></div></div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}
.btn{
  margin: 80px auto;
  width: 76px;
  height: 32px;
  font-size: 14px;
  box-sizing: border-box;
  display: inline-block;
  border: 1px solid #dcdfe6;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.tip{
  background-color: #333;
  color: white;
  padding: 10px;
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  line-height: 1.2;
}
.tip .toolip__arrow{
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
  border-width: 6px;
}
.tip .toolip__arrow.toolip__arrow--top{
  left: 50%;
  transform: translateX(-50%);
  bottom: -11px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-top-color: #303133;
}
.tip .toolip__arrow.toolip__arrow--bottom{
  left: 50%;
  transform: translateX(-50%);
  top: -11px;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: #303133;
}
.tip .toolip__arrow.toolip__arrow--left{
  top: 50%;
  transform: translateY(-50%);
  right: -11px;
  border-left-color: #303133;
  border-right-color: transparent;
  border-bottom-color: transparent;
}
.tip .toolip__arrow.toolip__arrow--right{
  top: 50%;
  transform: translateY(-50%);
  left: -11px;
  border-left-color: transparent;
  border-right-color: #303133;
  border-bottom-color: transparent;
}
</style>
