<template>
    <!-- 注释内容来源于网络：当想要通过触控拖动元素时，需要把该元素 touch-action 设为 none，不然 pointermove 事件触发几次后就会自动取消 -->
    <div ref="container" @wheel.prevent="handleWheel" @pointerdown.prevent="handleDragStart" class="flex h-0 w-full grow justify-center items-center overscroll-none cursor-grab touch-none">
        <img ref="image" :src="props.src" alt="" class="w-full h-full object-contain select-none">
    </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps({
    src: String
})


watch(() => props.src, () => {
    image.value.style.transform = 'scale(1)';
    zoomLevel = 1;

    image.value.style.translate = '0px 0px';
    translateX = 0;
    translateY = 0;
})


const container = ref<HTMLDivElement>();

const image = ref<HTMLImageElement>();

let zoomLevel = 1;


function handleWheel(event: WheelEvent) {
    if (event.deltaY <    0) {
        // 放大
        zoomLevel *= 1.1;
    } else {
        // 缩小
        zoomLevel /= 1.1;
    }
    image.value.style.transform = `scale(${zoomLevel})`;
}






let isDragging = false;

let translateX:number = 0;
let translateY:number = 0;

let lastX:number = 0;
let lastY:number = 0;


function handleDragStart(event: PointerEvent) {
    container.value.setPointerCapture(event.pointerId);
    isDragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
    document.addEventListener('pointerup', handleDragEnd);
    document.addEventListener('pointermove', handleDragMove);
}


function handleDragEnd(event: PointerEvent) {
    isDragging = false;
    document.removeEventListener('pointermove', handleDragMove);
    document.addEventListener('pointerup', handleDragEnd);
}


function handleDragMove(event: PointerEvent) {
    if (isDragging) {
        const deltaX = event.clientX - lastX;
        const deltaY = event.clientY - lastY;
        lastX = event.clientX;
        lastY = event.clientY;
        translateX = translateX+deltaX;
        translateY = translateY+deltaY;
        image.value.style.translate = `${translateX}px ${translateY}px`;
    }
}
</script>
