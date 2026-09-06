<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const bubbles = ref([])
const interval = ref(null)
let count = 0
const MAX_BUBBLES = 18

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function spawnBubble() {
  if (bubbles.value.length >= MAX_BUBBLES) bubbles.value.shift()
  const bubble = {
    id: count++,
    x: Math.max(Math.random() * window.innerWidth - 45, 0),
    size: 18 + Math.random() * 36,
    duration: 6 + Math.random() * 5
  }
  bubbles.value.push(bubble)
}

function removeBubble(id) {
  bubbles.value = bubbles.value.filter((bubble) => bubble.id !== id)
}

function startSpawningBubbles() {
  if (interval.value === null && !prefersReducedMotion()) {
    spawnBubble()
    interval.value = setInterval(spawnBubble, 1400)
  }
}

function stopSpawningBubbles() {
  clearInterval(interval.value)
  interval.value = null
}

function handleVisibilityChange() {
  document.hidden ? stopSpawningBubbles() : startSpawningBubbles()
}

onMounted(() => {
  startSpawningBubbles()
  document.addEventListener('visibilitychange', handleVisibilityChange)
})

onUnmounted(() => {
  stopSpawningBubbles()
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})
</script>

<template>
  <div class="bubble-container" aria-hidden="true">
    <div
      v-for="bubble in bubbles"
      :key="bubble.id"
      class="bubble"
      :style="{
        left: bubble.x + 'px',
        width: bubble.size + 'px',
        height: bubble.size + 'px',
        animationDuration: bubble.duration + 's'
      }"
      @animationend="removeBubble(bubble.id)"
    ></div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';
.bubble-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.bubble {
  position: absolute;
  opacity: 0.5;
  border-radius: 50%;
  bottom: -60px;
  background: radial-gradient($--color-background-secondary, $--color-background-primary);
  animation-name: floatUp;
  animation-timing-function: ease-in;
  animation-fill-mode: forwards;
  will-change: transform;
}

@keyframes floatUp {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-110vh);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bubble-container {
    display: none;
  }
}
</style>
