gsap.registerPlugin(ScrollTrigger); // ScrollTrigger 등록

let splideInstance;

/* 슬라이더 초기화 */
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

/* 자동재생 제어 함수 */
function playSlider() {
  if (splideInstance && splideInstance.Components.Autoplay) {
    splideInstance.Components.Autoplay.play();
  }
}

function stopSlider() {
  if (splideInstance && splideInstance.Components.Autoplay) {
    splideInstance.Components.Autoplay.pause();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initSplide();

  const isMobile = window.innerWidth <= 768; // 모바일 구간

  if (isMobile) {
    playSlider(); // 모바일은 무조건 자동 재생
  } else {
    // 모바일 구간 제외하여 GSAP 작동하도록 조건 지정
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

    ScrollTrigger.create({
      trigger: ".gallery",
      start: "top top",
      end: "bottom top",
      onEnter: () => {
        playSlider(); // 아래에서 들어올 때 재생
      },
      onLeaveBack: () => {
        stopSlider(); // 다시 위로 나갈 때 정지
      }
    });
  }
});
