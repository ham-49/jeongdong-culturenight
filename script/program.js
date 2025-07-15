/* 스와이퍼 */
(() => {
  let slides = document.querySelectorAll('.slide');
  let prevBtn = document.querySelector('.btn_prev');
  let nextBtn = document.querySelector('.btn_next');
  let pagination = document.querySelector('.pagination');
  let currentPageEl = pagination.querySelector('.current_page');
  let totalPageEl = pagination.querySelector('.total_page');
  let total = slides.length;
  let activeIndex = 0;

  // 5개 위치, 크기, 회전, 투명도, zIndex 설정
  const positions = [
    { x: -1365, y: 732, rot: -50, scale: 1, opacity: 0.8, zIndex: 1 },
    { x: -690, y: 196, rot: -30, scale: 1, opacity: 0.8, zIndex: 2 },
    { x: 0, y: 10, rot: 0, scale: 1, opacity: 1, zIndex: 3 },
    { x: 690, y: 196, rot: 30, scale: 1, opacity: 0.8, zIndex: 2 },
    { x: 1365, y: 732, rot: 50, scale: 1, opacity: 0.8, zIndex: 1 }
  ];

  totalPageEl.textContent = total.toString().padStart(2, '0');

  function updateSlides() {
    slides.forEach(slide => {
      let index = Number(slide.dataset.index);
      let offset = (index - activeIndex + total) % total;
      let posIndex = (offset - (0 - 2) + total) % total; // 0번이 중앙에 위치하도록 보정

      if (posIndex > 4) {
        // 보이지 않게 처리
        slide.style.opacity = '0';
        slide.style.pointerEvents = 'none';
        slide.style.transform = `translateX(0) translateY(30px) scale(0)`;
        slide.style.zIndex = '0';
        slide.dataset.active = 'false';
      } else {
        let pos = positions[posIndex];

        // 처음 활성화될 때 애니메이션
        if (slide.dataset.active !== 'true') {
          slide.style.transform = `translateX(${pos.x}px) translateY(${pos.y + 30}px) rotateZ(${pos.rot}deg) scale(${pos.scale})`;
          slide.style.opacity = '0';
          slide.style.pointerEvents = 'auto';
          slide.style.zIndex = pos.zIndex;

          setTimeout(() => {
            slide.style.transform = `translateX(${pos.x}px) translateY(${pos.y}px) rotateZ(${pos.rot}deg) scale(${pos.scale})`;
            slide.style.opacity = pos.opacity;
          }, 50);

          slide.dataset.active = 'true';
        } else {
          slide.style.transform = `translateX(${pos.x}px) translateY(${pos.y}px) rotateZ(${pos.rot}deg) scale(${pos.scale})`;
          slide.style.opacity = pos.opacity;
          slide.style.pointerEvents = 'auto';
          slide.style.zIndex = pos.zIndex;
        }

        // 가운데 슬라이드일 때 페이지 번호 표시
        if (posIndex === 2) {
          let pageNumber = (index + 1).toString().padStart(2, '0');
          currentPageEl.textContent = pageNumber;
        }
      }
    });
  }

  prevBtn.addEventListener('click', () => {
    activeIndex = (activeIndex - 1 + total) % total;
    updateSlides();
  });

  nextBtn.addEventListener('click', () => {
    activeIndex = (activeIndex + 1) % total;
    updateSlides();
  });

  // 초기화
  updateSlides();
})();
