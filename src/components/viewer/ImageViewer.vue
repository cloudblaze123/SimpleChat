<template>
    <div ref="container" @wheel.prevent="handleWheel" @mousedown.prevent="handleDragStart" class="flex justify-center items-center overscroll-none cursor-grab">
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


function handleDragStart(event: MouseEvent) {
    isDragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('mousemove', handleDragMove);
}


function handleDragEnd(event: MouseEvent) {
    isDragging = false;
    document.removeEventListener('mousemove', handleDragMove);
    document.addEventListener('mouseup', handleDragEnd);
}


function handleDragMove(event: MouseEvent) {
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
