
let sliderWrapper = document.querySelector('.slider-wraper').clientWidth;

const sliders = document.querySelector('.slider');
const slide = document.querySelectorAll('.slide');
const slideLength = slide.length;

const sliderBtns = document.querySelector('.slider-btns');
const sliderDots = document.querySelector('.slider-dots');
const prev_btn = document.querySelector('.prev');
const next_btn = document.querySelector('.next');

const slide_seconds = 5000;
let current_index = 1;
let last_index;
let move_distance;
let timer;

let startPos = 0;
let offset = 0;
let curPos = 0;



function createDots() {
	for (let i = 0; i < slideLength; i++) {
		let dot = document.createElement("li");
		dot.classList.add("dot")
		sliderDots.append(dot)
	}
}
createDots()


function nextSlide() {
	move_distance = -(current_index * sliderWrapper);
	last_index = current_index;

	if (current_index == slideLength) {
		current_index = 1;
		move_distance = 0;
	} else {
		current_index++;
	}

	slideImages();
}


function prevSlide() {
	if (current_index > 1) {
		last_index = current_index;
		current_index--;
		move_distance = move_distance + sliderWrapper;
	} else {
		last_index = current_index;
		current_index = slideLength;
		move_distance = -((slideLength - 1) * sliderWrapper);
	}

	slideImages();
	console.log("다음")
}


function slideImages() {
	clearInterval(timer);

	const distance = move_distance;

	sliders.style.transform = `translateX(${distance}px)`;
	document.querySelector(`.dot:nth-child(${last_index})`).classList.remove('on')
	document.querySelector(`.dot:nth-child(${current_index})`).classList.add('on')

	timer = setInterval(nextSlide, slide_seconds);
}


function slideDotImages(e) {
	const nodes = [...e.target.parentElement.children];
	const index = nodes.indexOf(e.target) + 1;
	if (e.target.classList == `dot`) {
		last_index = current_index;
		current_index = index;
		move_distance = -((current_index - 1) * sliderWrapper);
	}

	slideImages();
}


function init() {
	document.querySelector(`.dot:nth-child(${current_index})`).classList.remove('on')

	sliderWrapper = document.querySelector('.slider-wraper').clientWidth;
	slide.forEach(img => img.style.width = `${sliderWrapper}px`);
	sliders.style.width = `${sliderWrapper * slideLength}px`;

	current_index = slideLength;
	nextSlide();
}

init();

next_btn.addEventListener('click', nextSlide);
prev_btn.addEventListener('click', prevSlide);
sliderDots.addEventListener('click', slideDotImages);
window.addEventListener('resize', init);


sliders.addEventListener('touchstart', (e) => {
	startPos = e.touches[0].pageX;
});
// sliders.addEventListener('touchmove', (e) => {
// 	offset = curPos + (e.targetTouches[0].pageX - startPos);
// });
sliders.addEventListener('touchend', (e) => {
	const sum = curPos + (e.changedTouches[0].pageX - startPos);

	if (sum > 0) {
		prevSlide()
	} else if (sum < 0) {
		nextSlide()
	}

});


