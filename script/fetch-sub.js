/* header */
fetch('/jeongdong-culturenight/fetch/header.html')
.then(response => response.text())
.then(data => {
  document.querySelector('.header-include').innerHTML = data;

  /* header-script */
  let langToggle = document.querySelector('.language_toggle');
  let langOptionsContainer = document.querySelector('.language_options');
  let languages = ['KOR', 'ENG'];

  /* language 랜더링 */
  function renderOptions(currentLang) {
    langOptionsContainer.innerHTML = '';
    languages.forEach(lang => {
      if (lang !== currentLang) {
        let btn = document.createElement('button');
        btn.classList.add('language_option');
        btn.dataset.lang = lang;
        btn.textContent = lang;
        langOptionsContainer.appendChild(btn);
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          langToggle.textContent = lang;
          langOptionsContainer.classList.remove('active');
          renderOptions(lang);
        });
      }
    });
  }

  langToggle.addEventListener('click', (e) => {
    e.preventDefault();
    langOptionsContainer.classList.toggle('active');
  });

  // 초기 렌더링
  renderOptions(langToggle.textContent);

  let dotWrap = document.querySelector('.dot_Wrap');
  let closeWrap = document.querySelector('.close_Wrap');
  let navWrap = document.querySelector('.nav');

  // 모바일 여부 판단 함수
  function isMobile() {
    return window.innerWidth <= 768;
  }

  // 네비게이션 상태를 세팅하는 함수 (초기, resize 시 호출)
  function setNavState() {
    if (isMobile()) {
      navWrap.classList.add('hidden');
      closeWrap.classList.remove('show');
      closeWrap.style.display = 'none';
      dotWrap.classList.add('show');
      dotWrap.style.display = 'flex';
    } else {
      navWrap.classList.remove('hidden');
      closeWrap.classList.add('show');
      closeWrap.style.display = 'block';
      dotWrap.classList.remove('show');
      dotWrap.style.display = 'none';
    }
  }

  setNavState();

  closeWrap.addEventListener('click', () => {
    closeWrap.classList.add('hidden');
    closeWrap.classList.remove('show');
    navWrap.classList.add('hidden');
    setTimeout(() => {
      closeWrap.style.display = 'none';
      dotWrap.style.display = 'flex';
      requestAnimationFrame(() => {
        dotWrap.classList.add('show');
        dotWrap.classList.remove('hidden');
      });
    }, 300);
  });

  dotWrap.addEventListener('click', () => {
    dotWrap.classList.add('hidden');
    dotWrap.classList.remove('show');
    navWrap.classList.remove('hidden');
    setTimeout(() => {
      dotWrap.style.display = 'none';
      closeWrap.style.display = 'block';
      requestAnimationFrame(() => {
        closeWrap.classList.add('show');
        closeWrap.classList.remove('hidden');
      });
    }, 300);
  });

  let header = document.querySelector('.header');
  let gallery = document.querySelector('.gallery');

  window.addEventListener('scroll', () => {
    if (isMobile()) {
      header.style.display = 'block';
      return; // 모바일은 항상 보임
    }

    let galleryTop = gallery.getBoundingClientRect().top;
    if (galleryTop <= 100) {
      header.style.display = 'block';
    } else {
      header.style.display = 'none';
    }
  });
});

/* footer */
fetch('/jeongdong-culturenight/fetch/footer.html')
.then(response => response.text())
.then(data => {
  document.querySelector('.footer-include').innerHTML = data;
});

/* aside */
fetch('/jeongdong-culturenight/fetch/aside.html')
.then(response => response.text())
.then(data => {
  document.querySelector('.aside-include').innerHTML = data;

  let aside = document.querySelector('aside');
  let footer = document.querySelector('.footer');

  if (!aside || !footer) {
    console.warn('aside 또는 footer 요소를 찾을 수 없습니다.');
    return;
  }

  // throttle 함수 (스크롤 이벤트 빈도 제한)
  function throttle(func, limit = 100) {
    let lastFunc;
    let lastRan;
    return function() {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }

  function onScroll() {
    let footerRect = footer.getBoundingClientRect();
    if (footerRect.top <= window.innerHeight) {
      aside.classList.remove('visible');
    } else {
      aside.classList.add('visible');
    }
  }

  window.addEventListener('scroll', throttle(onScroll, 100));
});

/* 리사이징 대응 */
window.addEventListener('resize', () => {
  // reload 대신 네비 상태만 변경
  const navWrap = document.querySelector('.nav');
  const closeWrap = document.querySelector('.close_Wrap');
  const dotWrap = document.querySelector('.dot_Wrap');

  function isMobile() {
    return window.innerWidth <= 768;
  }

  if (isMobile()) {
    navWrap.classList.add('hidden');
    closeWrap.classList.remove('show');
    closeWrap.style.display = 'none';
    dotWrap.classList.add('show');
    dotWrap.style.display = 'flex';
  } else {
    navWrap.classList.remove('hidden');
    closeWrap.classList.add('show');
    closeWrap.style.display = 'block';
    dotWrap.classList.remove('show');
    dotWrap.style.display = 'none';
  }
});
