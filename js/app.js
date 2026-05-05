/**
 * ============================================================
 *  z/OS COMPETENCY FRAMEWORK — APPLICATION LOGIC
 * ============================================================
 */

'use strict';

// ─── STATE ────────────────────────────────────────────────────────────────────

const state = {
  level: 'all',        // 'all' | '1' | '2'
  view: 'home',        // 'home' | 'topic'
  topicId: null,
  activeTab: 'overview', // 'overview' | 'mcq' | 'practical'
  mcqState: {          // per quiz session
    submitted: false,
    selected: {},      // { questionIndex: choiceIndex }
    score: 0
  }
};

// ─── BOOT ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  bindLevelToggle();
  handleRoute();
  window.addEventListener('hashchange', handleRoute);
});

// ─── ROUTING ──────────────────────────────────────────────────────────────────

function handleRoute() {
  const hash = window.location.hash; // e.g. '' | '#topic/l1-datasets'
  const parts = hash.replace('#', '').split('/');

  if (parts[0] === 'topic' && parts[1]) {
    const topic = topics.find(t => t.id === parts[1]);
    if (topic) {
      state.view = 'topic';
      state.topicId = topic.id;
      state.activeTab = parts[2] || 'overview';
      document.body.classList.add('in-topic');
      renderTopicView(topic);
      return;
    }
  }

  state.view = 'home';
  state.topicId = null;
  document.body.classList.remove('in-topic');
  renderHomeView();
}

// ─── LEVEL TOGGLE ─────────────────────────────────────────────────────────────

function bindLevelToggle() {
  document.querySelectorAll('.level-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.level = btn.dataset.level;
      document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Re-render current view with new filter
      if (state.view === 'home') renderHomeView();
    });
  });
}

// ─── HOME VIEW ────────────────────────────────────────────────────────────────

