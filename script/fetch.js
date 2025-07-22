/* header */
fetch('/jeongdong-culturenight/fetch/header.html')
.then(res => res.text())
.then(data => {
  document.querySelector('.header-include').innerHTML = data;
  /* header-script */
  const langToggle = document.querySelector('.language_toggle');
  const langOptionsContainer = document.querySelector('.language_options');
  const languages = ['KOR', 'ENG'];
  
  /* language 랜더링 */
  function renderOptions(currentLang) {
    langOptionsContainer.innerHTML = '';
    languages.forEach(lang => {
      if (lang !== currentLang) {
        const btn = document.createElement('button');
        btn.classList.add('language_option');
        btn.textContent = lang;
        btn.dataset.lang = lang;
        btn.onclick = e => {
          e.preventDefault();
          // 버튼 텍스트 교체
          langToggle.textContent = lang;
          // 옵션 닫기
          langOptionsContainer.classList.remove('active');
          // 옵션 목록 재렌더링 (현재 선택된 언어 제외)
          renderOptions(lang);
        };
        langOptionsContainer.appendChild(btn);
      }
    });
  }

  langToggle.onclick = e => {
    e.preventDefault();
    langOptionsContainer.classList.toggle('active');
  };
  // 초기 렌더링
  renderOptions(langToggle.textContent);
  
  /* 헤더 버튼  */
  const dotWrap = document.querySelector('.dot_Wrap');
  const closeWrap = document.querySelector('.close_Wrap');
  const navWrap = document.querySelector('.nav');
  const header = document.querySelector('.header');
  const gallery = document.querySelector('.gallery');

  // 모바일 확인 함수
  function isMobile() {
    return window.innerWidth <= 768;
  }

  function setNavState() {
    if (!navWrap || !closeWrap || !dotWrap) return;

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

  closeWrap.onclick = () => {
    if (!closeWrap || !navWrap || !dotWrap) return;
    closeWrap.classList.add('hidden');
    closeWrap.classList.remove('show');
    navWrap.classList.add('hidden');

    setTimeout(() => {
      closeWrap.style.display = 'none';
      dotWrap.style.display = 'flex';
      dotWrap.classList.add('show');
      dotWrap.classList.remove('hidden');
    }, 300);
  };

  dotWrap.onclick = () => {
    if (!dotWrap || !navWrap || !closeWrap) return;
    dotWrap.classList.add('hidden');
    dotWrap.classList.remove('show');
    navWrap.classList.remove('hidden');

    setTimeout(() => {
      dotWrap.style.display = 'none';
      closeWrap.style.display = 'block';
      closeWrap.classList.add('show');
      closeWrap.classList.remove('hidden');
    }, 300);
  };

  // 스크롤 이벤트 최적화
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      if (!header) {
        ticking = false;
        return;
      }
      if (isMobile()) {
        header.style.display = 'block';
      } else if (gallery) {
        const galleryTop = gallery.getBoundingClientRect().top;
        header.style.display = galleryTop <= 100 ? 'block' : 'none';
      }
      ticking = false;
    });
  });
});

/* footer */
fetch('/jeongdong-culturenight/fetch/footer.html')
.then(res => res.text())
.then(data => {
  document.querySelector('.footer-include').innerHTML = data;
});

/* aside */
fetch('/jeongdong-culturenight/fetch/aside.html')
.then(res => res.text())
.then(data => {
  document.querySelector('.aside-include').innerHTML = data;

  const aside = document.querySelector('aside');
  const program = document.querySelector('.program');
  const footer = document.querySelector('.footer');
  const asideImage = document.querySelector('aside img');

  // aside 스크롤 이벤트 최적화
  let asideTicking = false;
  window.addEventListener('scroll', () => {
    if (asideTicking) return;
    asideTicking = true;
    window.requestAnimationFrame(() => {
      if (!aside || !program || !footer || !asideImage) {
        asideTicking = false;
        return;
      }

      const programRect = program.getBoundingClientRect();
      const footerRect = footer.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.9;

      if (footerRect.top <= window.innerHeight) {
        aside.classList.remove('visible');
      } else if (programRect.top <= triggerPoint) {
        aside.classList.add('visible');
      } else {
        aside.classList.remove('visible');
      }

      if (asideImage.getBoundingClientRect().top > programRect.bottom) {
        asideImage.classList.remove('invert');
      } else {
        asideImage.classList.add('invert');
      }

      asideTicking = false;
    });
  });
});

/* resize 대응 */
window.addEventListener('resize', () => {
  const navWrap = document.querySelector('.nav');
  const closeWrap = document.querySelector('.close_Wrap');
  const dotWrap = document.querySelector('.dot_Wrap');

  // 여기서도 isMobile 함수 재정의 하지 않고 사용
  function isMobile() {
    return window.innerWidth <= 768;
  }

  if (!navWrap || !closeWrap || !dotWrap) return;

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
