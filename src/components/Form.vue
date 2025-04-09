<script setup>
import {computed, onMounted, ref} from "vue";
import IMask from "imask";
import {useFormStore} from "../store/formStore.js";
import {useClickOutside} from "@/composable/useClickOutside.js";
import useWindowSize from "@/composable/useWindowSize.js";

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

// отправка формы
const sendForm = ()=> {
		store.validateForm()
		store.statusForm()

  console.log('Результат данных формы:');
  console.log(JSON.stringify(store.formData, null, 2));
}

const resetDataForm = ()=> {
		store.resetForm()
}

const {width: windowWidth} = useWindowSize();

const nextStepForm = () => {
  const isValid = store.validateForm();

  return isValid ? store.nextStep() :store.formStatus = 'error';
}

const progressBar = computed(() => {
  if (store.currentStep === 2) return '100%';

  const fields = [
    store.formData.name.trim(),
    store.formData.email.trim(),
    store.formData.phone.trim()
  ];

  const filledCount = fields.filter(Boolean).length;
  const progress = (filledCount / fields.length) * 50;

  return `${progress}%`;
});



</script>

<template>
		<form
						@submit.prevent="sendForm"
						:class="{
        'active-is-mobile': windowWidth <= 767,
        'active-is-desktop': windowWidth >= 768,
        'active-benefits': store.formData.rating !== 0,
        'active-step-1': store.currentStep === 1 && windowWidth <= 767,
        'active-step-2': store.currentStep === 2 && windowWidth <= 767
      }"
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
												name="name"
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
						<div
										class="custom-select"
										ref="customSelectRef">
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
						<div
										class="form-feedback__field-wrap form-feedback__field-wrap--message">
								<label for="message">Дополнительная информация</label>
								<textarea
												v-model="store.formData.message"
												id="message"
												name="message"
												placeholder="Что понравилось и не понравилось"></textarea>
						</div>
				</div>

				<!-- Кнопки для десктопа -->
				<div
								v-if="windowWidth >= 768"
								class="form-feedback__btns-wrap form-feedback__btns-wrap--pc">
						<button
										@click="resetDataForm"
										type="button"
										class="form-feedback__btn btn btn-white">Отменить ПК</button>
						<button type="submit" class="form-feedback__btn btn btn--blue">Отправить ПК</button>
				</div>

				<!-- Шаги для мобильных -->
				<div class="form-feedback__steps-wrap">
						<span class="form-feedback__step">1</span>
						<span class="form-feedback__step-process">
													<span
																	:style="{width: progressBar}"
																	class="form-feedback__step-process-line"></span>
												</span>
						<span class="form-feedback__step">2</span>
				</div>

				<!-- Кнопки для мобильных -->
				<div class="form-feedback__btns-wrap form-feedback__btns-wrap--step-1">
						<button

										type="button"
										class="form-feedback__btn btn btn-white">Отменить 1</button>

						<button
										@click="nextStepForm"
										type="button"
										class="form-feedback__btn btn btn--blue">Далее 1</button>
				</div>

				<div class="form-feedback__btns-wrap form-feedback__btns-wrap--step-2">
						<button
          @click="store.prevStep"
										type="button"
										class="form-feedback__btn btn btn-white">Назад 2</button>
						<button
										@click="sendForm"
										type="button"
										class="form-feedback__btn btn btn--blue">Далее2</button>
				</div>

		</form>
</template>
