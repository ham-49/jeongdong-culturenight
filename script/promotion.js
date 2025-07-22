// 아래에서 위로 텍스트 이벤트
gsap.from('.promotion_title_wrap .gradient_text, .promotion_title_wrap .title', {
  y: 60, opacity: 0, duration: 1.2, stagger: 0.15, ease: 'power2.out',
  scrollTrigger: {
    trigger: '.promotion_title_wrap',
    start: 'top 85%',
    toggleActions: 'play none none reverse'
  }
});
gsap.from('.promotion_aside', {
  y: 40, opacity: 0, duration: 1.2, ease: 'power1.out',
  scrollTrigger: {
    trigger: '.promotion_aside',
    start: 'top 85%',
    toggleActions: 'play none none reverse'
  }
});

// 대각선 이동 이벤트
gsap.from('.arrow_wrap', {
  x: 80, y: -80, opacity: 0, duration: 1.2, ease: 'power2.out',
  scrollTrigger: {
    trigger: '.arrow_wrap',
    start: 'top 85%',
    toggleActions: 'play none none reverse'
  }
});

// 콘텐츠 영역 자연스럽게 나오는 이벤트
gsap.from('.promotion_content', {
  y: 40, opacity: 0, duration: 0.8, ease: 'power2.out',
  scrollTrigger: {
    trigger: '.promotion_content',
    start: 'top 85%',
    toggleActions: 'play none none reverse'
  }
});