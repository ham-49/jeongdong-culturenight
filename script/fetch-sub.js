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
  // 옵션 영역을 비우고 현재 lang이 아닌 언어만 보여주기
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
        // 버튼 텍스트 교체
        langToggle.textContent = lang;
        // 옵션 닫기
        langOptionsContainer.classList.remove('active');
        // 옵션 목록 재렌더링 (현재 선택된 언어 제외)
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

  /* 헤더 버튼  */
  let dotWrap = document.querySelector('.dot_Wrap');
  let closeWrap = document.querySelector('.close_Wrap');
  let navWrap = document.querySelector('.nav');
  function isMobile() {
    return window.innerWidth <= 768; // 너비 기준은 필요에 따라 768px 이하로 조정
  }
  if (isMobile()) {
    console.log("모바일")
    navWrap.classList.add('hidden');
    /* 확인 */
    closeWrap.classList.remove('show');
    dotWrap.classList.add('show');
    dotWrap.style.display = 'flex';
    closeWrap.style.display = 'none';
  }
  else{
    dotWrap.classList.remove('show');
    closeWrap.classList.add('show');
  }

  // closeWrap 클릭 → 닷 보여주기
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

  // dotWrap 클릭 시 네브 보이고 열리게
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

  /* 헤더 보이기 */
  let header = document.querySelector('.header');
  let gallery = document.querySelector('.gallery');
  
  window.addEventListener('scroll', () => {
    if (isMobile()) {
      header.style.display = 'block';
      return; // 모바일일 경우 아래 조건 무시하고 항상 보이게
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

    // fetch로 로드된 이후에 aside 요소를 가져와야 함
    let aside = document.querySelector('aside');
    let footer = document.querySelector('.footer');

    // 둘 다 있을 때만 이벤트 연결
    if (aside && footer) {
      window.addEventListener('scroll', () => {
        let footerRect = footer.getBoundingClientRect();
        let footerTopReached = footerRect.top <= window.innerHeight;

        if (footerTopReached) {
          aside.classList.remove('visible');
        } else {
          aside.classList.add('visible');
        }
      });
    } else {
      console.warn('aside 또는 footer 요소를 찾을 수 없습니다.');
    }
  });

/* 리사이징 대응 */
window.addEventListener('resize', () => {
  location.reload(); 
});