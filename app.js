const questions = [
  { axis: '관계의 기준', statement: '팀 규칙 때문에 누군가 크게 불리해진다면, 예외를 둘 수 있어야 한다.', yes: '공감형에 한 표', no: '원칙형에 한 표' },
  { axis: '관계의 기준', statement: '내게 유리한 정보라도 팀의 불안을 줄일 수 있다면 먼저 공유할 수 있다.', yes: '공감형에 한 표', no: '원칙형에 한 표' },
  { axis: '관계의 기준', statement: '갈등이 생기면 누가 맞는지보다 모두가 납득할 결론이 더 중요하다.', yes: '공감형에 한 표', no: '원칙형에 한 표' },
  { axis: '결정의 방식', statement: '마감이 임박했어도 반대하는 한 사람의 이유는 끝까지 들어봐야 한다.', yes: '숙의형에 한 표', no: '결단형에 한 표' },
  { axis: '결정의 방식', statement: '결정 전에는 조용한 사람의 의견도 따로 확인하는 편이다.', yes: '숙의형에 한 표', no: '결단형에 한 표' },
  { axis: '결정의 방식', statement: '초반 속도가 늦어지더라도 역할과 규칙을 먼저 합의하는 편이 낫다.', yes: '숙의형에 한 표', no: '결단형에 한 표' },
  { axis: '자원의 기준', statement: '기여도가 달라도 꼭 필요한 자원은 비슷하게 나눠야 한다.', yes: '공유형에 한 표', no: '기여형에 한 표' },
  { axis: '자원의 기준', statement: '누군가 뒤처진다면 잘하는 사람의 몫을 조금 줄여서라도 메워야 한다.', yes: '공유형에 한 표', no: '기여형에 한 표' },
  { axis: '자원의 기준', statement: '가장 큰 성과보다 아무도 소외되지 않는 결과가 더 성공적이라고 생각한다.', yes: '공유형에 한 표', no: '기여형에 한 표' }
];

const profiles = {
  '공감형|숙의형|공유형': { title: '라운드테이블 지킴이', description: '누구의 목소리도 놓치지 않으며, 함께 오래 갈 수 있는 답을 찾는 사람이에요.', prompt: '성과를 조금 포기하더라도 모두가 납득하는 결론을 택할 수 있을까?' },
  '공감형|숙의형|기여형': { title: '배려하는 설계자', description: '사람의 마음을 챙기면서도, 책임과 기여를 분명히 하는 균형 감각이 있어요.', prompt: '공정한 보상과 따뜻한 분위기 중 무엇을 먼저 설계해야 할까?' },
  '공감형|결단형|공유형': { title: '현장형 조정자', description: '사람을 먼저 보되 망설임은 길지 않아요. 모두를 챙길 방법을 빠르게 실행합니다.', prompt: '팀 전체를 위해 빠르게 결정해야 할 때, 누구의 의견을 먼저 들을까?' },
  '공감형|결단형|기여형': { title: '배려하는 추진가', description: '사람을 살피면서도 목표 앞에서는 한 걸음 먼저 움직이는 타입이에요.', prompt: '팀원이 계속 기여하지 못해도 같은 몫을 나누는 게 공정할까?' },
  '원칙형|숙의형|공유형': { title: '공정한 심판', description: '기준을 세밀하게 검토하며, 누구나 받아들일 수 있는 공정함을 지켜요.', prompt: '같은 기회를 주는 것과 같은 결과를 주는 것 중 무엇이 더 공정할까?' },
  '원칙형|숙의형|기여형': { title: '규칙의 전략가', description: '충분히 따져 본 뒤, 약속한 기준에 따라 흔들림 없이 판단하는 사람이에요.', prompt: '팀의 약속은 상황이 바뀌어도 끝까지 지켜야 할까?' },
  '원칙형|결단형|공유형': { title: '냉정한 분배가', description: '명확한 기준과 빠른 판단으로, 팀 전체의 안전망을 지키려는 타입이에요.', prompt: '모두를 보호하기 위한 엄격한 규칙은 어디까지 허용될까?' },
  '원칙형|결단형|기여형': { title: '결단형 승부사', description: '목표와 책임을 선명하게 보고, 필요한 순간에는 단호하게 방향을 정합니다.', prompt: '팀 성과를 위해 일부의 불만은 감수할 수 있을까?' }
};

