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
  '공감형|숙의형|공유형': { title: '라운드테이블 지킴이', description: '전체적으로 당신은 사람의 목소리와 팀의 지속가능성을 함께 챙기는 사람입니다. 업무할 때는 충분히 듣고 모두가 납득할 수 있는 방향을 만들며, 누군가 소외되지 않도록 실행 방식을 조정하는 경향이 있습니다. 장점은 신뢰를 쌓고 갈등을 오래 남기지 않는다는 점입니다. 다만 모두를 만족시키려다 결정을 늦추거나 자신의 에너지를 과하게 쓰지 않도록 조심해야 합니다.' },
  '공감형|숙의형|기여형': { title: '배려하는 설계자', description: '전체적으로 당신은 사람을 세심하게 살피면서도 책임과 보상의 기준을 설계하는 사람입니다. 업무할 때는 다양한 의견을 충분히 모은 뒤 역할과 기여를 분명히 하는 방식으로 균형을 잡는 경향이 있습니다. 장점은 따뜻한 분위기와 명확한 기준을 함께 만들 수 있다는 점입니다. 다만 논의가 길어질 때에는 무엇을 지금 결정해야 하는지 우선순위를 선명하게 두는 것을 조심해야 합니다.' },
  '공감형|결단형|공유형': { title: '현장형 조정자', description: '전체적으로 당신은 사람을 우선에 두면서도 현장에 필요한 결정을 빠르게 내리는 사람입니다. 업무할 때는 구성원의 어려움을 빠르게 파악하고, 모두가 함께 움직일 수 있는 해결책을 바로 실행하는 경향이 있습니다. 장점은 긴급한 상황에서도 관계를 놓치지 않는 추진력입니다. 다만 좋은 의도로 내린 빠른 결정이 충분한 설명 없이 전달되지 않도록 조심해야 합니다.' },
  '공감형|결단형|기여형': { title: '배려하는 추진가', description: '전체적으로 당신은 사람의 마음을 살피면서도 목표 앞에서는 한 걸음 먼저 움직이는 사람입니다. 업무할 때는 필요한 역할과 책임을 빠르게 정리하고, 실질적인 도움을 줄 수 있는 방식으로 팀을 이끄는 경향이 있습니다. 장점은 배려를 실행력으로 바꾼다는 점입니다. 다만 성과를 서두르다 보면 충분히 설명하고 합의할 시간을 놓치지 않도록 조심해야 합니다.' },
  '원칙형|숙의형|공유형': { title: '공정한 심판', description: '전체적으로 당신은 기준과 공정함을 통해 신뢰를 만드는 사람입니다. 업무할 때는 다양한 의견을 차분히 검토한 뒤, 누구에게나 적용할 수 있는 원칙과 안전망을 마련하는 경향이 있습니다. 장점은 감정에 휩쓸리지 않고 모두가 받아들일 수 있는 결론을 만들 수 있다는 점입니다. 다만 예외가 필요한 사람이나 상황을 기준 밖으로 밀어내지 않도록 조심해야 합니다.' },
  '원칙형|숙의형|기여형': { title: '규칙의 전략가', description: '전체적으로 당신은 약속한 기준을 세밀하게 검토하고 흔들림 없이 실행하는 사람입니다. 업무할 때는 충분한 정보와 의견을 모은 뒤, 책임과 기여에 맞춘 역할 배분으로 팀의 방향을 정하는 경향이 있습니다. 장점은 복잡한 상황에서도 공정한 구조를 만들 수 있다는 점입니다. 다만 분석과 검토에 오래 머물러 실행 시점을 놓치지 않도록 조심해야 합니다.' },
  '원칙형|결단형|공유형': { title: '냉정한 분배가', description: '전체적으로 당신은 명확한 기준과 빠른 판단으로 팀의 안전망을 지키는 사람입니다. 업무할 때는 해야 할 일과 자원을 빠르게 정리하고, 모두가 기본적인 기회를 얻을 수 있도록 현실적인 결정을 내리는 경향이 있습니다. 장점은 혼란스러운 순간에도 방향을 분명히 제시한다는 점입니다. 다만 속도를 중시하다가 현장의 목소리를 충분히 듣지 못하지 않도록 조심해야 합니다.' },
  '원칙형|결단형|기여형': { title: '결단형 승부사', description: '전체적으로 당신은 목표와 책임을 선명하게 보고 필요한 순간에는 단호하게 움직이는 사람입니다. 업무할 때는 성과에 기여하는 방식과 역할을 빠르게 구분하고, 실행에 집중할 수 있는 환경을 만드는 경향이 있습니다. 장점은 어려운 선택 앞에서도 결정을 미루지 않는 추진력입니다. 다만 기준과 성과만 앞세워 관계의 온도나 협업의 여지를 좁히지 않도록 조심해야 합니다.' }
};

