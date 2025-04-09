import {defineStore} from "pinia";

export const useFormStore = defineStore('form', {
  state: () => ({
    formStatus: 'form',
    currentStep: 1,
    formData: {
      rating: 0,
      benefits: [],
      name: '',
      email: '',
      phone: '',
      grade: '',
      message: ''
    },
    errors: {
      name: false,
      email: false,
      phone: false,
    },
    benefitsArray: [
      'Интересно',
      'Легко',
      'Быстро сделал',
      'Красиво',
      'Подробно описано',
      'Все понятно и по делу',
    ]
    , optionArray: [
      'Junior',
      'Middle',
      'Senior',
      'Team Lead',
      'Junior+',
      'Middle+',
      'Senior+'
    ]
  }),
  actions: {
    /** текущий шаг **/
    setCurrentStep(step) {
      this.currentStep = step
    },

    /** следующий шаг **/
    nextStep() {
      if (this.validateForm()) {
        this.currentStep += 1
      }
      else {
        console.log('Validation failed');
      }
    },

    /** предыдущий шаг **/
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep -= 1
      }
    },

    setField(field, value) {
      this.formData[field] = value
    },

    /** устанавливаем рейтинг **/
    setRating(rating) {
      // если повторно кликнули на установленную звезду рейтинга, то сбрасываем
      if (this.formData.rating === rating) {
        this.formData.rating = 0
        this.formData.benefits = []
      } else {
        this.formData.rating = rating
        this.formData.benefits = []
      }
      // сброс бенефитов при смене рейтинга
      this.errors.benefits = false
    },

    /** множественный выбор бенефитов **/
    toggleBenefit(benefit) {
      const index = this.formData.benefits.indexOf(benefit)

      if (index === -1) {
        this.formData.benefits.push(benefit)
      } else {
        this.formData.benefits.splice(index, 1)
      }
    },

    /** валидация полей **/
    // имя
    validateName() {
      const name = this.formData.name.trim();

      if (!name) {
        this.errors.name = true;
        return false;
      } else {
        this.errors.name = false;
        return true;
      }
    },

    // почта
    validateEmail() {
      const email = this.formData.email.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

      if (!emailRegex.test(email)) {
        this.errors.email = true;
        return false;
      } else {
        this.errors.email = false;
        return true;
      }
    },

    // телефон
    validatePhone() {
      const phone = this.formData.phone.trim();
      const phoneRegex = /^\+7\s?\(?\d{3}\)?\s?\d{3}\s?\d{2}\s?\d{2}$/;

      if (!phoneRegex.test(phone)) {
        this.errors.phone = true;
        return false;
      } else {
        this.errors.phone = false;
        return true;
      }
    },

    /** валидация всей формы **/
    validateForm() {
      const nameValid = this.validateName();
      const emailValid = this.validateEmail();
      const phoneValid = this.validatePhone();

      return nameValid && emailValid && phoneValid;
    },

    /** обновление статуса формы **/
    statusForm() {
      const isValid = this.validateForm();
      this.formStatus = isValid ? 'success' : 'error';
      return isValid;
    },


    /** сброс занчений формы **/
    resetForm() {
      this.formData = {
        rating: 0,
        benefits: [],
        name: '',
        email: '',
        phone: '',
        grade: '',
        message: '',
      };
      this.errors = {
        name: false,
        email: false,
        phone: false,
      }
      this.currentStep = 1
    }
  }
})

