const keywordDescriptions = {
  '공감형': '사람의 사정과 관계의 균형을 먼저 살펴요.',
  '원칙형': '모두에게 적용할 수 있는 기준과 약속을 중요하게 생각해요.',
  '숙의형': '다양한 의견을 충분히 듣고 함께 답을 찾으려 해요.',
  '결단형': '필요한 순간 빠르게 방향을 정하고 움직여요.',
  '공유형': '누구도 소외되지 않도록 기회와 자원을 넓게 나눠요.',
  '기여형': '책임과 기여에 맞는 공정한 분배를 중요하게 생각해요.'
};

const $ = (selector) => document.querySelector(selector);
const screens = { intro: $('#introScreen'), test: $('#testScreen'), result: $('#resultScreen') };
const nicknameForm = $('#nicknameForm');
const nicknameInput = $('#nickname');
const questionCard = $('#questionCard');
const choiceReveal = $('#choiceReveal');
const choiceRevealText = $('#choiceRevealText');
const state = { nickname: '', index: 0, answers: [], dragStartX: 0, dragging: false };
let toastTimer;

function showScreen(name) {
  Object.entries(screens).forEach(([key, screen]) => {
    const active = key === name;
    screen.hidden = !active;
    screen.classList.toggle('is-active', active);
  });
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function renderQuestion({ animate = false } = {}) {
  const question = questions[state.index];
  $('#progressLabel').textContent = `${state.index + 1} / ${questions.length}`;
  $('#progressValue').style.width = `${((state.index + 1) / questions.length) * 100}%`;
  $('#axisLabel').textContent = question.axis;
  $('#questionNumber').textContent = `QUESTION ${String(state.index + 1).padStart(2, '0')}`;
  $('#questionAxis').textContent = question.axis;
  $('#questionTitle').textContent = question.statement;
  $('#undoButton').disabled = state.index === 0;
  questionCard.className = `question-card${animate ? ' is-entering' : ''}`;
  questionCard.style.transform = '';
  questionCard.style.removeProperty('--swipe-x');
  questionCard.style.removeProperty('--swipe-rotate');
  clearChoiceReveal();
}

function showChoiceReveal(answer, strength) {
  const clampedStrength = Math.max(0, Math.min(1, strength));
  choiceReveal.dataset.choice = answer;
  choiceRevealText.textContent = answer === 'yes' ? '예' : '아니오';
  choiceReveal.style.setProperty('--choice-strength', clampedStrength.toFixed(2));
  choiceReveal.style.setProperty('--choice-blur', `${(clampedStrength * 11).toFixed(1)}px`);
}

function clearChoiceReveal() {
  choiceReveal.style.setProperty('--choice-strength', '0');
  choiceReveal.style.setProperty('--choice-blur', '0px');
}

function choose(answer) {
  if (state.dragging || questionCard.classList.contains('is-leaving-left') || questionCard.classList.contains('is-leaving-right')) return;
  state.answers[state.index] = answer;
  showChoiceReveal(answer, 1);
  const leavingClass = answer === 'yes' ? 'is-leaving-right' : 'is-leaving-left';
  questionCard.classList.add(leavingClass);
  navigator.vibrate?.(12);
  window.setTimeout(() => {
    state.index += 1;
    if (state.index >= questions.length) renderResult();
    else renderQuestion({ animate: true });
  }, 380);
}

function deriveKeywords() {
  const groups = [
    { yes: '공감형', no: '원칙형' },
    { yes: '숙의형', no: '결단형' },
    { yes: '공유형', no: '기여형' }
  ];
  return groups.map((group, index) => {
    const slice = state.answers.slice(index * 3, index * 3 + 3);
    const yesCount = slice.filter((answer) => answer === 'yes').length;
    return yesCount >= 2 ? group.yes : group.no;
  });
}

function renderResult() {
  const keywords = deriveKeywords();
  const profile = profiles[keywords.join('|')];
  $('#resultNickname').textContent = state.nickname;
  $('#resultTitle').textContent = profile.title;
  $('#resultDescription').textContent = profile.description;
  $('#talkPrompt').textContent = profile.prompt;
  const keywordList = $('#keywordList');
  keywordList.replaceChildren(...keywords.map((keyword) => {
    const item = document.createElement('span');
    item.className = 'keyword';
    item.textContent = keyword;
    return item;
  }));
  const keywordExplanations = $('#keywordExplanations');
  keywordExplanations.replaceChildren(...keywords.map((keyword) => {
    const item = document.createElement('div');
    item.className = 'keyword-explanation';
    const name = document.createElement('strong');
    name.textContent = keyword;
    const description = document.createElement('p');
    description.textContent = keywordDescriptions[keyword];
    item.append(name, description);
    return item;
  }));
  localStorage.setItem('communityCompassResult', JSON.stringify({ nickname: state.nickname, answers: state.answers, savedAt: Date.now() }));
  showScreen('result');
}

function renderReview() {
  const reviewList = $('#reviewList');
  reviewList.replaceChildren(...questions.map((question, index) => {
    const answer = state.answers[index];
    const item = document.createElement('article');
    item.className = 'review-item';
    item.innerHTML = `
      <div class="review-item-top"><span>QUESTION ${String(index + 1).padStart(2, '0')}</span><span class="review-axis">${question.axis}</span></div>
      <p class="review-question"></p>
      <span class="review-choice review-choice--${answer}">${answer === 'yes' ? '✦ 예' : '× 아니오'}</span>
      <p class="review-meaning">${answer === 'yes' ? question.yes : question.no}</p>`;
    item.querySelector('.review-question').textContent = question.statement;
    return item;
  }));
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 2200);
}

