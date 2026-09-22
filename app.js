import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js';
import { getDatabase, onValue, ref, runTransaction } from 'https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js';
import { firebaseConfig } from './firebase-config.js';

const ROOM_KEY = 'vocab-bright-room-v1';
const LESSONS_KEY = 'vocab-lessons-v1';
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);
const roomRef = ref(database, 'vocab_rooms/room603/state');
const GROUPS = 7;

const defaultLesson = {
  id: 'l2',
  title: '六年級國語 L2',
  words: [
    {char:'裁',terms:[['裁縫','裁剪並縫製衣服，或指從事這種工作的人。'],['裁員','因業務縮減而減少工作人員。'],['裁判','體育比賽中負責評判勝負的司法人員。'],['體裁','詩歌、散文、小說等文章的寫作樣式或結構。'],['獨裁','獨自掌握政治權力，實行專制統治。'],['獨出心裁','比喻構思獨特，與眾不同。']]},
    {char:'茂',terms:[['茂盛','植物生長繁茂。'],['豐茂','形容土地肥沃，草木生長旺盛。'],['根深葉茂','植物根基深、枝葉茂密。'],['聲情並茂','演唱、朗誦或演說時聲音和感情生動感人。'],['圖文並茂','書籍、報告或海報中圖畫與文字都很豐富精采。']]},
    {char:'藤',terms:[['藤蔓','藤本植物攀爬蔓延的細莖。'],['藤椅','用藤條編織成的椅子，通風涼快。'],['紫藤','春季開紫藍色花的蔓生植物。'],['蔓藤','植物細長且攀附他物的莖。'],['順藤摸瓜','比喻沿著線索追根究底，查明事實真相。']]},
    {char:'免',terms:[['避免','防止、設法使不發生。'],['免稅','免除應繳納的稅金。'],['免除','省去、撤除。'],['免費','不收取費用。'],['在所難免','無論如何很難免除、避免。']]}
  ]
};

