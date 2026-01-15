const STORAGE_KEY = "memos";

const memoEl = document.getElementById("memo");
const dateEl = document.getElementById("date");
const memoListEl = document.getElementById("memoList");
const newMemoBtn = document.getElementById("newMemo");

// UUID生成
function generateId() {
  return crypto.randomUUID();
}

// 日時フォーマット
function formatDate(timestamp) {
  const d = new Date(timestamp);
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const h = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${day} ${h}:${min}`;
}

// 読み込み
function loadMemos() {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  return JSON.parse(data);
}

// 保存
function saveMemos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
}

// メモ生成
function createMemo() {
  return {
    id: generateId(),
    content: "",
    createdAt: Date.now()
  };
}

// 一覧描画
function renderList() {
  memoListEl.innerHTML = "";
  memos.forEach(memo => {
    const li = document.createElement("li");
    li.textContent = formatDate(memo.createdAt);
    li.style.cursor = "pointer";

    if (memo.id === currentMemo.id) {
      li.style.fontWeight = "bold";
    }

    li.addEventListener("click", () => {
      selectMemo(memo.id);
    });

    memoListEl.appendChild(li);
  });
}

// メモ選択
function selectMemo(id) {
  currentMemo = memos.find(m => m.id === id);
  memoEl.value = currentMemo.content;
  dateEl.textContent = `作成日時：${formatDate(currentMemo.createdAt)}`;
  renderList();
}

// 初期化
let memos = loadMemos();
if (memos.length === 0) {
  const first = createMemo();
  memos.push(first);
  saveMemos();
}

let currentMemo = memos[0];
selectMemo(currentMemo.id);

// 入力保存
memoEl.addEventListener("input", () => {
  currentMemo.content = memoEl.value;
  saveMemos();
});

// 新規メモ
newMemoBtn.addEventListener("click", () => {
  const memo = createMemo();
  memos.unshift(memo); // 新しいのを上に
  saveMemos();
  selectMemo(memo.id);
});

