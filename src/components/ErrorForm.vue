<script setup>

const emit = defineEmits(['close-error-form', 'retry-form'])


</script>

<template>
		<div class="error">
				<div class="error__icon icon-status">
						<img src="../assets/images/error.svg" alt="Ошибка"/>
				</div>
				<button
								@click="emit('close-error-form')"
								class="error__cancel-btn btn btn--white">Закрыть</button>
				<button
								@click="emit('retry-form')"
								class="error__retry-btn btn btn--blue">Попробовать снова</button>
		</div>
</template>
