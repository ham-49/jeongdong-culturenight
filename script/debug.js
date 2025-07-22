// script/debug.js 등 별도 파일에 추가
(function () {
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);
  console.log("[디버깅] 현재 기기:", isMobile ? "📱 모바일" : "💻 데스크탑");

  // 스크롤 이벤트 추적
  window.addEventListener('scroll', () => {
    console.log("[스크롤 위치]", window.scrollY);
  });

  // 터치 이벤트 추적
  window.addEventListener('touchstart', (e) => {
    console.log("[터치 시작]", e.touches[0]);
  });

  window.addEventListener('touchmove', (e) => {
    console.log("[터치 이동]", e.touches[0]);
  });

  window.addEventListener('resize', () => {
    console.log("[창 크기 변경]", window.innerWidth, window.innerHeight);
  });

  // 스크롤 튐 방지 테스트용
  setInterval(() => {
    if (window.scrollY < 0) {
      console.warn("[경고] 스크롤 Y 음수 발생!", window.scrollY);
    }
  }, 500);
})();
