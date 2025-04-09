<script setup>
import {ref} from "vue";
import {useFormStore} from "@/store/formStore.js";
import FeedbackModal from "./components/FeedbackModal.vue";

const store = useFormStore();
const showModal = ref(false);

const openForm = () => {
  store.resetForm();
  showModal.value = true;
  store.formStatus = 'form';
};

const closeForm = () => {
  store.resetForm();
  showModal.value = false;
};

const retryForm = () => {
		store.resetForm();
		store.formStatus = 'form';
  showModal.value = true;
};



</script>

<template>
		<div class="app-container">
				<FeedbackModal
								v-if="showModal"
								@close="closeForm"
								@close-error-form="closeForm"
				    @retry-form="retryForm"
				/>

				<div class="open-modal">
						<button
										@click="openForm"
										type="button"
										class="btn btn--blue">Открыть форму
						</button>
				</div>
		</div>
</template>