const lessonL3 = {
  id: 'l3',
  title: '六年級國語 L3',
  words: [
    {char:'舍',terms:[['宿舍','供人員居住的房屋。'],['房舍','房屋。'],['寒舍','對人謙稱自己的家。'],['舍弟','對人謙稱自己的弟弟。'],['舍棄','拋棄、放棄。'],['退避三舍','比喻主動讓步，主動迴避或妥協，避免發生衝突。']]},
    {char:'皆',terms:[['皆可','全部都可以。'],['人皆有之','所有人都有這種特質或情感。'],['眾所皆知','大家都知道。'],['比比皆是','屢屢可見，極多。'],['皆大歡喜','大家都高興滿意。']]},
    {char:'緣',terms:[['緣分','人與人之間建立良好關係的偶然機會或命定聯繫。'],['緣由','原由、原因。'],['無緣','沒有機會或緣分。'],['邊緣','事物最外側的部分，或比喻臨界狀態。'],['機緣','好的機會與緣分。'],['緣木求魚','爬上樹去抓魚。比喻方向或方法不對，不可能達到目的。']]},
    {char:'蓬',terms:[['蓬勃','繁榮、旺盛的樣子，如「蓬勃發展」。'],['蓬鬆','形容頭髮或毛髮鬆散柔軟。'],['蓬門','用柴草做成的門，比喻簡陋的房屋。'],['蓬萊','傳說中的海上仙山。'],['蓬頭','頭髮散亂的樣子。'],['朝氣蓬勃','形容精神振作，充滿生機與活力。']]},
    {char:'飧',terms:[['盤飧','盤中的飯菜食物。'],['飧飯','熟飯菜。'],['夕飧','晚飯。'],['野飧','在郊野享用飯菜。'],['聚飧','聚在一起用餐。'],['饔飧不繼','饔，早餐；飧，晚餐。早餐和晚餐都無法按時接續。形容生活極其貧困，三餐不繼。']]},
    {char:'兼',terms:[['兼任','同時擔任多項職務。'],['兼顧','同時照顧或考慮到多個方面。'],['兼具','同時具備。'],['兼職','正職之外兼任的職務。'],['德才兼備','品德與才幹兩者同時具備。']]},
    {char:'樽',terms:[['樽酒','杯中的酒。'],['酒樽','盛酒的器具。'],['金樽','精美的金質酒杯。'],['舉樽','舉起酒杯。'],['移樽就教','端著酒杯親自前往請教。比喻親自去向他人請教。']]},
    {char:'酒',terms:[['酒席','設酒招待賓客的宴席。'],['酒吧','供人飲酒休閒的場所。'],['酒鬼','沉溺於飲酒的人。'],['酒精','乙醇，常用於消毒或工業用途。'],['葡萄酒','用葡萄發酵釀成的酒。'],['燈紅酒綠','形容繁華熱鬧、奢靡享樂的夜生活場面。']]},
    {char:'舊',terms:[['舊識','過去就認識的朋友。'],['舊友','老朋友。'],['舊地','過去曾經去過的地方。'],['懷舊','懷念過去的人事物或歲月。'],['舊地重遊','重新回到過去曾經遊覽或居住過的地方。']]},
    {char:'醅',terms:[['舊醅','陳年或家常未過濾的酒。'],['濁醅','未過濾的渾濁釀酒。'],['新醅','新釀造、尚未過濾的酒。'],['醅酒','未經濾過的粗酒。'],['釀醅','釀造粗酒。'],['覆醬覆醅','覆，蓋。指著作或手稿被用來蓋醬缸或酒缸，比喻著述毫無價值、不受重視而被廢棄。']]},
    {char:'籬',terms:[['籬笆','用竹子、木條或樹枝編成的圍牆。'],['竹籬','用竹子編成的籬笆。'],['藩籬','籬笆，比喻屏障、限制或界限。'],['圍籬','圍繞在周圍的防護籬笆。'],['寄人籬下','寄居在別人的籬笆下。比喻依附他人生活，不能獨立自主。']]},
    {char:'簡',terms:[['簡陋','房屋或設備簡單粗陋。'],['簡潔','說話或文章簡明乾淨，不拖泥帶水。'],['簡單','結構不複雜、容易明白。'],['竹簡','古代寫字用的竹片。'],['簡短','篇幅或時間短暫。'],['言簡意賅','賅，完備。言語簡練而意思完備。']]},
    {char:'陋',terms:[['簡陋','房屋設備簡單粗陋。'],['僻陋','偏僻而落後的地方。'],['醜陋','外表不美觀，或指心靈骯髒。'],['陋習','不良的習俗或壞習慣。'],['孤陋寡聞','形容學識淺薄，見聞不廣。']]},
    {char:'鎮',terms:[['鎮定','情緒穩定不慌張。'],['鄉鎮','地方行政區劃單位。'],['冰鎮','將食物放進冰櫃降溫以保持涼爽。'],['鎮壓','壓制、強行平息。'],['坐鎮','親自駐守、親自指揮。'],['鎮定自若','在危急或緊張的情況下，態度依然沉著冷靜，完全不慌張。']]},
    {char:'濾',terms:[['過濾','使液體或氣體通過濾材以除去雜質。'],['濾紙','用來過濾液體雜質的特殊紙張。'],['濾水器','淨化水質的設備。'],['濾網','攔截雜質的網狀結構。'],['濾過','指通過過濾裝置。']]},
    {char:'潺',terms:[['潺潺','水流的聲響，或形容水流動不息的樣子。'],['潺湲','水流緩慢流動的樣子。'],['潺潺流水','不停流淌的小溪水。']]},
    {char:'笆',terms:[['籬笆','用竹子或柳條編成的圍牆。'],['笆斗','用竹子或柳條編成的盛物器具。'],['圍笆','圍在周圍的防護竹籬。'],['築籬編笆','編織竹籬與防護柵欄。比喻建立防護措施或整理家園。']]},
    {char:'寂',terms:[['寂靜','非常安靜、沒有聲音。'],['寂寞','孤單冷清、沒有依靠的感覺。'],['寂然','安靜無聲的樣子。'],['沉寂','聲音或活動完全平息下來。'],['寂遼','空曠而冷清。'],['萬籟俱寂','萬籟，自然界中的萬物發出的聲音。形容四周環境非常安靜，一點聲音也沒有。']]},
    {char:'陳',terms:[['陳列','擺設、排列出來供人觀看。'],['陳舊','過時、老舊的。'],['陳述','詳細地說明事理或經過。'],['新陳代謝','指生物體內舊物質不斷分解、新物質不斷生成的過程，也比喻事物不斷更新。'],['陳設','房間內擺設的家具與裝飾物。'],['推陳出新','除去舊的，創造出新的。比喻在舊有的基礎上創新、發展。']]}
  ]
};

const defaultLessons = {
  [defaultLesson.id]: defaultLesson,
  [lessonL3.id]: lessonL3
};

function getStoredLessons() {
  const result = { [defaultLesson.id]: defaultLesson, [lessonL3.id]: lessonL3 };
  try {
    const raw = localStorage.getItem(LESSONS_KEY);
    if (raw) {
      const custom = JSON.parse(raw);
      if (custom && typeof custom === 'object') {
        const items = Array.isArray(custom) ? custom : Object.values(custom);
        items.forEach(item => {
          if (item && item.id && item.title && Array.isArray(item.words) && item.words.length > 0) {
            result[item.id] = item;
          }
        });
      }
    }
  } catch (e) {}
  return result;
}

