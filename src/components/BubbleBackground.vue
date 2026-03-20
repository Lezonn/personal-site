<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const bubbles = ref([])
const interval = ref(null)
let count = 0

function spawnBubble() {
  const size = 20 + Math.random() * 40
  const bubble = {
    id: count++,
    x: Math.max(Math.random() * window.innerWidth - size / 2, 0),
    duration: 5 + Math.random() * 5,
    size,
    drift: (Math.random() - 0.5) * 60
  }
  bubbles.value.push(bubble)
}

function removeBubble(id) {
  bubbles.value = bubbles.value.filter((bubble) => bubble.id !== id)
}

function startSpawningBubbles() {
  if (interval.value === null) {
    interval.value = setInterval(() => {
      spawnBubble()
    }, 1000)
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
  <div class="bubble-container">
    <div
      v-for="bubble in bubbles"
      :key="bubble.id"
      class="bubble"
      :style="{
        left: bubble.x + 'px',
        width: bubble.size + 'px',
        height: bubble.size + 'px',
        animationDuration: bubble.duration + 's',
        '--drift': bubble.drift + 'px'
      }"
      @animationend="removeBubble(bubble.id)"
    ></div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.bubble {
  position: absolute;
  opacity: 50%;
  border-radius: 360px;
  bottom: 0;
  background: radial-gradient($--color-background-secondary, $--color-background-primary);
  animation: gradientAnimation ease-in;
}

@keyframes gradientAnimation {
  0% {
    bottom: 0%;
    transform: translateX(0);
  }
  50% {
    transform: translateX(calc(var(--drift) / 2));
  }
  100% {
    bottom: 100%;
    transform: translateX(var(--drift));
  }
}
</style>
