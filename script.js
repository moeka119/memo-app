const STORAGE_KEY = "memos";

const listView = document.getElementById("listView");
const editView = document.getElementById("editView");

const memoEl = document.getElementById("memo");
const dateEl = document.getElementById("date");
const memoListEl = document.getElementById("memoList");

const newMemoBtn = document.getElementById("newMemo");
const backBtn = document.getElementById("backToList");

// UUID
function generateId() {
  return crypto.randomUUID();
}

// 日時フォーマット
function formatDate(ts) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}
 ${String(d.getHours()).padStart(2,"0")}:${String(d.getMinutes()).padStart(2,"0")}`;
}

// load / save
function loadMemos() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveMemos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memos));
}

// 作成
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

    li.onclick = () => {
      openMemo(memo.id);
    };

    memoListEl.appendChild(li);
  });
}

// メモを開く
function openMemo(id) {
  currentMemo = memos.find(m => m.id === id);
  memoEl.value = currentMemo.content;
  dateEl.textContent = `作成日時：${formatDate(currentMemo.createdAt)}`;
  showEdit();
}

// 画面切り替え
function showList() {
  renderList();
  listView.style.display = "block";
  editView.style.display = "none";
}

function showEdit() {
  listView.style.display = "none";
  editView.style.display = "block";
}

// 初期化
let memos = loadMemos();
if (memos.length === 0) {
  memos.push(createMemo());
  saveMemos();
}
let currentMemo = memos[0];
showList();

// 入力保存
memoEl.addEventListener("input", () => {
  currentMemo.content = memoEl.value;
  saveMemos();
});

// 新規
newMemoBtn.onclick = () => {
  const memo = createMemo();
  memos.unshift(memo);
  saveMemos();
  openMemo(memo.id);
};

// 戻る
backBtn.onclick = () => {
  showList();
};

 


