const yearEl = document.getElementById('year');
const templateEl = document.getElementById('entry-template');
const copyTemplateBtn = document.getElementById('copy-template');
const copyStateEl = document.getElementById('copy-state');
const openBuilderBtn = document.getElementById('open-builder');
const cancelBuilderBtn = document.getElementById('cancel-builder');
const builderDialog = document.getElementById('entry-builder');
const entryForm = document.getElementById('entry-form');
const entryList = document.getElementById('entry-list');

const STORAGE_KEY = 'portfolio-research-entries';

const MARKDOWN_TEMPLATE = `# [研究 / 架構標題]\n\n- 類型：研究 / 架構 / 實驗\n- 日期：YYYY-MM-DD\n- 標籤：tag1, tag2, tag3\n\n## 背景 / 問題\n一句話說明你要解決的問題。\n\n## 核心決策\n1. 決策 A：原因\n2. 決策 B：取捨\n\n## 成果與下一步\n- 成果：指標或實作結果\n- 下一步：後續優化方向\n\n## 參考連結\n- https://example.com\n`;

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (templateEl) {
  templateEl.value = MARKDOWN_TEMPLATE;
}

const readEntries = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveEntries = (entries) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
};

const formatDate = () => new Date().toISOString().split('T')[0];

const renderEntries = () => {
  if (!entryList) return;
  const entries = readEntries();

  if (entries.length === 0) {
    entryList.innerHTML = '<p class="hint">目前尚無紀錄，請用模板貼上或按「新增紀錄（半自動）」建立第一篇。</p>';
    return;
  }

  entryList.innerHTML = entries
    .map((entry) => {
      const tags = (entry.tags || []).map((tag) => `<span>${tag}</span>`).join('');
      const link = entry.link ? `<p><a href="${entry.link}" target="_blank" rel="noreferrer">參考連結</a></p>` : '';

      return `
        <article class="entry-card">
          <h4>${entry.title}</h4>
          <p class="entry-meta">${entry.type} · ${entry.date}</p>
          <p><strong>背景：</strong>${entry.problem}</p>
          <p><strong>決策：</strong>${entry.decision}</p>
          ${link}
          <div class="tags">${tags}</div>
        </article>
      `;
    })
    .join('');
};

if (copyTemplateBtn && templateEl) {
  copyTemplateBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(templateEl.value);
      if (copyStateEl) {
        copyStateEl.textContent = '已複製模板';
      }
    } catch {
      if (copyStateEl) {
        copyStateEl.textContent = '複製失敗，請手動複製';
      }
    }
  });
}

if (openBuilderBtn && builderDialog) {
  openBuilderBtn.addEventListener('click', () => {
    builderDialog.showModal();
  });
}

if (cancelBuilderBtn && builderDialog) {
  cancelBuilderBtn.addEventListener('click', () => {
    builderDialog.close();
  });
}

if (entryForm && builderDialog) {
  entryForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(entryForm);
    const newEntry = {
      type: String(formData.get('type') || '研究'),
      title: String(formData.get('title') || '').trim(),
      problem: String(formData.get('problem') || '').trim(),
      decision: String(formData.get('decision') || '').trim(),
      tags: String(formData.get('tags') || '')
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
      link: String(formData.get('link') || '').trim(),
      date: formatDate(),
    };

    if (!newEntry.title || !newEntry.problem || !newEntry.decision) {
      return;
    }

    const entries = readEntries();
    entries.unshift(newEntry);
    saveEntries(entries);

    builderDialog.close();
    entryForm.reset();
    renderEntries();
  });
}

renderEntries();
