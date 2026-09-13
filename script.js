const characterData = {
  lucia: {
    name: '루시아 카르테인',
    meta: '4 CIRCLE · MAGIC SWORD',
    desc: '밝고 사교적이며 인기 많지만 {{user}}에게는 노골적으로 차갑다. 고유능력 「마력검」으로 다수의 마력검을 생성하고 독립적으로 운용한다.',
    tags: ['검은 포니테일', '붉은 눈', '마력검', '카르테인 혈통'],
    artClass: 'art-lucia'
  },
  rena: {
    name: '레나 바르칸',
    meta: '4 CIRCLE · EXPLOSION FLAME',
    desc: '직선적이고 호전적이며 강한 상대와 싸우는 것을 즐긴다. 고유능력 「폭염」은 자신의 불꽃을 압축한 뒤 원하는 순간 폭발시키는 전투형 마법이다.',
    tags: ['붉은 단발', '금색 눈', '폭염', '전투광'],
    artClass: 'art-rena'
  },
  ria: {
    name: '리아 에버하트',
    meta: '3 CIRCLE · HOLY LIGHT',
    desc: '겁이 많고 소심하지만 매우 선량하다. 고유능력 「성광」으로 신성한 빛을 다루며 치유·정화·보호 분야에 뛰어난 가능성을 보인다.',
    tags: ['갈색 단발', '연녹색 눈', '초록 베레모', '성광'],
    artClass: 'art-ria'
  },
  ciel: {
    name: '시엘 라베른',
    meta: '5 CIRCLE · MAGIC FIGHT',
    desc: '과묵하고 무표정하며 근접전에 특화된 인물. 마기를 육체에 둘러 타격과 충격파를 만들어내는 「마투」를 사용한다.',
    tags: ['투톤 단발', '오드아이', '마투', '라베른 혈통'],
    artClass: 'art-ciel'
  },
  serena: {
    name: '세레나 아르벨',
    meta: '6 CIRCLE · GARDEN OF BARRIERS',
    desc: '원칙적이고 침착하며 학생 보호를 최우선으로 하는 교수. 「장벽정원」으로 다중 장벽을 배치하고 겹치거나 재배치해 전장을 통제한다.',
    tags: ['연분홍 장발', '녹색 눈', '교수', '장벽정원'],
    artClass: 'art-serena'
  },
  isera: {
    name: '이세라 벤하르트',
    meta: '8 CIRCLE · CLOCK DOMAIN',
    desc: '평소엔 나른하지만 전투에서는 즉시 냉정해지는 학장. 「시계영역」은 공간 좌표와 국소적인 시간 흐름을 함께 다루는 고난도 영역 마법이다.',
    tags: ['푸른 단발', '붉은 눈', '학장', '시계영역'],
    artClass: 'art-isera'
  }
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

const whisper = document.getElementById('whisper');
window.setTimeout(() => whisper?.classList.add('show'), 1500);

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
navToggle?.addEventListener('click', () => {
  const open = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
siteNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  siteNav.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
}));

const sections = [...document.querySelectorAll('main > section[id]')];
const navLinks = [...document.querySelectorAll('.site-nav a')];
const navObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;
  navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
}, { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.2, 0.5] });
sections.forEach((section) => navObserver.observe(section));

const modal = document.getElementById('characterModal');
const modalArt = document.getElementById('modalArt');
const modalMeta = document.getElementById('modalMeta');
const modalName = document.getElementById('modalName');
const modalDesc = document.getElementById('modalDesc');
const modalTags = document.getElementById('modalTags');

document.querySelectorAll('.character-card').forEach((card) => {
  card.addEventListener('click', () => {
    const key = card.dataset.character;
    const data = characterData[key];
    if (!data || !modal) return;
    modalMeta.textContent = data.meta;
    modalName.textContent = data.name;
    modalDesc.textContent = data.desc;
    modalTags.innerHTML = data.tags.map((tag) => `<span>${tag}</span>`).join('');
    modalArt.className = `modal-art ${data.artClass}`;
    modal.showModal();
  });
});

document.querySelector('.modal-close')?.addEventListener('click', () => modal?.close());
modal?.addEventListener('click', (event) => {
  const box = modal.getBoundingClientRect();
  const outside = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
  if (outside) modal.close();
});

const portrait = document.getElementById('abaddonPortrait');
const formButtons = [...document.querySelectorAll('.form-btn')];
let abaddonForm = 'dragon';

function setAbaddonForm(form) {
  abaddonForm = form;
  portrait.classList.toggle('form-dragon', form === 'dragon');
  portrait.classList.toggle('form-polymorph', form === 'polymorph');
  formButtons.forEach((button) => button.classList.toggle('active', button.dataset.form === form));
}
formButtons.forEach((button) => button.addEventListener('click', () => setAbaddonForm(button.dataset.form)));
portrait?.addEventListener('click', () => setAbaddonForm(abaddonForm === 'dragon' ? 'polymorph' : 'dragon'));

let selectedTime = 60;
let timerHandle = null;
const TIMER_SPEED = 6;
const timerDisplay = document.getElementById('contractTimer');
const contractStart = document.getElementById('contractStart');
const contractConsole = document.querySelector('.contract-console');

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

document.querySelectorAll('.time-options button').forEach((button) => {
  button.addEventListener('click', () => {
    if (timerHandle) return;
    selectedTime = Number(button.dataset.time);
    timerDisplay.textContent = formatTime(selectedTime);
    document.querySelectorAll('.time-options button').forEach((b) => b.classList.toggle('active', b === button));
  });
});

contractStart?.addEventListener('click', () => {
  if (timerHandle) return;
  let remaining = selectedTime;
  contractConsole.classList.add('contract-running');
  contractStart.textContent = '계약 진행 중';
  contractStart.setAttribute('disabled', '');
  timerDisplay.textContent = formatTime(remaining);

  timerHandle = window.setInterval(() => {
    remaining -= 1;
    timerDisplay.textContent = formatTime(Math.max(remaining, 0));
    if (remaining <= 0) {
      window.clearInterval(timerHandle);
      timerHandle = null;
      contractConsole.classList.remove('contract-running');
      contractStart.textContent = '계약 데모 실행';
      contractStart.removeAttribute('disabled');
      timerDisplay.textContent = formatTime(selectedTime);
    }
  }, 1000 / TIMER_SPEED);
});

const CRACK_STORY_URL = '';
const crackLink = document.getElementById('crackLink');
if (CRACK_STORY_URL) {
  crackLink.href = CRACK_STORY_URL;
  crackLink.target = '_blank';
  crackLink.rel = 'noopener noreferrer';
} else {
  crackLink?.addEventListener('click', (event) => event.preventDefault());
}
