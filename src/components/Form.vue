<script setup>
import {computed, onMounted, ref, watch} from "vue";
import IMask from "imask";
import {useFormStore} from "../store/formStore.js";
import {useClickOutside} from "@/composable/useClickOutside.js";

/** ------------------------------------------- **/

const store = useFormStore();
const phoneInput = ref(null);

// маска телефона
onMounted(() => {
  if(phoneInput.value) {
    const mask = IMask(phoneInput.value, {
      mask: '+{7} (000) 000 00 00',
      lazy: true
    });

    // Синхронизация значения маски с хранилищем
    mask.on('accept', () => {
      store.formData.phone = mask.value;
      store.validatePhone();
    });

    if (store.formData.phone) {
      mask.value = store.formData.phone;
    }
  }
})

// выбранные преимущества
const isSelected = (benefit) => store.formData.benefits.includes(benefit);

// ховер рейтингов
const hoverRating = ref(0)

const isActive = (index) => {
  // Используем hoverRating для подсветки
  return index <= (hoverRating.value || store.formData.rating)
}
// отслеживаем изменения рейтинга
watch(
  () => store.formData.rating,
  (newRating) => {
    console.log(`${newRating}`)
  }
)

// UI-валидация
const touchedName = ref(false);
const touchedEmail = ref(false);
const touchedPhone = ref(false);

const nameHasError = computed(() => {
  return touchedName.value && (store.errors.name || store.formData.name.trim() === '');
});
const nameIsValid = computed(() => {
  return touchedName.value && !store.errors.name && store.formData.name.trim() !== '';
});

const emailHasError = computed(() => {
  return touchedEmail.value && (store.errors.email || store.formData.email.trim() === '');
});
const emailIsValid = computed(() => {
  return touchedEmail.value && !store.errors.email && store.formData.email.trim() !== '';
});

const phoneHasError = computed(() => {
  return touchedPhone.value && (store.errors.phone || store.formData.phone.trim() === '');
});
const phoneIsValid = computed(() => {
  return touchedPhone.value && !store.errors.phone && store.formData.phone.trim() !== '';
});


// селект грейда
const isDropdownOpen = ref(false)

const toggleDropdownSelect = ()=> {
  isDropdownOpen.value = !isDropdownOpen.value
}

const selectGrade = (grade)=> {
  store.setField('grade', grade)
		isDropdownOpen.value = false
}

const customSelectRef = ref(null);

useClickOutside(customSelectRef, () => isDropdownOpen.value = false);




</script>

<template>
		<form
						:class="{'active-benefits': store.formData.rating !== 0}"
						class="form-feedback__form">
				<div class="form-feedback__rating">
						<button
								v-for="index in 5"
								:key="index"
								:class="{'active-star': isActive(index)}"
								class="form-feedback__star"
								type="button"
								@click="store.setRating(index)"
								@mouseover="hoverRating = index"
								@mouseleave="hoverRating = 0"
						></button>

				</div>

				<div
								v-if="store.formData.rating > 0"
								class="form-feedback__benefits-wrap">
						<button
										v-for="benefit in store.benefitsArray"
										:key="benefit"
										:class="{ 'active-item': isSelected(benefit) }"
										@click="store.toggleBenefit(benefit)"
										type="button"
										class="form-feedback__item-benefit">
								{{ benefit }}
						</button>
				</div>

				<div class="form-feedback__fields-container">
						<div
										:class="{
				        'active-error': nameHasError,
												'active-success': nameIsValid
										}"
										class="form-feedback__field-wrap form-feedback__field-wrap--name">
								<label for="fullName">ФИО</label>
								<input
												v-model="store.formData.name"
												@blur="touchedName = true; store.validateName()"
												@input="touchedName = true; store.validateName()"
												id="fullName"
												type="text"
												placeholder="Иван Иванов">
						</div>

						<div
										:class="{
				        'active-error': emailHasError,
												'active-success': emailIsValid
										}"
										class="form-feedback__field-wrap form-feedback__field-wrap--email">
								<label for="email">Почта</label>
								<input
												v-model="store.formData.email"
												@blur="touchedEmail = true; store.validateEmail()"
												@input="touchedEmail = true; store.validateEmail()"
												id="email"
												type="email"
												placeholder="Текст">
						</div>

						<div
										:class="{
           'active-error': phoneHasError,
											'active-success': phoneIsValid
										}"
										class="form-feedback__field-wrap form-feedback__field-wrap--phone">
								<label for="phone">Номер телефона</label>
								<input
												v-model="store.formData.phone"
					       @blur="touchedPhone = true; store.validatePhone()"
												@input="touchedPhone = true; $event.target.value = $event.target.value.slice(0, 18)"
												ref="phoneInput"
												id="phone"
												type="tel"
												maxlength="18"
												placeholder="+7 (000) 000 00 00">
						</div>
						<div class="custom-select" ref="customSelectRef">
								<span class="custom-select__label">Грейд</span>
								<div
												:class="{'active-select': isDropdownOpen}"
												@click="toggleDropdownSelect"
												class="custom-select__selected">
										  {{ store.formData.grade || 'Выберите' }}
								</div>

								<div
												v-if="isDropdownOpen"
												class="custom-select__dropdown-wrap">
										<ul class="custom-select__dropdown">
												<li
																v-for="option in store.optionArray"
																:key="option"
																@click="selectGrade(option)"
																class="custom-select__option">
														{{ option }}
												</li>
										</ul>
								</div>
						</div>
						<div class="form-feedback__field-wrap form-feedback__field-wrap--message">
								<label for="message">Дополнительная информация</label>
								<textarea id="message" name="message" placeholder="Что понравилось и не понравилось"></textarea>
						</div>
				</div>

				<div class="form-feedback__steps-wrap">
						<span class="form-feedback__step active-step">1</span>
						<span class="form-feedback__step-process">
													<span class="form-feedback__step-process-line" style="width: 50%;"></span>
												</span>
						<span class="form-feedback__step">2</span>
				</div>

				<div class="form-feedback__btns-wrap">
						<button type="button" class="form-feedback__btn btn btn-white">Отменить</button>
						<button type="submit" class="form-feedback__btn btn btn--blue">Отправить</button>


				</div>
		</form>
</template>



