function saveStoredLessons(lessons) {
  try {
    localStorage.setItem(LESSONS_KEY, JSON.stringify(lessons));
  } catch {}
}

function baseState() {
  return {
    command: 'waiting',
    currentLessonId: 'l3',
    wordIndex: 0,
    duration: 60,
    endsAt: null,
    presence: {},
    answers: {},
    lessons: getStoredLessons(),
    updatedAt: Date.now()
  };
}

let roomState = (() => {
  try {
    const local = JSON.parse(localStorage.getItem(ROOM_KEY)) || baseState();
    return { ...baseState(), ...local };
  } catch {
    return baseState();
  }
})();

function read() { return structuredClone(roomState); }

function notify() {
  localStorage.setItem(ROOM_KEY, JSON.stringify(roomState));
  if (channel) channel.postMessage(roomState);
  window.dispatchEvent(new Event('roomchange'));
}

function write(next) {
  next.updatedAt = Date.now();
  roomState = next;
  notify();
  runTransaction(roomRef, current => {
    const prior = current || baseState();
    const shouldClearAnswers = (next.command === 'waiting' || next.command === 'stopped' || (next.command === 'playing' && Object.keys(next.answers || {}).length === 0)) && Object.keys(next.answers || {}).length === 0;
    const mergedLessons = { ...getStoredLessons(), ...(prior.lessons || {}), ...(next.lessons || {}) };
    return {
      ...prior,
      ...next,
      lessons: mergedLessons,
      presence: { ...(prior.presence || {}), ...(next.presence || {}) },
      answers: shouldClearAnswers ? {} : { ...(prior.answers || {}), ...(next.answers || {}) }
    };
  }).catch(() => {
    document.querySelectorAll('.cloud-status').forEach(el => el.textContent = '● Firebase 連線失敗，使用本機暫存');
  });
}

const channel = 'BroadcastChannel' in window ? new BroadcastChannel(ROOM_KEY) : null;
channel?.addEventListener('message', () => window.dispatchEvent(new Event('roomchange')));
window.addEventListener('storage', e => { if (e.key === ROOM_KEY || e.key === LESSONS_KEY) window.dispatchEvent(new Event('roomchange')); });

onValue(roomRef, snapshot => {
  const val = snapshot.val() || {};
  const serverLessons = val.lessons || {};
  const localLessons = getStoredLessons();
  const validServer = {};
  const serverItems = Array.isArray(serverLessons) ? serverLessons : Object.values(serverLessons);
  serverItems.forEach(item => {
    if (item && item.id && item.title && Array.isArray(item.words) && item.words.length > 0) {
      validServer[item.id] = item;
    }
  });
  const allLessons = { ...localLessons, ...validServer };
  saveStoredLessons(allLessons);
  roomState = { ...baseState(), ...val, lessons: allLessons };
  notify();
  document.querySelectorAll('.cloud-status').forEach(el => el.textContent = '● Firebase 即時同步已連線');
}, () => {
  document.querySelectorAll('.cloud-status').forEach(el => el.textContent = '● Firebase 連線失敗，使用本機暫存');
});

