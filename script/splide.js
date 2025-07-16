/* intro */
new Splide('#sliderIntroTop', {
  type: 'loop',
  autoWidth: true,
  autoplay: true,
  interval: 2000,
  speed: 4000,
  easing: 'linear',
  pauseOnHover: false,
  arrows: false,
  pagination: false,
  drag: false,
  gap: '30px',
}).mount();

new Splide('#sliderIntroBottom', {
  type: 'loop',
  autoWidth: true,
  autoplay: true,
  direction: 'rtl',
  interval: 1000,
  speed: 3000,
  easing: 'linear',
  pauseOnHover: false,
  arrows: false,
  pagination: false,
  drag: false,
  gap: '30px',
}).mount();

/* promotion */
new Splide('#sliderSupport', {
  type: 'loop',
  autoWidth: true,
  perMove: 1,
  autoplay: true,
  interval: 1500,
  speed: 4000,
  easing: 'linear',
  pauseOnHover: false,
  arrows: false,
  pagination: false,
  drag: true,
  gap: '80px',
}).mount();

/* archive */
new Splide('#sliderArchive', {
  perMove: 1,
  autoWidth: true,
  autoplay: false,
  interval: 1000,
  speed: 1000,
  easing: 'linear',
  pauseOnHover: false,
  arrows: false,
  pagination: false,
  drag: true,
  gap: '20px',
}).mount();

/* sns */
new Splide('#sliderSns', {
  perPage: 3,
  perMove: 1,
  autoplay: false,
  interval: 1000,
  speed: 1000,
  easing: 'linear',
  pauseOnHover: false,
  arrows: false,
  pagination: false,
  drag: true,
  gap: '0',
}).mount();
