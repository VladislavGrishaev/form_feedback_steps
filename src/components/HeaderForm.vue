<script setup>
import {defineProps} from "vue";

const props = defineProps({
		title: {
				type: String,
				required: true
		},
		subtitle: {
    type: String,
    required: true
		}
})
</script>

<template>
		<div class="form-feedback__title-form">
				<h2>{{ props.title }}</h2>
		</div>
		<div class="form-feedback__subtitle-form">
				<p>{{ props.subtitle }}</p>
		</div>
</template>
