import {defineStore} from "pinia";

export const useFormStore = defineStore('form', {
  state: () => ({
    currentStep: 1,
    formData: {
      rating: 0,
      benefits: [],
      name: '',
      email: '',
      phone: '',
      grade: '',
      message: '',
    },
    errors: {
      rating: false,
      benefits: false,
      name: false,
      email: false,
      phone: false,
      grade: false,
      message: false,
    },
    benefitsArray: [
      'Интересно',
      'Легко',
      'Быстро сделал',
      'Красиво',
      'Подробно описано',
      'Все понятно и по делу',
    ]
  }),
  actions: {
    setCurrentStep(step) {
      this.currentStep = step
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
      }
      else {
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
      }
      else {
        this.formData.benefits.splice(index, 1)
      }
    },

    /** валидация полей **/
    validateForm() {
      let isValid = true

      // имя
      if (!this.formData.name.trim()) {
        this.errors.name = true
        isValid = false


        console.log('[FORM STORE] Ошибка валидации: не заполнено имя')
      }
      else {
        this.errors.name = false
      }

      // email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

      if (!emailRegex.test(this.formData.email)) {
        this.errors.email = true
        isValid = false

        console.log(`[FORM STORE] Ошибка валидации: некорректный email "${this.formData.email}"`)
      } else {
        this.errors.email = false
      }

      // телефон
      const phoneRegex = /^\+7\s?\(?\d{3}\)?\s?\d{3}\s?\d{2}\s?\d{2}$/

      if (!phoneRegex.test(this.formData.phone)) {
        this.errors.phone = true
        isValid = false

        console.log(`[FORM STORE] Ошибка валидации: некорректный телефон "${this.formData.phone}"`)
      } else {
        this.errors.phone = false
      }
    }
  }
})

























