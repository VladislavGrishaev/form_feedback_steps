<script setup>
import Form from "./Form.vue";
import HeaderForm from "./HeaderForm.vue";
import SuccessForm from "./SuccessForm.vue";
import ErrorForm from "./ErrorForm.vue";
</script>

<template>
		<div class="app-container">
				<div class="form-feedback">
						<button type="button" class="form-feedback__btn-close"></button>

						<HeaderForm
										:title="'Форма обратной связи'"
										:subtitle="'Пожалуйста, оцените свой опыт прохождения тестового'"
						/>
						<Form/>
<!--						<SuccessForm/>-->
<!--						<ErrorForm/>-->
				</div>
		</div>
</template>

