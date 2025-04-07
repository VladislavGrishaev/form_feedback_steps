<script setup>
import {computed} from "vue";
import {useFormStore} from "../store/formStore.js";
import {storeToRefs} from "pinia";

const store = useFormStore();
const {formStatus} = storeToRefs(store);

const headerTitle = computed(() => {
	switch (formStatus.value) {
		case 'success':
			return 'Спасибо, ваш ответ отправлен';
		case 'error':
			return 'Что-то пошло не так';
		default:
			return 'Форма обратной связи';
	}
})

const headerSubTitle = computed(() => {
	switch (formStatus.value) {
		case 'success':
			return 'Свяжемся с вами в ближайшее время';
		case 'error':
			return 'Попробуйте заполнить форму позже';
		default:
			return 'Пожалуйста, оцените свой опыт прохождения тестового';
	}
})

</script>

<template>
		<div class="form-feedback__title-form">
				<h2>{{ headerTitle }}</h2>
		</div>
		<div class="form-feedback__subtitle-form">
				<p>{{ headerSubTitle }}</p>
		</div>
</template>
