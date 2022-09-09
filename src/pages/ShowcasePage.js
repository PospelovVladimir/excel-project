import $ from '../core/dom';
import Page from '../core/Page';
import createTableListHTML from './showcase.functions';

export default class ShowcasePage extends Page {
	getRoot() {
		const getId = Date.now();
		return $.create('div', 'showcase').html(`
						<div class="showcase__header">
					<div class="showcase-header-logo">
						<span class="showcase-header-logo__ico	material-icons">
							toc
						</span>
						<span class="showcase-header-logo__text">Таблицы</span>
					</div>
					<form class="showcase-header-search" action="#" method="POST">
						<button type="submit" class="showcase-header-search__btn">
							<span class="material-icons">
								search
							</span>
						</button>
						<input type="text" placeholder="Поиск" class="showcase-header-search__field" />
					</form>
					<div class="showcase-header-auth">
						<span class="material-icons">
							account_circle
						</span>
					</div>
				</div>
				<div class="showcase__controll">
					<h3>Создать таблицу</h3>
					<div class="showcase__controll-holder">
						<div class="showcase-controll">
							<div class="showcase-controll__btn">
								<span class="material-icons">
									add_circle_outline
								</span>
							</div>
							<a href="#excel/${getId}" class="showcase-controll__title">Новая таблица</a>
						</div>
						<div class="showcase-controll">
							<div class="showcase-controll__btn">
								<span class="material-icons">
									add_circle_outline
								</span>
							</div>
							<a href="#" class="showcase-controll__title">Доп опция 2</a>
						</div>
						<div class="showcase-controll">
							<div class="showcase-controll__btn">
								<span class="material-icons">
									add_circle_outline
								</span>
							</div>
							<a href="#" class="showcase-controll__title">Доп опция 3</a>
						</div>
					</div>
				</div>
				${createTableListHTML()}
				`);
	}
}
