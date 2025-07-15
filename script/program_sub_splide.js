/* Splide */
for (let i = 1; i <= 7; i++) {
  const splide = new Splide(`#programYahwa0${i}`, {
    perMove: 1,
    autoWidth: true,
    autoplay: false,
    interval: 1000,
    speed: 500,
    easing: 'ease-out',
    pauseOnHover: false,
    arrows: false,
    pagination: false,
    drag: true,
    gap: '30px',
  });

  splide.mount();

  document.querySelector(`.custom-prev0${i}`)?.addEventListener('click', () => {
    splide.go('<');
  });

  document.querySelector(`.custom-next0${i}`)?.addEventListener('click', () => {
    splide.go('>');
  });
}

/* 탭 */
let slideBtns = document.querySelectorAll('.slide-btn');
let slides = document.querySelectorAll('.splide');

// 초기값
slideBtns[0].classList.add('active');
slides[0].classList.add('active');

slideBtns.forEach((slideBtn, index) => {
  slideBtn.addEventListener('click', () => {
    // 모든 버튼과 슬라이드에서 active 제거
    slideBtns.forEach(btn => btn.classList.remove('active'));
    slides.forEach(slide => slide.classList.remove('active'));

    // 클릭한 버튼과 해당 인덱스의 슬라이드에 active 추가
    slideBtn.classList.add('active');
    slides[index].classList.add('active');
  });
});
