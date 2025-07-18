gsap.from('.news_title_wrap p', {
  y: 40, opacity: 0, duration: 1.5,
  ease: 'power2.out',
  stagger: 0.25,
  scrollTrigger: {
    trigger: '.news_title_wrap',
    start: 'top 85%',
    toggleActions: 'play none none reverse'
  }
});
