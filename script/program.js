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

  // positions는 기기 너비값에 따라 입력, 초기값
  let positions = [];

  // 뷰포트 크기에 따른 positions 배열 셋업 함수
  function setPositions() {
    if (window.innerWidth <= 768) {
      positions = [
        { x: -1365, y: 732, rot: -50, scale: 1, opacity: 0.8, zIndex: 1 },
        { x: -690, y: 196, rot: -30, scale: 1, opacity: 0.8, zIndex: 2 },
        { x: 0, y: 10, rot: 0, scale: 1, opacity: 1, zIndex: 3 },
        { x: 690, y: 196, rot: 30, scale: 1, opacity: 0.8, zIndex: 2 },
        { x: 1365, y: 732, rot: 50, scale: 1, opacity: 0.8, zIndex: 1 }
      ];
    } else if (window.innerWidth <= 1024) {
      positions = [
        { x: -1365, y: 732, rot: -50, scale: 1, opacity: 0.8, zIndex: 1 },
        { x: -600, y: 172, rot: -30, scale: 1, opacity: 0.8, zIndex: 2 },
        { x: 0, y: 10, rot: 0, scale: 1, opacity: 1, zIndex: 3 },
        { x: 600, y: 172, rot: 30, scale: 1, opacity: 0.8, zIndex: 2 },
        { x: 1365, y: 732, rot: 50, scale: 1, opacity: 0.8, zIndex: 1 }
      ];
    } else {
      positions = [
        { x: -1365, y: 732, rot: -50, scale: 1, opacity: 0.8, zIndex: 1 },
        { x: -690, y: 196, rot: -30, scale: 1, opacity: 0.8, zIndex: 2 },
        { x: 0, y: 10, rot: 0, scale: 1, opacity: 1, zIndex: 3 },
        { x: 690, y: 196, rot: 30, scale: 1, opacity: 0.8, zIndex: 2 },
        { x: 1365, y: 732, rot: 50, scale: 1, opacity: 0.8, zIndex: 1 }
      ];
    }
  }

  /* 페이지네이션 2자리 입력 */
  totalPageEl.textContent = total.toString().padStart(2, '0');
  /* 슬라이드 */
  function updateSlides() {
    slides.forEach(slide => {
      let index = Number(slide.dataset.index);
      let offset = (index - activeIndex + total) % total;
      let posIndex = (offset - (0 - 2) + total) % total;

      if (posIndex > 4) {
        slide.style.opacity = '0';
        slide.style.pointerEvents = 'none';
        slide.style.transform = `translateX(0) translateY(30px) scale(0)`;
        slide.style.zIndex = '0';
        slide.dataset.active = 'false';
      } else {
        let pos = positions[posIndex];

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

  // 초기 셋업
  setPositions();
  updateSlides();

  // 리사이즈 이벤트
  window.addEventListener('resize', () => {
    setPositions();
    updateSlides();
  });
})();
