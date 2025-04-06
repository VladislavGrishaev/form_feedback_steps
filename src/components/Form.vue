<script setup>

</script>

<template>
		<form class="form-feedback__form">
				<div class="form-feedback__rating">
						<button type="button" class="form-feedback__star"></button>
						<button type="button" class="form-feedback__star"></button>
						<button type="button" class="form-feedback__star"></button>
						<button type="button" class="form-feedback__star"></button>
						<button type="button" class="form-feedback__star"></button>
				</div>

				<div class="form-feedback__benefits-wrap">
						<button type="button" class="form-feedback__item-benefit active-item">Интересно</button>
						<button type="button" class="form-feedback__item-benefit">Легко</button>
						<button type="button" class="form-feedback__item-benefit">Быстро сделал</button>
						<button type="button" class="form-feedback__item-benefit">Красиво</button>
						<button type="button" class="form-feedback__item-benefit">Подробно описано</button>
						<button type="button" class="form-feedback__item-benefit">Все понятно и по делу</button>
				</div>

				<div class="form-feedback__fields-container">
						<div class="form-feedback__field-wrap form-feedback__field-wrap--name">
								<label for="fullname">ФИО</label>
								<input id="fullname" type="text" name="name" placeholder="Иван Иванов">
						</div>
						<div class="form-feedback__field-wrap form-feedback__field-wrap--email">
								<label for="email">Почта</label>
								<input id="email" type="email" placeholder="Текст">
						</div>
						<div class="form-feedback__field-wrap form-feedback__field-wrap--phone">
								<label for="phone">Номер телефона</label>
								<input id="phone" type="tel" placeholder="+7 (000) 000 00 00">
						</div>
						<div class="custom-select">
								<span class="custom-select__label">Грейд</span>
								<div class="custom-select__selected">Выберите</div>
								<div class="custom-select__dropdown-wrap">
										<ul class="custom-select__dropdown">
												<li class="custom-select__option">Junior</li>
												<li class="custom-select__option">Middle</li>
												<li class="custom-select__option">Senior</li>
												<li class="custom-select__option">Team Lead</li>
												<li class="custom-select__option">Junior</li>
												<li class="custom-select__option">Middle</li>
												<li class="custom-select__option">Senior</li>
												<li class="custom-select__option">Team Lead</li>
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



























