gsap.registerPlugin(ScrollTrigger); //스크롤 트리거 플러그인 등록

let splideInstance;

/* 슬라이더 초기화 함수 */
function initSplide() {
  if (!splideInstance) {
    splideInstance = new Splide('#sliderGallery', {
      type: 'loop',
      autoWidth: true,
      perMove: 1,
      autoplay: false,
      interval: 1000,
      speed: 4500,
      easing: 'linear',
      pauseOnHover: false,
      arrows: false,
      pagination: false,
      drag: false,
      gap: '70px',
    });
    splideInstance.mount();
  }
}

/* 슬라이더가 있고 자동재생 컴포넌트가 있으면 자동 재생 */
function playSlider() {
  if (splideInstance && splideInstance.Components.Autoplay) {
    splideInstance.Components.Autoplay.play();
  }
}

/* 슬라이더가 있고 자동재생 컴포넌트가 없으면 자동 재생 종료 */
function stopSlider() {
  if (splideInstance && splideInstance.Components.Autoplay) {
    splideInstance.Components.Autoplay.pause();
  }
}

/* 문서 로드 후 슬라이더 초기화 */
document.addEventListener('DOMContentLoaded', () => {
  initSplide();
});

/* 갤러리 섹션에 대해 인트로에서 아래로 내려오는 이벤트 실행 */
// slide02 스크롤 애니메이션
gsap.to(".slide02", {
  scrollTrigger: {
    trigger: ".gallery",
    start: "top bottom",
    end: "top top",
    scrub: true,
  },
  rotate: 0,
  y: 0,
  ease: "none"
});
// 자동재생 시작 및 중지 트리거
ScrollTrigger.create({
  trigger: ".gallery",
  start: "top top",
  end: "bottom top",
  onEnter: () => {
    playSlider();       // 아래로 들어오면 재생
  },
  onLeaveBack: () => {
    stopSlider();       // 위로 나가면 정지
  }
});