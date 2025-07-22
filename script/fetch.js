/* header */
fetch('/jeongdong-culturenight/fetch/header.html')
.then(res => res.text())
.then(data => {
  document.querySelector('.header-include').innerHTML = data;

  let langToggle = document.querySelector('.language_toggle');
  let langOptionsContainer = document.querySelector('.language_options');
  let languages = ['KOR', 'ENG'];

  // 언어 버튼 토글
  function renderOptions(currentLang) {
    langOptionsContainer.innerHTML = '';
    languages.forEach(lang => {
      if (lang !== currentLang) {
        let btn = document.createElement('button');
        btn.classList.add('language_option');
        btn.textContent = lang;
        btn.dataset.lang = lang;
        btn.onclick = e => {
          e.preventDefault();
          langToggle.textContent = lang;           // 선택한 언어로 토글 텍스트 변경
          langOptionsContainer.classList.remove('active');  
          renderOptions(lang);                      // 옵션 다시 렌더링
        };
        langOptionsContainer.appendChild(btn);
      }
    });
  }

  // 언어 토글 버튼 클릭 이벤트 (옵션 열고 닫기)
  langToggle.onclick = e => {
    e.preventDefault();
    langOptionsContainer.classList.toggle('active');
  };

  renderOptions(langToggle.textContent);

  let dotWrap = document.querySelector('.dot_Wrap'); 
  let closeWrap = document.querySelector('.close_Wrap');
  let navWrap = document.querySelector('.nav');       

  // 모바일 여부 판단 함수 (화면 너비 768px 이하)
  function isMobile() {
    return window.innerWidth <= 768;
  }

  // 네비게이션 초기/변경 상태 설정 함수
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

  // 닫기 아이콘 클릭 시 메뉴 닫고 열기 아이콘 보이기
  closeWrap.onclick = () => {
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

  // 열기 아이콘 클릭 시 메뉴 보이고 닫기 아이콘 보이기
  dotWrap.onclick = () => {
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

  let header = document.querySelector('.header');   
  let gallery = document.querySelector('.gallery'); 

  // 스크롤 시 헤더 보이기 (모바일은 항상 보임)
  window.addEventListener('scroll', () => {
    if (isMobile()) {
      header.style.display = 'block';
      return;
    }
    let galleryTop = gallery.getBoundingClientRect().top;
    header.style.display = (galleryTop <= 100) ? 'block' : 'none';
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

  let aside = document.querySelector('aside');          
  let program = document.querySelector('.program');     
  let footer = document.querySelector('.footer');      
  let asideImage = document.querySelector('aside img');

  // 스크롤 시 aside 노출 및 이미지 색상 반전 처리
  window.addEventListener('scroll', () => {
    let programRect = program.getBoundingClientRect();
    let footerRect = footer.getBoundingClientRect();
    let triggerPoint = window.innerHeight * 0.9;

    if (footerRect.top <= window.innerHeight) {
      aside.classList.remove('visible'); 
    } else if (programRect.top <= triggerPoint) {
      aside.classList.add('visible');    
    } else {
      aside.classList.remove('visible');
    }

    // aside 사이드 색상 변경
    let programBottom = programRect.bottom;
    let asideImageTop = asideImage.getBoundingClientRect().top;

    if (asideImageTop > programBottom) {
      asideImage.classList.remove('invert');
    } else {
      asideImage.classList.add('invert');
    }
  });
});

/* resize 대응 */
// 화면 크기 변경 시 네비게이션 상태를 재설정
window.addEventListener('resize', () => {
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