function renderHomeView() {
  const app = document.getElementById('app');

  // Filter topics by level
  const filtered = topics.filter(t => {
    if (state.level === 'all') return true;
    return String(t.level) === String(state.level);
  });

  // Group by category
  const categories = {};
  filtered.forEach(t => {
    if (!categories[t.category]) categories[t.category] = [];
    categories[t.category].push(t);
  });

  // Empty state
  if (filtered.length === 0) {
    app.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">[ -- ]</div>
        <p>No topics found for the selected level.</p>
      </div>`;
    return;
  }

  let html = `
    <div class="home-hero">
      <h2>Competency Framework</h2>
      <p>Select a topic below to study the material, test your knowledge with MCQ questions, or work through practical exercises.</p>
      <div class="hero-stats">
        <div class="stat">
          <span class="stat-number">${filtered.length}</span>
          <span class="stat-label">Topics</span>
        </div>
        <div class="stat">
          <span class="stat-number">${filtered.reduce((a, t) => a + t.mcq.length, 0)}</span>
          <span class="stat-label">MCQ Questions</span>
        </div>
        <div class="stat">
          <span class="stat-number">${filtered.reduce((a, t) => a + t.practical.length, 0)}</span>
          <span class="stat-label">Practical Tasks</span>
        </div>
      </div>
    </div>
    <div class="home-content">
  `;

  Object.keys(categories).forEach(cat => {
    html += `<div class="category-section">
      <h3 class="category-heading">${cat}</h3>
      <div class="topic-grid">`;

    categories[cat].forEach(topic => {
      html += renderTopicCard(topic);
    });

    html += `</div></div>`;
  });

  html += `</div>`;
  app.innerHTML = html;
}

function renderTopicCard(topic) {
  const levelClass = `level-badge level-${topic.level}`;
  const cardExtra = topic.level === 2 ? ' level-2-card' : '';
  return `
    <a class="topic-card${cardExtra}" href="#topic/${topic.id}">
      <div class="topic-card-header">
        <span class="${levelClass}">Level ${topic.level}</span>
        <span class="topic-mcq-count">${topic.mcq.length} MCQs</span>
      </div>
      <h4 class="topic-card-title">${topic.title}</h4>
      <p class="topic-card-summary">${topic.summary}</p>
      <div class="topic-card-footer">
        <span class="topic-pill">Overview</span>
        <span class="topic-pill">MCQ Quiz</span>
        <span class="topic-pill">${topic.practical.length} Practical Tasks</span>
        <span class="topic-card-arrow">→</span>
      </div>
    </a>
  `;
}

// ─── TOPIC VIEW ───────────────────────────────────────────────────────────────

function renderTopicView(topic) {
  const app = document.getElementById('app');

  // Reset MCQ state when entering a new topic
  state.mcqState = { submitted: false, selected: {}, score: 0 };

  const tabs = [
    { id: 'overview',  label: '[ I ] Overview' },
    { id: 'mcq',       label: '[ ? ] MCQ Quiz' },
    { id: 'practical', label: '[ > ] Practical' }
  ];

  const tabsHtml = tabs.map(tab => `
    <button
      class="tab-btn ${state.activeTab === tab.id ? 'active' : ''}"
      data-tab="${tab.id}"
      onclick="switchTab('${topic.id}', '${tab.id}')"
    >${tab.label}</button>
  `).join('');

  app.innerHTML = `
    <div class="topic-view">
      <div class="breadcrumb">
        <a href="#" class="breadcrumb-home">← All Topics</a>
        <span class="breadcrumb-sep">/</span>
        <span>${topic.title}</span>
      </div>

      <div class="topic-hero${topic.level === 2 ? ' topic-hero-l2' : ''}">
        <div class="topic-hero-left">
          <span class="level-badge level-${topic.level} level-badge-lg">Level ${topic.level}</span>
          <span class="topic-category-label">${topic.category}</span>
        </div>
        <h2 class="topic-hero-title">${topic.title}</h2>
        <p class="topic-hero-summary">${topic.summary}</p>
      </div>

      <div class="tab-bar">${tabsHtml}</div>

      <div class="tab-content" id="tab-content">
        ${renderTabContent(topic, state.activeTab)}
      </div>
    </div>
  `;
}

function switchTab(topicId, tabId) {
  state.activeTab = tabId;
  const topic = topics.find(t => t.id === topicId);
  if (!topic) return;

  // Update tab buttons
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  document.getElementById('tab-content').innerHTML = renderTabContent(topic, tabId);
  document.getElementById('tab-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderTabContent(topic, tab) {
  if (tab === 'overview')  return renderOverview(topic);
  if (tab === 'mcq')       return renderMCQ(topic);
  if (tab === 'practical') return renderPractical(topic);
  return '';
}

// ─── OVERVIEW TAB ─────────────────────────────────────────────────────────────

function renderOverview(topic) {
  return `
    <div class="overview-content prose">
      ${topic.content}
    </div>
    <div class="overview-nav-btns">
      <button class="btn btn-primary" onclick="switchTab('${topic.id}', 'mcq')">
        Go to MCQ Quiz →
      </button>
      <button class="btn btn-secondary" onclick="switchTab('${topic.id}', 'practical')">
        Go to Practical Tasks →
      </button>
    </div>
  `;
}

// ─── MCQ TAB ──────────────────────────────────────────────────────────────────

function renderMCQ(topic) {
  const s = state.mcqState;

  if (topic.mcq.length === 0) {
    return `<div class="empty-state"><p>No MCQ questions added yet for this topic.</p></div>`;
  }

  let html = `<div class="mcq-wrapper">`;

  if (s.submitted) {
    // Score banner
    const pct = Math.round((s.score / topic.mcq.length) * 100);
    const scoreClass = pct >= 80 ? 'score-great' : pct >= 50 ? 'score-ok' : 'score-poor';
    html += `
      <div class="score-banner ${scoreClass}">
        <div class="score-number">${s.score} / ${topic.mcq.length}</div>
        <div class="score-pct">${pct}%</div>
        <div class="score-label">${
          pct >= 80 ? 'Excellent work!' : pct >= 50 ? 'Good effort — review the missed questions.' : 'Keep studying and try again.'
        }</div>
        <button class="btn btn-outline" onclick="retryMCQ('${topic.id}')">Retry Quiz</button>
      </div>
    `;
  }

  topic.mcq.forEach((q, qi) => {
    const userAnswer  = s.selected[qi];
    const isSubmitted = s.submitted;
    const isCorrect   = isSubmitted && userAnswer === q.answer;
    const isWrong     = isSubmitted && userAnswer !== undefined && !isCorrect;

    html += `
      <div class="mcq-card ${isCorrect ? 'mcq-correct' : ''} ${isWrong ? 'mcq-wrong' : ''}">
        <div class="mcq-q-header">
          <span class="mcq-number">Q${qi + 1}</span>
          ${isSubmitted ? `<span class="mcq-result-icon">${isCorrect ? '✓' : (userAnswer !== undefined ? '✗' : '—')}</span>` : ''}
        </div>
        <p class="mcq-question">${q.question}</p>
        <div class="mcq-options">
    `;

    q.options.forEach((opt, oi) => {
      const isSelected = userAnswer === oi;
      const isAnswer   = q.answer === oi;

      html += `
        <label class="mcq-option ${isSubmitted ? 'mcq-disabled' : ''}
                      ${isSubmitted && isAnswer ? 'option-correct' : ''}
                      ${isSubmitted && isSelected && !isAnswer ? 'option-wrong' : ''}
                      ${!isSubmitted && isSelected ? 'option-selected' : ''}">
          <input
            type="radio"
            name="q${qi}"
            value="${oi}"
            ${isSelected ? 'checked' : ''}
            ${isSubmitted ? 'disabled' : ''}
            onchange="selectAnswer(${qi}, ${oi})"
          >
          <span class="option-letter">${['A','B','C','D'][oi]}</span>
          <span class="option-text">${opt}</span>
        </label>
      `;
    });

    html += `</div>`;

    if (isSubmitted) {
      html += `
        <div class="mcq-explanation">
          <strong>${isCorrect ? '✓ Correct.' : (userAnswer !== undefined ? '✗ Incorrect.' : '— Not answered.')}</strong>
          ${q.explanation}
        </div>
      `;
    }

    html += `</div>`;
  });

  if (!s.submitted) {
    const answered = Object.keys(s.selected).length;
    html += `
      <div class="mcq-submit-bar">
        <span class="mcq-progress">${answered} / ${topic.mcq.length} answered</span>
        <button
          class="btn btn-primary"
          onclick="submitMCQ('${topic.id}')"
          ${answered < topic.mcq.length ? '' : ''}
        >Submit Quiz</button>
      </div>
    `;
  } else {
    html += `
      <div class="mcq-submit-bar">
        <button class="btn btn-outline" onclick="retryMCQ('${topic.id}')">🔄 Retry Quiz</button>
      </div>
    `;
  }

  html += `</div>`;
  return html;
}

function selectAnswer(questionIndex, choiceIndex) {
  const wasNew = !(questionIndex in state.mcqState.selected);
  state.mcqState.selected[questionIndex] = choiceIndex;

  // Highlight the selected option and deselect siblings
  document.querySelectorAll(`input[name="q${questionIndex}"]`).forEach(input => {
    const label = input.closest('.mcq-option');
    if (!label) return;
    if (parseInt(input.value) === choiceIndex) {
      label.classList.add('option-selected');
    } else {
      label.classList.remove('option-selected');
    }
  });

  // Update progress counter without full re-render
  if (wasNew) {
    const bar = document.querySelector('.mcq-progress');
    if (bar) {
      const answered = Object.keys(state.mcqState.selected).length;
      const total = topics.find(t => t.id === state.topicId)?.mcq.length ?? 0;
      bar.textContent = `${answered} / ${total} answered`;
    }
  }
}

function submitMCQ(topicId) {
  const topic = topics.find(t => t.id === topicId);
  if (!topic) return;
  const s = state.mcqState;
  s.submitted = true;
  s.score = topic.mcq.reduce((acc, q, i) => acc + (s.selected[i] === q.answer ? 1 : 0), 0);
  document.getElementById('tab-content').innerHTML = renderMCQ(topic);
  document.getElementById('tab-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function retryMCQ(topicId) {
  state.mcqState = { submitted: false, selected: {}, score: 0 };
  const topic = topics.find(t => t.id === topicId);
  if (topic) {
    document.getElementById('tab-content').innerHTML = renderMCQ(topic);
    document.getElementById('tab-content').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// ─── PRACTICAL TAB ────────────────────────────────────────────────────────────

function renderPractical(topic) {
  if (topic.practical.length === 0) {
    return `<div class="empty-state"><p>No practical tasks added yet for this topic.</p></div>`;
  }

  let html = `
  `;

  topic.practical.forEach((task, ti) => {
    html += `
      <div class="practical-card" id="ptask-${ti}">
        <div class="practical-card-header">
          <span class="practical-number">Task ${ti + 1}</span>
          <h4 class="practical-title">${task.title}</h4>
        </div>
        <div class="practical-description">
          <p>${task.description}</p>
        </div>
    `;

    if (task.hints && task.hints.length > 0) {
      html += `
        <div class="practical-section">
          <button class="collapsible-btn" onclick="toggleCollapsible(this)">
            <span>💡 Hints (${task.hints.length})</span><span class="caret">▼</span>
          </button>
          <div class="collapsible-body" style="display:none;">
            <ul class="hints-list">
              ${task.hints.map(h => `<li>${h}</li>`).join('')}
            </ul>
          </div>
        </div>
      `;
    }

    html += `
      <div class="practical-section">
        <button class="collapsible-btn collapsible-solution" onclick="toggleCollapsible(this)">
          <span>🔑 Reveal Solution</span><span class="caret">▼</span>
        </button>
        <div class="collapsible-body" style="display:none;">
          <div class="solution-box">
            <p>${task.solution}</p>
          </div>
        </div>
      </div>
    </div>
    `;
  });

  html += `</div>`;
  return html;
}

function toggleCollapsible(btn) {
  const body = btn.nextElementSibling;
  const caret = btn.querySelector('.caret');
  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';
  caret.textContent = isOpen ? '▼' : '▲';
  btn.classList.toggle('open', !isOpen);
}
