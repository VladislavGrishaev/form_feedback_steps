<script setup>
import {useFormStore} from "@/store/formStore.js";
import Form from "./Form.vue";
import HeaderForm from "./HeaderForm.vue";
import SuccessForm from "./SuccessForm.vue";
import ErrorForm from "./ErrorForm.vue";
import {storeToRefs} from "pinia";

const store = useFormStore();
const {formStatus} = storeToRefs(store);

const emit = defineEmits(['close', 'close-error-form', 'retry-form'])

</script>

<template>

		<div class="form-feedback">
				<button
								@click="emit('close')"
								type="button"
								class="form-feedback__btn-close"></button>
				<HeaderForm/>
				<Form
								v-if="formStatus === 'form'"/>
				<SuccessForm
								v-else-if="formStatus === 'success'"
								@to-main="emit('close')"
				/>
				<ErrorForm
								v-else-if="formStatus === 'error'"
								@close-error-form="emit('close-error-form')"
								@retry-form="emit('retry-form')"
				/>
		</div>

</template>

