gsap.registerPlugin(ScrollTrigger);

gsap.from('.news_title_wrap p', {
  y: 40, opacity: 0, duration: 1.2, ease: 'power1.out',
  scrollTrigger: {
    trigger: '.news_title_wrap',
    start: 'top 60%',
    toggleActions: 'play none none reverse',
    markers: true 
  }
});


console.log(gsap, ScrollTrigger);
