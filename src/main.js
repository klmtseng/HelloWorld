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

const DEFAULT_ENTRIES = [
  {
    type: '研究',
    title: '多租戶權限模型比較（RBAC vs ABAC）',
    problem: '需要在產品早期定義可擴展的授權策略，兼顧管理成本與彈性。',
    decision: '短期先用 RBAC 快速落地，中期導入 ABAC 條件判斷做細粒度控管。',
    tags: ['RBAC', 'ABAC', 'AuthZ'],
    link: 'https://example.com/rbac-abac-study',
    date: '2026-02-01',
  },
  {
    type: '架構',
    title: '事件驅動同步流程（Outbox Pattern）',
    problem: '訂單與通知服務耦合過高，失敗重試與一致性難以維護。',
    decision: '改為 Outbox + Message Broker，透過重試與死信隊列提升可靠性。',
    tags: ['Outbox', 'Kafka', 'Reliability'],
    link: 'https://example.com/outbox-architecture',
    date: '2026-02-08',
  },
  {
    type: '實驗',
    title: '前端首屏效能優化實驗',
    problem: '行動網路下首頁首屏時間偏長，影響用戶停留。',
    decision: '採用圖片 lazy-load、CSS critical path 與資源壓縮，觀察 LCP 變化。',
    tags: ['Web Performance', 'LCP', 'Lazy Load'],
    link: 'https://example.com/perf-lcp-lab',
    date: '2026-02-12',
  },
];

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
  const customEntries = readEntries();
  const entries = [...customEntries, ...DEFAULT_ENTRIES];

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
