<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Louis Armstrong — Semantics</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Mono:wght@300;400;500&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --gold: #ffb400; --orange: #ff6b00; --dark: #0a0a0a;
    --cream: #f0e6d0; --muted: #5a4e38; --border: rgba(255,180,0,0.12);
  }
  body { background: var(--dark); color: var(--cream); font-family: 'DM Sans', sans-serif; min-height: 100vh; }

  /* NAV */
  nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 500;
    padding: 20px 48px; display: flex; align-items: center; justify-content: space-between;
    background: rgba(10,10,10,0.92); border-bottom: 1px solid var(--border);
    backdrop-filter: blur(12px);
  }
  .nav-logo { font-family: 'Playfair Display', serif; font-style: italic; font-size: 1.5rem;
    background: linear-gradient(135deg, var(--gold), var(--orange));
    -webkit-background-clip: text; -webkit-text-fill-color: transparent; text-decoration: none; }
  .nav-back { font-family: 'DM Mono', monospace; font-size: 0.72rem; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--muted); text-decoration: none; transition: color 0.2s; }
  .nav-back:hover { color: var(--cream); }

  /* HERO */
  .artist-hero {
    padding: 120px 48px 60px;
    display: grid; grid-template-columns: 280px 1fr; gap: 60px; align-items: end;
    border-bottom: 1px solid var(--border);
    background: linear-gradient(180deg, rgba(255,140,0,0.05) 0%, transparent 100%);
    position: relative; overflow: hidden;
  }
  .artist-hero::before {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background: radial-gradient(ellipse 50% 80% at 15% 50%, rgba(255,140,0,0.07) 0%, transparent 60%);
  }
  .album-cover {
    width: 260px; height: 260px; border-radius: 12px;
    background: linear-gradient(135deg, #2a1f0a, #1a1208, #0d0a04);
    border: 1px solid rgba(255,180,0,0.2);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    box-shadow: 0 24px 60px rgba(0,0,0,0.6), 0 0 40px rgba(255,140,0,0.1);
    position: relative; overflow: hidden; flex-shrink: 0;
  }
  .album-cover::before {
    content: ''; position: absolute; inset: 0;
    background: repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,180,0,0.02) 2px, rgba(255,180,0,0.02) 4px);
  }
  .album-cover-emoji { font-size: 4rem; margin-bottom: 12px; }
  .album-cover-title { font-family: 'Playfair Display', serif; font-style: italic; font-size: 0.9rem;
    color: var(--gold); text-align: center; padding: 0 16px; line-height: 1.4; }
  .album-cover-year { font-family: 'DM Mono', monospace; font-size: 0.65rem; color: var(--muted);
    letter-spacing: 0.2em; margin-top: 8px; }

  .artist-info { padding-bottom: 8px; }
  .artist-label { font-family: 'DM Mono', monospace; font-size: 0.68rem; letter-spacing: 0.3em;
    text-transform: uppercase; color: var(--gold); margin-bottom: 12px; }
  .artist-name { font-family: 'Playfair Display', serif; font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 900; line-height: 1; margin-bottom: 16px; }
  .album-title { font-family: 'Playfair Display', serif; font-style: italic; font-size: 1.3rem;
    color: #a89060; margin-bottom: 14px; }
  .artist-meta { display: flex; gap: 24px; flex-wrap: wrap; }
  .meta-pill { padding: 5px 14px; border: 1px solid var(--border); border-radius: 20px;
    font-family: 'DM Mono', monospace; font-size: 0.68rem; letter-spacing: 0.15em;
    text-transform: uppercase; color: var(--muted); }
  .artist-bio { margin-top: 20px; color: #6a5a40; font-size: 0.9rem; line-height: 1.75; max-width: 520px; }

  /* MAIN LAYOUT */
  .main { display: grid; grid-template-columns: 340px 1fr; min-height: calc(100vh - 400px); }

  /* TRACKLIST */
  .tracklist { border-right: 1px solid var(--border); padding: 32px 0; }
  .tracklist-header { padding: 0 28px 20px; border-bottom: 1px solid var(--border);
    font-family: 'DM Mono', monospace; font-size: 0.68rem; letter-spacing: 0.25em;
    text-transform: uppercase; color: var(--muted); }
  .track {
    padding: 18px 28px; border-bottom: 1px solid rgba(255,180,0,0.06);
    cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 16px;
  }
  .track:hover { background: rgba(255,180,0,0.04); }
  .track.active { background: rgba(255,180,0,0.06); border-left: 2px solid var(--gold); }
  .track-num { font-family: 'DM Mono', monospace; font-size: 0.68rem; color: var(--muted);
    width: 20px; flex-shrink: 0; }
  .track.active .track-num { color: var(--gold); }
  .track-info { flex: 1; min-width: 0; }
  .track-name { font-family: 'Playfair Display', serif; font-size: 0.95rem;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .track.active .track-name { color: var(--gold); }
  .track-duration { font-family: 'DM Mono', monospace; font-size: 0.65rem; color: var(--muted); flex-shrink: 0; }

  /* TRANSLATION PANEL */
  .panel { padding: 32px 40px; }

  .panel-empty {
    height: 100%; display: flex; flex-direction: column;
    align-items: center; justify-content: center; text-align: center;
    color: var(--muted); gap: 16px; padding: 80px 40px;
  }
  .panel-empty-icon { font-size: 3rem; opacity: 0.4; }
  .panel-empty p { font-family: 'Playfair Display', serif; font-style: italic; font-size: 1.1rem; }
  .panel-empty span { font-family: 'DM Mono', monospace; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; }

  .track-header { margin-bottom: 28px; padding-bottom: 24px; border-bottom: 1px solid var(--border); }
  .track-header h2 { font-family: 'Playfair Display', serif; font-size: 1.8rem; margin-bottom: 6px; }
  .track-header p { color: var(--muted); font-size: 0.85rem; font-family: 'DM Mono', monospace; letter-spacing: 0.1em; }

  /* Language picker */
  .lang-section { margin-bottom: 28px; }
  .lang-label { font-family: 'DM Mono', monospace; font-size: 0.68rem; letter-spacing: 0.25em;
    text-transform: uppercase; color: var(--muted); margin-bottom: 12px; }
  .lang-grid { display: flex; flex-wrap: wrap; gap: 8px; }
  .lang-btn {
    padding: 8px 16px; border: 1px solid var(--border); border-radius: 8px;
    background: transparent; cursor: pointer; color: var(--muted);
    font-family: 'DM Mono', monospace; font-size: 0.72rem; letter-spacing: 0.1em;
    transition: all 0.2s;
  }
  .lang-btn:hover { border-color: rgba(255,180,0,0.4); color: var(--cream); }
  .lang-btn.selected { background: rgba(255,180,0,0.1); border-color: var(--gold); color: var(--gold); }

  .translate-btn {
    padding: 13px 32px; background: linear-gradient(135deg, var(--gold), var(--orange));
    border: none; border-radius: 8px; cursor: pointer;
    font-family: 'DM Mono', monospace; font-size: 0.78rem; font-weight: 500;
    letter-spacing: 0.15em; text-transform: uppercase; color: #000;
    transition: all 0.2s; box-shadow: 0 4px 20px rgba(255,140,0,0.2);
  }
  .translate-btn:hover { transform: translateY(-1px); box-shadow: 0 8px 28px rgba(255,140,0,0.3); }
  .translate-btn:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }

  /* Lyrics display */
  .lyrics-view { margin-top: 32px; animation: fadeIn 0.4s ease; }
  .voice-note {
    padding: 16px 20px; background: rgba(255,180,0,0.04);
    border: 1px solid rgba(255,180,0,0.15); border-radius: 10px; margin-bottom: 24px;
  }
  .voice-note-label { font-family: 'DM Mono', monospace; font-size: 0.65rem;
    letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold); margin-bottom: 6px; }
  .voice-note p { font-size: 0.85rem; color: #7a6a50; line-height: 1.7; font-style: italic; }

  .lyrics-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .lyrics-col { padding: 24px; background: rgba(255,255,255,0.02);
    border: 1px solid var(--border); border-radius: 12px; }
  .lyrics-col-label { font-family: 'DM Mono', monospace; font-size: 0.65rem;
    letter-spacing: 0.25em; text-transform: uppercase; color: var(--muted); margin-bottom: 16px; }
  .lyrics-text { font-family: 'Playfair Display', serif; font-style: italic;
    font-size: 0.9rem; line-height: 2; color: #c8b590; white-space: pre-line; }
  .lyrics-text.translated { color: #e8c87a; }

  .speak-btn {
    margin-top: 20px; padding: 11px 24px; display: flex; align-items: center; gap: 10px;
    background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 8px;
    cursor: pointer; color: var(--muted); font-family: 'DM Mono', monospace;
    font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; transition: all 0.2s;
  }
  .speak-btn:hover { border-color: rgba(255,180,0,0.3); color: var(--cream); }
  .speak-btn.playing { border-color: var(--gold); color: var(--gold); }

  .loading-state { padding: 48px; text-align: center; }
  .loading-spinner {
    width: 36px; height: 36px; border: 2px solid var(--border);
    border-top-color: var(--gold); border-radius: 50%;
    animation: spin 0.8s linear infinite; margin: 0 auto 16px;
  }
  .loading-state p { font-family: 'Playfair Display', serif; font-style: italic;
    color: var(--muted); font-size: 0.95rem; }

  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

  @media (max-width: 900px) {
    .artist-hero { grid-template-columns: 1fr; padding: 100px 24px 40px; }
    .album-cover { width: 180px; height: 180px; }
    .main { grid-template-columns: 1fr; }
    .tracklist { border-right: none; border-bottom: 1px solid var(--border); }
    .panel { padding: 24px; }
    .lyrics-cols { grid-template-columns: 1fr; }
    nav { padding: 16px 24px; }
  }
</style>
</head>
<body>

<nav>
  <a href="index.html" class="nav-logo">semantics</a>
  <a href="index.html" class="nav-back">← Back to Home</a>
</nav>

<!-- ARTIST HERO -->
<div class="artist-hero">
  <div class="album-cover">
    <div class="album-cover-emoji">🎺</div>
    <div class="album-cover-title">Louis Armstrong &amp; His Hot Five / Hot Seven</div>
    <div class="album-cover-year">1925 – 1928</div>
  </div>
  <div class="artist-info">
    <div class="artist-label">✦ Featured Artist</div>
    <h1 class="artist-name">Louis<br>Armstrong</h1>
    <div class="album-title">The Definitive Collection</div>
    <div class="artist-meta">
      <span class="meta-pill">Jazz / Blues</span>
      <span class="meta-pill">Public Domain</span>
      <span class="meta-pill">1925–1928</span>
      <span class="meta-pill">New Orleans</span>
    </div>
    <p class="artist-bio">
      Louis Armstrong — "Satchmo" — transformed American music forever. His recordings from 1925–1928 with the Hot Five and Hot Seven are considered the foundation of modern jazz. All recordings and compositions in this collection are in the public domain.
    </p>
  </div>
</div>

<!-- MAIN -->
<div class="main">

  <!-- TRACKLIST -->
  <div class="tracklist">
    <div class="tracklist-header">Tracklist — 10 Songs</div>
    <div id="tracklist"></div>
  </div>

  <!-- PANEL -->
  <div class="panel" id="panel">
    <div class="panel-empty">
      <div class="panel-empty-icon">🎺</div>
      <p>Select a track to begin</p>
      <span>Choose a song, pick a language, and hear Armstrong's soul in a new tongue</span>
    </div>
  </div>

</div>

<script>
const TRACKS = [
  { num: 1, title: "St. James Infirmary Blues", duration: "3:18",
    lyrics: `I went down to St. James Infirmary\nSaw my baby there\nStretched out on a long white table\nSo cold, so sweet, so fair\n\nLet her go, let her go, God bless her\nWherever she may be\nShe can look this whole world over\nShe'll never find a man like me\n\nWhen I die, I want you to dress me in straight lace shoes\nBox back coat and a Stetson hat\nPut a twenty dollar gold piece on my watch chain\nSo the boys'll know I died standin' pat\n\nNow I'm goin' down to the barroom\nGonna drink just one more round\nGoin' down to the barroom\nGonna drink just one more round\nThinking about my baby\nAs I lay her in the ground` },
  { num: 2, title: "West End Blues", duration: "3:16",
    lyrics: `West End Blues, the blues that I can't lose\nGot those West End Blues, baby, those blues I just can't lose\nI been down so long, Lord, down don't worry me\n\nI left my baby standing in the back door crying\nI left my baby standing in the back door crying\nBlues grabbed me at midnight, didn't turn me loose till day\n\nSome people say the worry blues ain't bad\nSome people say the worry blues ain't bad\nIt's the worst old feeling Lord, I ever had\n\nWent to the valley, didn't go to stay\nWent to the valley, didn't go to stay\nBut the good Lord knows I just couldn't keep from crying` },
  { num: 3, title: "Heebie Jeebies", duration: "2:54",
    lyrics: `I got the heebie jeebies\nI got the heebie jeebies\nI said I got the heebie jeebies\nI need someone to cure me of these heebie jeebies\n\nNow I woke up this morning feeling sad and blue\nI woke up this morning feeling sad and blue\nGot those heebie jeebies and I don't know what to do\n\nSometimes I wonder why I feel this way\nSometimes I wonder why I feel this way\nGot those heebie jeebies every single day\n\nCome on baby won't you drive them away\nCome on baby won't you drive them away\nGot those heebie jeebies and I need you here to stay` },
  { num: 4, title: "Potato Head Blues", duration: "3:12",
    lyrics: `Now I got a gal she lives up on the hill\nShe won't come down and I know she never will\nI got the potato head blues, I got the potato head blues\nWoke up this morning with the potato head blues\n\nShe makes me feel so good and she makes me feel so bad\nShe's the best good woman Lord I ever had\nI got the potato head blues, potato head blues\nThose low down dirty potato head blues\n\nWell the sun gonna shine in my back door some day\nThe wind gonna rise and blow my blues away\nI got the potato head blues, I got the potato head blues\nNobody knows the potato head blues like me` },
  { num: 5, title: "Cornet Chop Suey", duration: "2:48",
    lyrics: `Down in the alley where the music plays so sweet\nDown in the alley where the music plays so sweet\nGot that cornet chop suey rhythm in my feet\n\nAll the cats are jumping when the band begins to play\nAll the cats are jumping when the band begins to play\nAnd we don't stop swinging till the break of day\n\nHot and sweet, sweet and hot\nGive me everything you got\nCornet chop suey, it'll drive you wild\nMakes you feel like a happy child` },
  { num: 6, title: "Struttin' With Some Barbecue", duration: "3:04",
    lyrics: `Struttin' with some barbecue\nStruttin' with some barbecue\nDown the avenue I go struttin' with some barbecue\n\nEvery Sunday evening when the sun goes down\nI put on my finest and I paint this town\nStruttin' with some barbecue\nOh Lord, struttin' with some barbecue\n\nGot my honey by my side, feeling fine and free\nEverybody watching how she walks with me\nStruttin' with some barbecue\nDown that avenue you see` },
  { num: 7, title: "Muggles", duration: "3:22",
    lyrics: `Early in the morning when the rooster crows\nI don't feel like rising, Lord, everybody knows\nGot the muggles, got the muggles so bad\nGot the muggles, it's the worst I ever had\n\nWalked down the street and I don't know why\nEverything around me seems to pass me by\nGot the muggles, got them in my brain\nGot the muggles, driving me insane\n\nSomeday the sun is gonna shine for me\nSomeday my troubled mind is gonna be free\nBut right now I got the muggles low\nGot the muggles and I got nowhere to go` },
  { num: 8, title: "Tight Like This", duration: "3:01",
    lyrics: `Me and my baby we get along just fine\nMe and my baby, Lord, she's always on my mind\nWe fit together tight like this\nAin't nothing in this world I'm gonna miss\n\nShe holds me close when the night grows cold\nShe's worth more to me than silver and gold\nTight like this, tight like this\nShe gives me everything I could ever wish\n\nSome people searching all their whole life through\nI found what I needed when I found you\nTight like this, tight like this\nMy baby and me, we stay tight like this` },
  { num: 9, title: "Keyhole Blues", duration: "2:56",
    lyrics: `Peeping through the keyhole trying to see inside\nPeeping through the keyhole, got nowhere to hide\nGot the keyhole blues, got the keyhole blues\nPeeping through the keyhole with those keyhole blues\n\nSaw something that I know I wasn't meant to see\nSaw something Lord, it really frightened me\nGot the keyhole blues, those low down keyhole blues\nBaby left me, Lord, and I've got nothing to lose\n\nNow I'm walking down the road all by myself\nLeft my happy feeling sitting on a shelf\nGot the keyhole blues, nothing left to choose\nPeeping through life now with these keyhole blues` },
  { num: 10, title: "Weather Bird", duration: "2:42",
    lyrics: `Listen to the weather bird singing in the tree\nListen to the weather bird, he's singing just for me\nWeather bird calling, calling through the air\nWeather bird singing, love songs everywhere\n\nWhen I hear that weather bird I think of you\nWhen I hear that weather bird I feel it through and through\nSinging in the morning, singing at night\nWeather bird music makes everything alright\n\nCome on weather bird fly down close to me\nCome on weather bird set my poor heart free\nSinging sweet and low, singing soft and high\nWeather bird music floats up to the sky` }
];

const LANGUAGES = [
  { code: "ar", name: "Arabic", flag: "🇸🇦" },
  { code: "es", name: "Spanish", flag: "🇪🇸" },
  { code: "fr", name: "French", flag: "🇫🇷" },
  { code: "de", name: "German", flag: "🇩🇪" },
  { code: "ja", name: "Japanese", flag: "🇯🇵" },
  { code: "zh", name: "Chinese", flag: "🇨🇳" },
  { code: "hi", name: "Hindi", flag: "🇮🇳" },
  { code: "pt", name: "Portuguese", flag: "🇧🇷" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "ko", name: "Korean", flag: "🇰🇷" },
  { code: "tr", name: "Turkish", flag: "🇹🇷" },
  { code: "sw", name: "Swahili", flag: "🇰🇪" },
];

let selectedTrack = null;
let selectedLang = null;
let translationCache = {};
let speaking = false;
let synth = window.speechSynthesis;

// Build tracklist
const tracklistEl = document.getElementById('tracklist');
TRACKS.forEach(track => {
  const el = document.createElement('div');
  el.className = 'track';
  el.dataset.num = track.num;
  el.innerHTML = `
    <span class="track-num">${String(track.num).padStart(2,'0')}</span>
    <div class="track-info"><div class="track-name">${track.title}</div></div>
    <span class="track-duration">${track.duration}</span>
  `;
  el.addEventListener('click', () => selectTrack(track));
  tracklistEl.appendChild(el);
});

function selectTrack(track) {
  selectedTrack = track;
  selectedLang = null;
  document.querySelectorAll('.track').forEach(t => t.classList.remove('active'));
  document.querySelector(`.track[data-num="${track.num}"]`).classList.add('active');
  renderPanel();
}

function renderPanel() {
  const panel = document.getElementById('panel');
  if (!selectedTrack) return;

  panel.innerHTML = `
    <div class="track-header">
      <h2>${selectedTrack.title}</h2>
      <p>Louis Armstrong · Hot Five & Hot Seven · Public Domain</p>
    </div>

    <div class="lang-section">
      <div class="lang-label">Select a language to translate into</div>
      <div class="lang-grid">
        ${LANGUAGES.map(l => `
          <button class="lang-btn ${selectedLang && selectedLang.code === l.code ? 'selected' : ''}"
            onclick="pickLang('${l.code}')">
            ${l.flag} ${l.name}
          </button>
        `).join('')}
      </div>
    </div>

    <button class="translate-btn" id="translateBtn" onclick="doTranslate()"
      ${!selectedLang ? 'disabled' : ''}>
      ✦ Translate into ${selectedLang ? selectedLang.name : '...'}
    </button>

    <div id="lyricsArea"></div>
  `;

  // Show cached result if available
  const cacheKey = selectedTrack.num + '_' + (selectedLang ? selectedLang.code : '');
  if (selectedLang && translationCache[cacheKey]) {
    showResult(translationCache[cacheKey]);
  }
}

function pickLang(code) {
  selectedLang = LANGUAGES.find(l => l.code === code);
  renderPanel();
}

async function doTranslate() {
  if (!selectedTrack || !selectedLang) return;
  const cacheKey = selectedTrack.num + '_' + selectedLang.code;
  if (translationCache[cacheKey]) { showResult(translationCache[cacheKey]); return; }

  const area = document.getElementById('lyricsArea');
  area.innerHTML = `<div class="loading-state"><div class="loading-spinner"></div><p>Translating the soul of this song into ${selectedLang.name}...</p></div>`;

  const prompt = `Translate the song "${selectedTrack.title}" by Louis Armstrong into ${selectedLang.name}.
Preserve his warm, gravelly, soulful blues voice — the deep emotion, the New Orleans cadence, the gentle heartbreak.
Use these XML tags ONLY, nothing else:
<songInfo>one sentence about this song</songInfo>
<translated>full translated lyrics in ${selectedLang.name}</translated>
<artistVoiceNote>two sentences on how you preserved Armstrong's voice</artistVoiceNote>`;

  try {
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await res.json();
    if (data.error) { area.innerHTML = `<p style="color:#ff7070;padding:20px;font-size:0.85rem;">Error: ${data.error.message}</p>`; return; }

    const text = data.content[0].text;
    function extract(tag) {
      const s = text.indexOf('<' + tag + '>');
      const e = text.indexOf('</' + tag + '>');
      if (s === -1 || e === -1) return '';
      return text.slice(s + tag.length + 2, e).trim();
    }

    const result = {
      songInfo: extract('songInfo'),
      translated: extract('translated'),
      artistVoiceNote: extract('artistVoiceNote'),
      lang: selectedLang,
      original: selectedTrack.lyrics
    };

    translationCache[cacheKey] = result;
    showResult(result);
  } catch(e) {
    area.innerHTML = `<p style="color:#ff7070;padding:20px;font-size:0.85rem;">Error: ${e.message}</p>`;
  }
}

function showResult(result) {
  const area = document.getElementById('lyricsArea');
  area.innerHTML = `
    <div class="lyrics-view">
      <div class="voice-note">
        <div class="voice-note-label">🎺 Armstrong Voice Note</div>
        <p>${result.artistVoiceNote || result.songInfo}</p>
      </div>
      <div class="lyrics-cols">
        <div class="lyrics-col">
          <div class="lyrics-col-label">🇺🇸 Original English</div>
          <div class="lyrics-text">${result.original}</div>
        </div>
        <div class="lyrics-col">
          <div class="lyrics-col-label">${result.lang.flag} ${result.lang.name}</div>
          <div class="lyrics-text translated">${result.translated}</div>
        </div>
      </div>
      <button class="speak-btn" id="speakBtn" onclick="toggleSpeak('${result.lang.code}', this)">
        <span id="speakIcon">▶</span>
        <span id="speakLabel">Listen in ${result.lang.name}</span>
      </button>
    </div>
  `;
  // Store translated text for speech
  area.dataset.translatedText = result.translated;
  area.dataset.langCode = result.lang.code;
}

function toggleSpeak(langCode, btn) {
  if (speaking) {
    synth.cancel();
    speaking = false;
    document.getElementById('speakIcon').textContent = '▶';
    document.getElementById('speakLabel').textContent = 'Listen in ' + LANGUAGES.find(l=>l.code===langCode).name;
    btn.classList.remove('playing');
    return;
  }
  const area = document.getElementById('lyricsArea');
  const text = area.dataset.translatedText;
  if (!text) return;
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = langCode;
  utt.rate = 0.85;
  utt.onend = () => {
    speaking = false;
    if (document.getElementById('speakIcon')) {
      document.getElementById('speakIcon').textContent = '▶';
      document.getElementById('speakLabel').textContent = 'Listen in ' + LANGUAGES.find(l=>l.code===langCode).name;
      btn.classList.remove('playing');
    }
  };
  synth.speak(utt);
  speaking = true;
  document.getElementById('speakIcon').textContent = '⏹';
  document.getElementById('speakLabel').textContent = 'Stop playback';
  btn.classList.add('playing');
}
</script>
</body>
</html>
