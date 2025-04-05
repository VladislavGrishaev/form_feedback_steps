<script setup>
import '../assets/styles/modules/_form.scss'
</script>

<template>
		<div>
				<form class="form-feedback">

						<div class="form-feedback__head">
								<button type="button" class="form-feedback__btn-close"></button>
								<div class="form-feedback__title-form">
										<h2>Форма обратной связи</h2>
								</div>
								<div class="form-feedback__subtitle-form">
										<p>Пожалуйста, оцените свой опыт прохождения тестового</p>
								</div>

								<div class="form-feedback__rating">
										<span class="form-feedback__star"></span>
										<span class="form-feedback__star"></span>
										<span class="form-feedback__star"></span>
										<span class="form-feedback__star"></span>
										<span class="form-feedback__star"></span>
								</div>
								<div class="form-feedback__benefits-wrap">
										<span class="form-feedback__item-benefit active-item">Интересно</span>
										<span class="form-feedback__item-benefit">Легко</span>
										<span class="form-feedback__item-benefit">Быстро сделал</span>
										<span class="form-feedback__item-benefit">Красиво</span>
										<span class="form-feedback__item-benefit">Подробно описано</span>
										<span class="form-feedback__item-benefit">Все понятно и по делу</span>
								</div>
						</div>

						<div class="form-feedback__body">
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

						<div class="form-feedback__footer">
								<button type="button" class="form-feedback__btn form-feedback__btn--white">Отменить</button>
								<button type="submit" class="form-feedback__btn form-feedback__btn--blue">Отправить</button>
						</div>
				</form>
		</div>
</template>



























