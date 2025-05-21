<template>
    <!-- 注释内容来源于网络：当想要通过触控拖动元素时，需要把该元素 touch-action 设为 none，不然 pointermove 事件触发几次后就会自动取消 -->
    <div ref="container" @wheel.prevent="handleWheel" @pointerdown.prevent="handlePointerDown" class="flex h-0 w-full grow justify-center items-center overscroll-none cursor-grab touch-none">
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
    if (event.deltaY < 0) {
        // 放大
        zoomLevel *= 1.1;
    } else {
        // 缩小
        zoomLevel /= 1.1;
    }
    image.value.style.transform = `scale(${zoomLevel})`;
}




const pointers: Array<PointerEvent> = [];



let isDragging = false;
let isPinching = false; // 是否正在进行捏合手势

let translateX: number = 0;
let translateY: number = 0;

let lastX: number = 0;
let lastY: number = 0;


let initPinchDistance = 0;
let initZoomLevel = 1;


function handlePointerDown(event: PointerEvent) {
    // container.value.setPointerCapture(event.pointerId);

    if (pointers.length === 0) {
        // 初始化
        console.log('init pointer event listener')
        isDragging = false;
        isPinching = false;
        document.addEventListener('pointerup', handlePointerUp);
        document.addEventListener('pointermove', handlePointerMove);
    }


    pointers.push(event);
    console.log('pointerdown')
    console.log('pointerId:', event.pointerId)
    console.log('pointers.length:', pointers.length)


    if (pointers.length > 1) {

        // 处理捏合手势
        if (isDragging) {
            exitDrag()
        }
        enterPinch()

    } else {
        // 处理拖动手势
        enterDrag()
    }
}




function enterDrag() {
    console.log('start drag')
    isDragging = true;
    const event = pointers[0];
    lastX = event.clientX;
    lastY = event.clientY;
}

function exitDrag() {
    console.log('end drag')
    isDragging = false;
}


function enterPinch() {
    console.log('start pinch');
    isPinching = true;
    initPinchDistance = calculateDistance(pointers[0], pointers[1]);
    console.log('initPinchDistance:', initPinchDistance)
    initZoomLevel = zoomLevel;
    console.log('initZoomLevel:', initZoomLevel)
}

function exitPinch() {
    console.log('end pinch');
    isPinching = false;
}




function handlePointerUp(event: PointerEvent) {
    let pointerIndex = -1;
    // 获取指针对应的索引
    for (let i = 0; i < pointers.length; i++) {
        if (pointers[i].pointerId === event.pointerId) {
            pointerIndex = i;
            break;
        }
    }

    if (pointerIndex === -1) {
        console.log('unknown pointerId:', event.pointerId)
        return;
    }

    // 移除指针
    pointers.splice(pointerIndex, 1);
    console.log('pointerup')
    console.log('pointers index removed:', pointerIndex)
    console.log('pointers.length:', pointers.length)
    if (pointers.length === 1 && isPinching) {
        exitPinch()
        enterDrag()
    }
    if (pointers.length === 0) {
        document.removeEventListener('pointerup', handlePointerUp);
        document.removeEventListener('pointermove', handlePointerMove);

        // if (isPinching) {
        //     console.log('end pinch');
        // } else if (isDragging) {
        //     console.log('end drag');
        // }
    }
}


function handlePointerMove(event: PointerEvent) {
    // 更新指针
    for (let i = 0; i < pointers.length; i++) {
        if (pointers[i].pointerId === event.pointerId) {
            pointers[i] = event;
            break;
        }
    }

    // 处理手势
    if (isPinching) {
        handlePinchMove();
    } else if (isDragging) {
        handleDragMove();
    } else {
        console.log('unknown pointer input');
    }
}




function handleDragMove() {
    // console.log('drag move')
    const event = pointers[0];

    const deltaX = event.clientX - lastX;
    const deltaY = event.clientY - lastY;
    lastX = event.clientX;
    lastY = event.clientY;
    translateX = translateX + deltaX;
    translateY = translateY + deltaY;
    image.value.style.translate = `${translateX}px ${translateY}px`;
}




function handlePinchMove() {
    // console.log('pinch move')
    const currentDistance = calculateDistance(pointers[0], pointers[1]);
    // console.log('currentDistance:', currentDistance)
    // console.log('initPinchDistance:', initPinchDistance)
    zoomLevel = initZoomLevel * (currentDistance / initPinchDistance);
    // console.log('zoomLevel:', zoomLevel)
    image.value.style.transform = `scale(${zoomLevel})`;
}


function calculateDistance(event1: PointerEvent, event2: PointerEvent) {
    // console.log('calculate:', pointers[0], pointers[1])
    const dx = event1.clientX - event2.clientX;
    const dy = event1.clientY - event2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}
</script>
