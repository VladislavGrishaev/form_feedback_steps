<script setup>

const emit = defineEmits(['retry-form'])

</script>

<template>
		<div class="success">
				<div class="success__icon icon-status">
						<img src="../assets/images/success.svg" alt="Успешно отправлено" />
				</div>
				<button
								@click="emit('retry-form')"
								class="success__revert-btn btn btn--blue">На главную</button>
		</div>
</template>