function shuffle(a) { return [...a].sort(() => Math.random() - .5); }
function seconds(s) {
  if (!s || s < 0) return '--:--';
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.ceil(s % 60)).padStart(2, '0')}`;
}

function getAllLessons(state) {
  const s = state || read();
  const validMap = getStoredLessons();

  let server = s?.lessons || {};
  if (server) {
    const serverItems = Array.isArray(server) ? server : Object.values(server);
    serverItems.forEach(item => {
      if (item && item.id && item.title && Array.isArray(item.words) && item.words.length > 0) {
        validMap[item.id] = item;
      }
    });
  }

  const list = Object.values(validMap);
  return list.length ? list : [defaultLesson, lessonL3];
}

function getActiveLesson(state) {
  const s = state || read();
  const all = getAllLessons(s);
  const targetId = s?.currentLessonId;
  return all.find(l => l.id === targetId) || all.find(l => l.id === 'l3') || all.find(l => l.id === 'l2') || all[0] || lessonL3;
}

function activeWord(state) {
  const lesson = getActiveLesson(state);
  const words = (lesson && Array.isArray(lesson.words) && lesson.words.length) ? lesson.words : defaultLesson.words;
  const idx = (state && state.wordIndex >= 0 && state.wordIndex < words.length) ? state.wordIndex : 0;
  return words[idx] || words[0];
}



function parseLineForTermMeaning(line) {
  const cleaned = line.replace(/^\s*(?:[0-9]+\.|\([0-9]+\)|[①-⑩]|[\u4e00-\u4e5d]、|[•\-\*])\s*/, '').trim();
  if (!cleaned) return null;

  if (/^(生字|注音|釋義|語詞|成語|造句|名稱|意思|解釋)\s*[：:]?$/.test(cleaned) || /^【.*】$/.test(cleaned)) {
    return null;
  }

  const colonMatch = cleaned.match(/^([^\s：:]+)\s*[：:]\s*(.+)$/);
  if (colonMatch) {
    const rawTerm = colonMatch[1].trim();
    const meaning = colonMatch[2].trim();
    if (!['生字', '注音與釋義', '注音', '釋義', '語詞', '成語', '名稱', '意思', '解釋', '造句'].includes(rawTerm)) {
      const cleanTerm = rawTerm.replace(/[\u3100-\u312f\u02ca\u02c7\u02cb\u02d9]+/g, '').trim();
      if (cleanTerm && meaning) return { term: cleanTerm, meaning };
    }
  }

  const parenMatch = cleaned.match(/^([^\s（(]+)\s*[（(]([^）)]+)[）)]$/);
  if (parenMatch) {
    const rawTerm = parenMatch[1].trim();
    const meaning = parenMatch[2].trim();
    if (!['生字', '注音與釋義', '注音', '釋義', '語詞', '成語', '名稱', '意思', '解釋', '造句'].includes(rawTerm)) {
      const cleanTerm = rawTerm.replace(/[\u3100-\u312f\u02ca\u02c7\u02cb\u02d9]+/g, '').trim();
      if (cleanTerm && meaning) return { term: cleanTerm, meaning };
    }
  }

  const dashMatch = cleaned.match(/^([^\s\-—=]+)\s*[\-—=]\s*(.+)$/);
  if (dashMatch) {
    const rawTerm = dashMatch[1].trim();
    const meaning = dashMatch[2].trim();
    if (!['生字', '注音與釋義', '注音', '釋義', '語詞', '成語', '名稱', '意思', '解釋', '造句'].includes(rawTerm)) {
      const cleanTerm = rawTerm.replace(/[\u3100-\u312f\u02ca\u02c7\u02cb\u02d9]+/g, '').trim();
      if (cleanTerm && meaning) return { term: cleanTerm, meaning };
    }
  }

  const spaceMatch = cleaned.match(/^([\u3400-\u9fff]{2,8})\s{2,}(.+)$/);
  if (spaceMatch) {
    const cleanTerm = spaceMatch[1].trim();
    const meaning = spaceMatch[2].trim();
    if (cleanTerm && meaning) return { term: cleanTerm, meaning };
  }

  return null;
}

function parseTextToLesson(title, text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const wordsMap = new Map();
  let currentChar = null;
  let currentIdiomName = null;

  for (let line of lines) {
    const charMatch = line.match(/^生字\s*[：:\s]\s*([\u3400-\u9fff])/) ||
                      line.match(/^【\s*([\u3400-\u9fff])\s*】/) ||
                      line.match(/^字\s*[：:\s]\s*([\u3400-\u9fff])/);
    if (charMatch) {
      currentChar = charMatch[1];
      if (!wordsMap.has(currentChar)) {
        wordsMap.set(currentChar, { char: currentChar, terms: [] });
      }
      currentIdiomName = null;
      continue;
    }

    if (/^[\u3400-\u9fff]$/.test(line)) {
      currentChar = line;
      if (!wordsMap.has(currentChar)) {
        wordsMap.set(currentChar, { char: currentChar, terms: [] });
      }
      currentIdiomName = null;
      continue;
    }

    const idiomNameMatch = line.match(/^(?:名稱|成語)\s*[：:]\s*(.+)$/);
    if (idiomNameMatch) {
      currentIdiomName = idiomNameMatch[1].trim().replace(/[\u3100-\u312f\u02ca\u02c7\u02cb\u02d9]+/g, '');
      continue;
    }

    const idiomMeanMatch = line.match(/^(?:意思|解釋|釋義)\s*[：:]\s*(.+)$/);
    if (idiomMeanMatch && currentIdiomName && currentChar) {
      const wordObj = wordsMap.get(currentChar);
      if (wordObj) {
        const meaning = idiomMeanMatch[1].trim();
        if (!wordObj.terms.some(t => t[0] === currentIdiomName)) {
          wordObj.terms.push([currentIdiomName, meaning]);
        }
      }
      currentIdiomName = null;
      continue;
    }

    const parsedPair = parseLineForTermMeaning(line);
    if (parsedPair) {
      if (!currentChar && /^[\u3400-\u9fff]/.test(parsedPair.term)) {
        currentChar = parsedPair.term[0];
        if (!wordsMap.has(currentChar)) {
          wordsMap.set(currentChar, { char: currentChar, terms: [] });
        }
      }

      if (currentChar && wordsMap.has(currentChar)) {
        const wordObj = wordsMap.get(currentChar);
        if (!wordObj.terms.some(t => t[0] === parsedPair.term)) {
          wordObj.terms.push([parsedPair.term, parsedPair.meaning]);
        }
      }
    }
  }

  const words = Array.from(wordsMap.values()).map(w => {
    if (!w.terms || w.terms.length === 0) {
      w.terms = [[w.char + '字', '請在校對文字中補充【語詞：詞義解釋】']];
    }
    return w;
  });

  const lessonId = 'lesson_' + Date.now();
  return {
    id: lessonId,
    title: title || '自訂課別',
    words: words.length ? words : [
      { char: '無', terms: [['無內容', '請檢視 PDF 文字並設定語詞與釋義']] }
    ]
  };
}

if (document.body.dataset.page === 'teacher') teacherApp();
else if (document.body.dataset.page === 'student') studentApp();

function teacherApp() {
  const teacherLogin = document.querySelector('#teacherLogin'),
    teacherLoginForm = document.querySelector('#teacherLoginForm'),
    teacherPassword = document.querySelector('#teacherPassword'),
    loginError = document.querySelector('#loginError');

  if (sessionStorage.getItem('vocab-teacher-authorized') !== 'yes') {
    teacherLogin.showModal();
    teacherLoginForm.onsubmit = e => {
      e.preventDefault();
      if (teacherPassword.value === '0603') {
        sessionStorage.setItem('vocab-teacher-authorized', 'yes');
        teacherLogin.close();
      } else {
        loginError.textContent = '密碼不正確，請再試一次。';
        teacherPassword.select();
      }
    };
  }

  const lessonSelect = document.querySelector('#lessonSelect'),
    wordSelect = document.querySelector('#wordSelect'),
    timeSelect = document.querySelector('#timeSelect');

  let lastLessonKey = '';
  let lastWordKey = '';

  function populateLessons() {
    const s = read();
    const lessons = getAllLessons(s);
    if (!lessons.length) return;

    const currentKey = lessons.map(l => `${l.id}:${l.title}`).join('|');
    if (currentKey !== lastLessonKey || lessonSelect.options.length === 0) {
      lastLessonKey = currentKey;
      lessonSelect.innerHTML = lessons.map(l => `<option value="${l.id}">${l.title}</option>`).join('');
    }

    const activeLesson = getActiveLesson(s);
    if (lessonSelect.value !== activeLesson.id && lessons.some(l => l.id === activeLesson.id)) {
      lessonSelect.value = activeLesson.id;
    }
  }

  function populateWords() {
    const s = read();
    const lesson = getActiveLesson(s);
    const words = (lesson && lesson.words && lesson.words.length) ? lesson.words : [];
    if (!words.length) return;

    const currentKey = lesson.id + '::' + words.map(w => w.char).join(',');
    if (currentKey !== lastWordKey || wordSelect.options.length === 0) {
      lastWordKey = currentKey;
      wordSelect.innerHTML = words.map((w, i) => `<option value="${i}">【${w.char}】字生字配對 (${(w.terms || []).length}詞)</option>`).join('');
    }

    const targetIndex = (s.wordIndex >= 0 && s.wordIndex < words.length) ? s.wordIndex : 0;
    if (wordSelect.value != targetIndex) {
      wordSelect.value = targetIndex;
    }
    timeSelect.value = s.duration || 60;
  }


  populateLessons();
  populateWords();

  lessonSelect.onchange = () => {
    const s = read();
    s.currentLessonId = lessonSelect.value;
    s.wordIndex = 0;
    s.answers = {};
    write(s);
    populateWords();
  };

  wordSelect.onchange = () => {
    const s = read();
    s.wordIndex = +wordSelect.value;
    write(s);
  };

  const importDialog = document.querySelector('#importDialog'),
    pdfInput = document.querySelector('#pdfInput'),
    pdfName = document.querySelector('#pdfName'),
    importName = document.querySelector('#importLessonName'),
    createImport = document.querySelector('#createImportBtn'),
    importReview = document.querySelector('#importReview'),
    importReviewTitle = document.querySelector('#importReviewTitle'),
    importReviewStatus = document.querySelector('#importReviewStatus'),
    extractedWords = document.querySelector('#extractedWords'),
    extractedText = document.querySelector('#extractedText');

  function updateReviewCards() {
    const name = importReviewTitle.textContent || '待校對課別';
    const text = extractedText.value;
    if (!text.trim()) {
      extractedWords.innerHTML = '<p class="muted">尚未貼上或校對文字。</p>';
      return;
    }
    const parsed = parseTextToLesson(name, text);
    if (parsed.words.length) {
      extractedWords.innerHTML = parsed.words.map(w =>
        `<article class="extracted-word">
          <strong>${w.char}</strong>
          <p>已解析 <strong>${w.terms.length}</strong> 個語詞<br>
          <small>${w.terms.map(t => `<span class="term-tag">${t[0]}</span>`).join(' ')}</small>
          </p>
        </article>`
      ).join('');
      const totalTerms = parsed.words.reduce((acc, w) => acc + w.terms.length, 0);
      importReviewStatus.textContent = `即時校對：已解析 ${parsed.words.length} 個生字與 ${totalTerms} 個語詞！確認無誤後請點擊「儲存為課別題庫」。`;
    } else {
      extractedWords.innerHTML = '<p class="muted">未能辨識生字格式。請確保文字包含「生字：字」或「語詞：解釋」。</p>';
      importReviewStatus.textContent = '未能辨識生字格式，請在下方文字區輸入如「生字：皆」或「皆大歡喜：大家都很滿意」。';
    }
  }

  extractedText.oninput = updateReviewCards;
  extractedText.onchange = updateReviewCards;

  document.querySelector('#importBtn').onclick = () => importDialog.showModal();

  pdfInput.onchange = () => {
    const file = pdfInput.files?.[0];
    pdfName.textContent = file ? `已選擇：${file.name}` : '尚未選擇檔案';
    createImport.disabled = !file;
    if (file && !importName.value) importName.value = file.name.replace(/\.pdf$/i, '');
  };

  createImport.onclick = async () => {
    const file = pdfInput.files?.[0];
    if (!file) return;
    const name = importName.value || file.name.replace(/\.pdf$/i, '');
    localStorage.setItem('vocab-pending-pdf-import', JSON.stringify({ fileName: file.name, lessonName: name, createdAt: Date.now() }));
    importDialog.close();
    importReview.hidden = false;
    importReviewTitle.textContent = name;
    importReviewStatus.textContent = '正在從 PDF 擷取文字…';
    extractedWords.innerHTML = '';
    extractedText.value = '';

    try {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        const pdf = await window.pdfjsLib.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
        let text = '';
        for (let pageNo = 1; pageNo <= pdf.numPages; pageNo++) {
          const page = await pdf.getPage(pageNo), content = await page.getTextContent();
          text += content.items.map(item => item.str).join(' ') + '\n';
        }
        extractedText.value = text;
        updateReviewCards();
      } else {
        const pdfjs = await import('https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.min.mjs');
        pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.10.38/pdf.worker.min.mjs';
        const pdf = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
        let text = '';
        for (let pageNo = 1; pageNo <= pdf.numPages; pageNo++) {
          const page = await pdf.getPage(pageNo), content = await page.getTextContent();
          text += content.items.map(item => item.str).join(' ') + '\n';
        }
        extractedText.value = text;
        updateReviewCards();
      }
    } catch (error) {
      console.error(error);
      importReviewStatus.textContent = '此 PDF 無法自動擷取文字（可能為掃描檔或瀏覽器安全性限制）。請在下方貼上文字後校對。';
    }
    importReview.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  document.querySelector('#saveImportBtn').onclick = () => {
    const title = importReviewTitle.textContent || '新課別';
    const text = extractedText.value;
    if (!text.trim()) {
      alert('請先擷取或貼上 PDF 文字');
      return;
    }
    const newLesson = parseTextToLesson(title, text);
    const totalTerms = newLesson.words.reduce((acc, w) => acc + w.terms.length, 0);

    const currentLessons = getStoredLessons();
    currentLessons[newLesson.id] = newLesson;
    saveStoredLessons(currentLessons);

    const s = read();
    s.lessons = s.lessons || {};
    s.lessons[newLesson.id] = newLesson;
    s.currentLessonId = newLesson.id;
    s.wordIndex = 0;
    s.answers = {};
    write(s);

    populateLessons();
    populateWords();

    alert(`🎉 已成功將校對資料轉為課別【${newLesson.title}】！\n共包含 ${newLesson.words.length} 個生字與 ${totalTerms} 個語詞配對，已自動切換為當前派送課別。`);
    importReviewStatus.textContent = `✅ 已將校對資料轉為可派送課別【${newLesson.title}】（${newLesson.words.length}個生字、${totalTerms}個語詞），已切換至主控台！`;
    
    document.querySelector('.control-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };


  document.querySelector('#startBtn').onclick = () => {
    const s = read();
    s.currentLessonId = lessonSelect.value;
    s.wordIndex = +wordSelect.value;
    s.duration = +timeSelect.value;
    s.command = 'playing';
    s.endsAt = Date.now() + s.duration * 1000;
    s.answers = {};
    write(s);
  };

  document.querySelector('#stopBtn').onclick = () => {
    const s = read();
    s.command = 'stopped';
    s.endsAt = null;
    write(s);
  };

  document.querySelector('#resetBtn').onclick = () => {
    const s = read();
    s.command = 'waiting';
    s.endsAt = null;
    s.answers = {};
    write(s);
  };

  function render() {
    const s = read(), w = activeWord(s), left = Math.max(0, ((s.endsAt || 0) - Date.now()) / 1000);
    document.querySelector('#countdown').textContent = seconds(s.command === 'playing' ? left : null);
    document.querySelector('#reviewTitle').textContent = s.command === 'waiting' ? '等待派送任務' : `【${w ? w.char : '?'}】字全班作答結果與檢討`;
    document.querySelector('#reviewSub').textContent = s.command === 'playing' ? '學生正在作答，結果會即時更新。' : s.command === 'stopped' ? '本輪已結束，可檢視各組作答。' : '先選擇生字與時間，再發布任務。';

    document.querySelector('#presence').innerHTML = Array.from({ length: GROUPS }, (_, i) => {
      const id = i + 1, on = s.presence[id] && Date.now() - s.presence[id] < 16000;
      return `<span class="presence-chip ${on ? 'online' : ''}">第 ${id} 組 ${on ? '● 已連線' : '○ 未連線'}</span>`;
    }).join('');

    const results = Object.values(s.answers || {});
    const errors = {};
    results.forEach(a => a.wrong?.forEach(x => errors[x] = (errors[x] || 0) + 1));
    const top = Object.entries(errors).sort((a, b) => b[1] - a[1])[0];
    document.querySelector('#insight').innerHTML = top ? `<span>🔥</span><div><strong>課堂核心檢討標的：【${top[0]}】</strong><p>已有 ${top[1]} 組在此詞語配對發生迷思，可立即帶全班辨析。</p></div>` : `<span>🔎</span><div><strong>課堂檢討提示</strong><p>開始後，系統會自動整理最常被混淆的語詞。</p></div>`;

    document.querySelector('#groupGrid').innerHTML = Array.from({ length: GROUPS }, (_, i) => {
      const id = i + 1, a = s.answers ? s.answers[id] : null, on = s.presence[id] && Date.now() - s.presence[id] < 16000;
      return `<article class="group-card ${on ? 'online' : ''}"><h3>第 ${id} 組</h3>${a ? `<p class="group-state">${a.complete ? '✅ 已完成' : '✏️ 作答中'} · 正確 ${a.correct}/${w ? (w.terms || []).length : 0}</p><ul class="answer-list">${a.wrong?.length ? a.wrong.map(x => `<li class="wrong">✕ ${x}</li>`).join('') : '<li>目前沒有錯誤配對</li>'}</ul>` : `<p class="group-state">${on ? '已加入房間，等待作答。' : '尚未連線'}</p>`}</article>`;
    }).join('');
  }

  window.addEventListener('roomchange', () => {
    populateLessons();
    populateWords();
    render();
  });
  setInterval(render, 500);
  render();

}

function studentApp() {
  let group = +localStorage.getItem('vocab-group') || 0, selected = null, termOrder = [];
  const dialog = document.querySelector('#groupDialog');
  document.querySelector('#groupChoices').innerHTML = Array.from({ length: GROUPS }, (_, i) => `<button class="group-choice" value="${i + 1}">第 ${i + 1} 組</button>`).join('');
  document.querySelectorAll('.group-choice').forEach(b => b.onclick = () => {
    group = +b.value;
    localStorage.setItem('vocab-group', group);
    dialog.close();
    presence();
    render();
  });
  if (!group) dialog.showModal();

  function presence() {
    if (!group) return;
    const s = read();
    s.presence = s.presence || {};
    s.presence[group] = Date.now();
    write(s);
  }
  setInterval(presence, 5000);
  presence();

  function render() {
    const s = read(), w = activeWord(s), playing = s.command === 'playing' && Date.now() < (s.endsAt || 0);
    const activeLesson = getActiveLesson(s);
    const words = activeLesson.words || [];

    document.querySelector('#studentStatus').textContent = group ? `● 第 ${group} 組已連線` : '● 等待加入小組';
    document.querySelector('#wordChips').innerHTML = words.map((x, i) => `<span class="word-chip ${i === s.wordIndex ? 'active' : ''}">${x.char}</span>`).join('');
    document.querySelector('#charBadge').textContent = w ? w.char : '?';
    document.querySelector('#studentTimer').textContent = seconds(playing ? (s.endsAt - Date.now()) / 1000 : null);
    document.querySelector('#taskPanel').classList.toggle('locked', !playing);
    document.querySelector('#taskTitle').textContent = playing ? `【第 ${group} 組】生字【${w ? w.char : '?'}】配對任務` : (s.command === 'stopped' ? '本輪作答已結束' : '已進入房間，等待老師開始');
    document.querySelector('#taskHint').textContent = playing ? '請將左側語詞與右側詞義配對。' : '請留意教師大螢幕，老師發布後會自動開始。';

    if (w && (!termOrder.length || termOrder[0]?.word !== w.char)) {
      termOrder = shuffle((w.terms || []).map(([term, meaning]) => ({ word: w.char, term, meaning })));
      selected = null;
    }
    drawCards(s, w, playing);
  }

  function drawCards(s, w, playing) {
    if (!w || !w.terms) return;
    const prior = (s.answers && s.answers[group]) || { matches: {}, wrong: [] };
    const left = w.terms.map(([term, meaning]) => ({ term, meaning })), right = termOrder;
    document.querySelector('#matchingGrid').innerHTML = `<div>${left.map(x => card(x.term, 'term', prior.matches ? prior.matches[x.term] : null)).join('')}</div><div>${right.map(x => card(x.meaning, 'meaning', null)).join('')}</div>`;
    document.querySelectorAll('.match-card').forEach(b => b.onclick = () => choose(b.dataset.value, b.dataset.type));

    function card(value, type, matched) {
      const isMatched = matched === 'ok';
      return `<button class="match-card ${selected?.type === type && selected.value === value ? 'selected' : ''} ${isMatched ? 'matched' : ''}" data-type="${type}" data-value="${value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')}">${value}${isMatched ? '　✓' : ''}</button>`;
    }
  }

  function choose(value, type) {
    const s = read(), w = activeWord(s);
    if (!w || s.command !== 'playing') return;
    if (!selected) {
      selected = { value, type };
      render();
      return;
    }
    if (selected.type === type) {
      selected = { value, type };
      render();
      return;
    }
    const term = selected.type === 'term' ? selected.value : value, meaning = selected.type === 'meaning' ? selected.value : value;
    const correct = w.terms.find(x => x[0] === term)?.[1] === meaning;
    const a = (s.answers && s.answers[group]) || { matches: {}, wrong: [], complete: false, correct: 0 };
    a.matches = a.matches || {};
    a.wrong = a.wrong || [];

    if (correct) {
      a.matches[term] = 'ok';
      a.correct = Object.keys(a.matches).length;
      document.querySelector('#feedback').textContent = '配對正確！';
    } else {
      if (!a.wrong.includes(term)) a.wrong.push(term);
      document.querySelector('#feedback').textContent = '再想一想，試著選另一張詞義卡。';
    }
    a.complete = a.correct === w.terms.length;
    s.answers = s.answers || {};
    s.answers[group] = a;
    write(s);
    selected = null;
    render();
  }

  window.addEventListener('roomchange', render);
  setInterval(render, 500);
  render();
}
s[group]||{matches:{},wrong:[]};const left=w.terms.map(([term,meaning])=>({term,meaning})),right=termOrder;document.querySelector('#matchingGrid').innerHTML=`<div>${left.map(x=>card(x.term,'term',prior.matches[x.term])).join('')}</div><div>${right.map(x=>card(x.meaning,'meaning',null)).join('')}</div>`;document.querySelectorAll('.match-card').forEach(b=>b.onclick=()=>choose(b.dataset.value,b.dataset.type));function card(value,type,matched){const isMatched=matched==='ok';return `<button class="match-card ${selected?.type===type&&selected.value===value?'selected':''} ${isMatched?'matched':''}" data-type="${type}" data-value="${value.replaceAll('&','&amp;').replaceAll('"','&quot;')}">${value}${isMatched?'　✓':''}</button>`}}
 function choose(value,type){const s=read(),w=activeWord(s);if(s.command!=='playing')return;if(!selected){selected={value,type};render();return}if(selected.type===type){selected={value,type};render();return}const term=selected.type==='term'?selected.value:value,meaning=selected.type==='meaning'?selected.value:value;const correct=w.terms.find(x=>x[0]===term)?.[1]===meaning;const a=s.answers[group]||{matches:{},wrong:[],complete:false,correct:0};if(correct){a.matches[term]='ok';a.correct=Object.keys(a.matches).length;document.querySelector('#feedback').textContent='配對正確！';}else{if(!a.wrong.includes(term))a.wrong.push(term);document.querySelector('#feedback').textContent='再想一想，試著選另一張詞義卡。'}a.complete=a.correct===w.terms.length;s.answers[group]=a;write(s);selected=null;render()}
 window.addEventListener('roomchange',render);setInterval(render,500);render()}
