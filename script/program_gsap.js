gsap.registerPlugin(ScrollTrigger);

const isMobile = window.innerWidth <= 768; // 모바일 판단 기준

let tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#IntroEvent',
    start: 'top top',
    end: isMobile ? '+=100%' : '+=150%', // 모바일은 짧게
    scrub: 1,
    pin: true,
  }
});

tl
.to('.program_intro-top', {
  y: '-100%',
  opacity: 0
}, 0)
.to('.program_intro-bottom', {
  y: '100%',
  opacity: 0
}, 0)
.fromTo('.program_intro_img', {
  rotate: 0,
  scale: 0.5
}, {
  rotate: 360,
  scale: 1.2,
  duration: 1
}, 0.2)
.to('#IntroEvent', {
  opacity: 0,
  duration: 0.5,
  onComplete: () => {
    gsap.set('#IntroEvent', { display: 'none' });
  }
}, 0.9)
.set('.slider_container', {
  display: 'block',
  opacity: 1,
  pointerEvents: 'auto'
}, isMobile ? 0.7 : 1); // 슬라이더 모바일은 더 일찍 표시
