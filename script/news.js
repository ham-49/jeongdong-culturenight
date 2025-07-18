gsap.from('.news_title_wrap p', {
  y: 40, opacity: 0, duration: 1.2, ease: 'power1.out',
  scrollTrigger: {
    trigger: '.news',
    start: 'top 90%',
    toggleActions: 'play none none reverse',
    markers: true 
  }
});