function resetTest({ keepNickname = false } = {}) {
  state.index = 0;
  state.answers = [];
  if (!keepNickname) { state.nickname = ''; nicknameInput.value = ''; }
  showScreen('intro');
  window.setTimeout(() => nicknameInput.focus(), 180);
}

nicknameForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const nickname = nicknameInput.value.trim();
  if (!nickname) { nicknameInput.focus(); return; }
  state.nickname = nickname;
  state.index = 0;
  state.answers = [];
  showScreen('test');
  renderQuestion({ animate: true });
});

$('#yesButton').addEventListener('click', () => choose('yes'));
$('#noButton').addEventListener('click', () => choose('no'));
$('#undoButton').addEventListener('click', () => {
  if (state.index === 0) return;
  state.index -= 1;
  state.answers = state.answers.slice(0, state.index);
  renderQuestion({ animate: true });
});
$('#restartButton').addEventListener('click', () => resetTest({ keepNickname: true }));
$('#newTestButton').addEventListener('click', () => resetTest());

$('#reviewButton').addEventListener('click', () => { renderReview(); $('#reviewModal').hidden = false; $('#closeReviewButton').focus(); });
$('#closeReviewButton').addEventListener('click', () => { $('#reviewModal').hidden = true; $('#reviewButton').focus(); });
$('#reviewModal').addEventListener('click', (event) => { if (event.target === $('#reviewModal')) { $('#reviewModal').hidden = true; } });

$('#shareButton').addEventListener('click', async () => {
  const keywords = deriveKeywords();
  const profile = profiles[keywords.join('|')];
  const text = `${state.nickname}님의 선택 나침반: ${profile.title} (${keywords.join(' · ')})`;
  try {
    if (navigator.share) await navigator.share({ title: '선택 나침반', text });
    else { await navigator.clipboard.writeText(text); showToast('결과가 클립보드에 복사됐어요.'); }
  } catch (error) { if (error.name !== 'AbortError') showToast('공유를 다시 시도해 주세요.'); }
});

questionCard.addEventListener('pointerdown', (event) => {
  if (event.pointerType === 'mouse' && event.button !== 0) return;
  state.dragging = true;
  state.dragStartX = event.clientX;
  questionCard.setPointerCapture?.(event.pointerId);
});
questionCard.addEventListener('pointermove', (event) => {
  if (!state.dragging) return;
  const delta = event.clientX - state.dragStartX;
  const rotate = Math.max(-18, Math.min(18, delta / 8));
  questionCard.style.setProperty('--swipe-x', `${delta}px`);
  questionCard.style.setProperty('--swipe-rotate', `${rotate}deg`);
  questionCard.style.transform = `translateX(${delta}px) rotate(${rotate}deg)`;
  showChoiceReveal(delta >= 0 ? 'yes' : 'no', Math.min(1, Math.abs(delta) / 110));
});
function finishDrag(event) {
  if (!state.dragging) return;
  const delta = event.clientX - state.dragStartX;
  state.dragging = false;
  if (delta > 72) choose('yes');
  else if (delta < -72) choose('no');
  else {
    questionCard.style.transform = '';
    questionCard.style.removeProperty('--swipe-x');
    questionCard.style.removeProperty('--swipe-rotate');
    clearChoiceReveal();
  }
}
questionCard.addEventListener('pointerup', finishDrag);
questionCard.addEventListener('pointercancel', finishDrag);
questionCard.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowRight') { event.preventDefault(); choose('yes'); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); choose('no'); }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !$('#reviewModal').hidden) $('#reviewModal').hidden = true;
});
