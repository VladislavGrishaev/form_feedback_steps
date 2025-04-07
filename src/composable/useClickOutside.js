import { onMounted, onUnmounted } from 'vue'

export function useClickOutside(targetRef, callback) {
  const handleClick = (event) => {
    if (targetRef.value && !targetRef.value.contains(event.target)) {
      callback()
    }
  }

  onMounted(() => document.addEventListener('click', handleClick))
  onUnmounted(() => document.removeEventListener('click', handleClick))
}
