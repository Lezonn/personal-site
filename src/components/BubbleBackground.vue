<script setup>
import { ref } from 'vue'

const bubbles = ref([])
let count = 0

function spawnBubble() {
  const bubble = {
    id: count++,
    x: Math.random() * window.innerWidth,
    duration: 5 + Math.random() * 5
  }
  bubbles.value.push(bubble)
}

function removeBubble(id) {
  bubbles.value = this.bubbles.filter((bubble) => bubble.id !== id)
  console.log(bubbles.value)
}

setInterval(() => {
  spawnBubble()
}, 1000)
</script>

<template>
  <div
    v-for="bubble in bubbles"
    :key="bubble.id"
    class="bubble"
    :style="{ left: bubble.x + 'px', animationDuration: bubble.duration + 's' }"
    @animationend="removeBubble(bubble.id)"
  ></div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';
.bubble {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 360px;
  opacity: 50%;
  bottom: 0;
  background: radial-gradient($secondary-background-color, $primary-background-color);
  animation: gradientAnimation ease-in;
}

@keyframes gradientAnimation {
  0% {
    bottom: 0%;
  }
  100% {
    bottom: 100%;
  }
}
</style>