const keywordDescriptions = {
  '공감형': [
    ['판단 기준', '결정이 누군가에게 남길 감정과 관계의 변화를 먼저 살핍니다.'],
    ['일하는 방식', '말수가 적은 사람의 입장까지 확인해 서로 이해할 수 있는 언어로 조율합니다.'],
    ['주의할 점', '모든 감정을 혼자 감당하려 하지 말고, 기준을 세워 선을 긋는 연습도 필요합니다.']
  ],
  '원칙형': [
    ['판단 기준', '특정한 상황보다 모두에게 적용할 수 있는 기준과 약속을 우선에 둡니다.'],
    ['일하는 방식', '절차와 책임을 명확히 해 일이 사람에 따라 흔들리지 않도록 만듭니다.'],
    ['주의할 점', '예외가 꼭 필요한 순간에는 원칙이 너무 딱딱해지지 않는지 한 번 더 살펴봐야 합니다.']
  ],
  '숙의형': [
    ['판단 기준', '빠른 답보다 충분히 이해한 뒤 내린 합의가 더 오래 간다고 생각합니다.'],
    ['일하는 방식', '서로 다른 의견의 이유를 듣고, 빠진 관점이 없는지 차분히 확인합니다.'],
    ['주의할 점', '논의가 길어질수록 지금 결정해야 할 기준과 마감 시점을 분명히 잡아야 합니다.']
  ],
  '결단형': [
    ['판단 기준', '완벽한 정보가 오기만을 기다리기보다 필요한 순간에는 방향을 정해야 한다고 봅니다.'],
    ['일하는 방식', '우선순위를 빠르게 가르고 실행 가능한 다음 행동을 만드는 데 집중합니다.'],
    ['주의할 점', '속도가 빠른 만큼 결정의 이유와 영향받는 사람을 충분히 설명하는 것을 놓치지 않아야 합니다.']
  ],
  '공유형': [
    ['판단 기준', '팀의 성과는 누구도 소외되지 않을 때 더 오래 지속된다고 생각합니다.'],
    ['일하는 방식', '정보와 기회를 넓게 나누고 뒤처지는 사람이 없는지 먼저 살핍니다.'],
    ['주의할 점', '모두를 돕는 과정에서도 역할과 자원의 우선순위가 흐려지지 않도록 기준이 필요합니다.']
  ],
  '기여형': [
    ['판단 기준', '책임과 기여가 분명히 인정받을 때 팀의 약속도 오래 지켜진다고 봅니다.'],
    ['일하는 방식', '역할별 기대치와 보상을 명확히 해 각자가 자신의 몫을 이해하도록 만듭니다.'],
    ['주의할 점', '눈에 드러나지 않는 돌봄과 협업의 기여까지 함께 인정하는 시야가 필요합니다.']
  ]
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
  $('#questionNumber').textContent = `QUESTION ${String(state.index + 1).padStart(2, '0')}`;
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
  const keywordList = $('#keywordList');
  keywordList.replaceChildren(...keywords.map((keyword) => {
    const item = document.createElement('span');
    item.className = 'keyword';
    item.textContent = keyword;
    return item;
  }));
  const keywordExplanations = $('#keywordExplanations');
  keywordExplanations.replaceChildren(...keywords.map((keyword) => {
    const item = document.createElement('section');
    item.className = 'keyword-explanation';
    const name = document.createElement('strong');
    name.textContent = keyword;
    const detailList = document.createElement('ul');
    keywordDescriptions[keyword].forEach(([label, description]) => {
      const detail = document.createElement('li');
      const detailLabel = document.createElement('span');
      detailLabel.textContent = label;
      const detailText = document.createElement('p');
      detailText.textContent = description;
      detail.append(detailLabel, detailText);
      detailList.append(detail);
    });
    item.append(name, detailList);
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
      <div class="review-item-top"><span>QUESTION ${String(index + 1).padStart(2, '0')}</span></div>
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
