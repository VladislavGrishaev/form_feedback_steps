<script setup>
import {useFormStore} from "@/store/formStore.js";
import Form from "./Form.vue";
import HeaderForm from "./HeaderForm.vue";
import SuccessForm from "./SuccessForm.vue";
import ErrorForm from "./ErrorForm.vue";
import {storeToRefs} from "pinia";

const store = useFormStore();
const {formStatus} = storeToRefs(store);
</script>

<template>
		<div class="app-container">
				<div class="form-feedback">
						<button type="button" class="form-feedback__btn-close"></button>

						<HeaderForm/>
						<Form
										v-if="formStatus === 'form'" />
						<SuccessForm
										v-else-if="formStatus === 'success'"/>
						<ErrorForm
										v-else-if="formStatus === 'error'"/>
				</div>
		</div>
</template>

