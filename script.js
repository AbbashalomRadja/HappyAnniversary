/* =========================================================
   Veronicha & Abbashalom — 1st Anniversary 🦖💚
   ========================================================= */

// ---------- Tanggal penting ----------
const FIRST_MET = new Date(2025, 3, 26);       // 26 April 2025 — Kota Batu
const OFFICIAL  = new Date(2025, 10, 1);       // 1 November 2025 — jadian
const ANNIV_1   = new Date(2026, 10, 1);       // 1 November 2026 — 1 tahun

// ---------- Lagu ----------
// File lagu: assets/musik/thank-god-i-found-you.mp3 (diputar berulang)

// ---------- Galeri ----------
const CAPTIONS = [
  'senyum favoritku', 'kita lucu ga sih', 'momen kecil, kenangan besar', 'my person 💚',
  'cumlaude & cumcinta', 'jalan-jalan sama kamu', 'liat deh kita', 'candid tapi gemes',
  'cie berdua', 'muka absurd kita', 'kangen hari ini', 'peluk dulu sini',
  'rawr means i love you 🦖', 'si cantik', 'favorit aku', 'bareng terus yaa',
  'aku & dino kesayangan', 'manis banget', 'satu frame berdua', 'ga mau pisah',
  'my happy place',
];
const MEDIA = [];
for (let i = 1; i <= 21; i++) MEDIA.push({ type: 'img', src: `assets/img/foto${String(i).padStart(2, '0')}.jpg` });
MEDIA.splice(3, 0, { type: 'video', src: 'assets/video/video1.mp4' });
MEDIA.splice(13, 0, { type: 'video', src: 'assets/video/video2.mp4' });

// ---------- Alasan (telur dino) ----------
const REASONS = [
  ['🌞', 'Senyummu bikin hariku langsung cerah, seberat apa pun harinya.'],
  ['🫶', 'Kamu sabar banget ngadepin aku yang suka random dan nyebelin.'],
  ['🦖', 'Kamu lucu kayak dino kecil — apalagi pas lagi ngambek.'],
  ['👂', 'Kamu selalu mau dengerin cerita aku, sepenting atau segaje apa pun.'],
  ['🌱', 'Sama kamu, aku pengen terus tumbuh jadi versi terbaik diriku.'],
  ['🎶', 'Ketawamu itu lagu favorit aku, ngalahin semua playlist.'],
  ['🏡', 'Kamu tempat aku pulang dan ngerasa tenang.'],
  ['🙏', 'Kamu jawaban doa yang bahkan belum sempet aku ucapin.'],
  ['💚', 'Karena kamu ya kamu, Veronicha. Dan itu udah lebih dari cukup.'],
];

// ---------- Surat ----------
const LETTER = `Hai sayangku, Veronicha 💚

Selamat satu tahun, cantik!

Masih inget nggak, 26 April 2025 di Kota Batu? Waktu itu aku cuma mikir, "wah, anak ini seru juga." Ternyata Tuhan punya rencana yang jauh lebih indah dari yang aku kira.

Terus 1 November 2025, kamu resmi jadi pacarku. Dari hari itu sampai sekarang, kamu udah ngisi hari-hariku dengan tawa, cerita, sabar, bahkan ngambek-ngambek kecil yang entah kenapa tetep gemesin.

Makasih ya udah mau jalan bareng aku. Makasih udah sabar sama aku yang masih banyak kurangnya. Makasih udah jadi tempat aku cerita, pulang, dan bersandar.

Aku nggak janji semuanya bakal selalu gampang. Tapi aku janji bakal terus milih kamu, lagi dan lagi. Thank God I found you. 🙏

Aku mau ngabisin 10.000 jam lagi, dan 10.000 jam setelahnya, sama kamu.

Happy 1st anniversary, sayang. Aku sayang kamu, banget banget banget. 🦖💚

— Pacarmu yang paling beruntung,
Abbashalom Radja`;

// =========================================================
const $ = (s, r = document) => r.querySelector(s);
const pad = n => String(n).padStart(2, '0');

// ---------- Toast ----------
let toastT;
function toast(msg, ms = 3200) {
  const t = $('#toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), ms);
}

// ---------- Floaties ----------
const FLOAT_ICONS = ['💚', '🦖', '🌿', '🤍', '🦕', '✨', '🍃', '💗'];
function spawnFloatie() {
  const el = document.createElement('span');
  el.className = 'floatie';
  el.textContent = FLOAT_ICONS[Math.floor(Math.random() * FLOAT_ICONS.length)];
  el.style.left = Math.random() * 100 + 'vw';
  el.style.fontSize = 14 + Math.random() * 18 + 'px';
  el.style.animationDuration = 10 + Math.random() * 10 + 's';
  $('#floaties').appendChild(el);
  setTimeout(() => el.remove(), 21000);
}
setInterval(spawnFloatie, 1300);
for (let i = 0; i < 6; i++) setTimeout(spawnFloatie, i * 300);

// Hati kecil setiap klik
document.addEventListener('click', e => {
  if (e.target.closest('button, a, .polaroid, .lightbox, .player')) return;
  heartBurst(e.clientX, e.clientY, 6);
});
function heartBurst(x, y, n = 8) {
  for (let i = 0; i < n; i++) {
    const h = document.createElement('span');
    h.className = 'burst';
    h.textContent = Math.random() > .3 ? '💚' : '🦖';
    const a = (Math.PI * 2 * i) / n, d = 40 + Math.random() * 50;
    h.style.left = x + 'px'; h.style.top = y + 'px';
    h.style.setProperty('--dx', Math.cos(a) * d + 'px');
    h.style.setProperty('--dy', Math.sin(a) * d + 'px');
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1000);
  }
}

// ---------- Gate (pertanyaan pembuka) ----------
const noTexts = ['Yakin? 🥺', 'Masa sih?', 'Coba pikir lagi', 'Dino sedih nih 🦖💧', 'Gabisa diklik wlee', 'Pencet yang ijo aja'];
const hintTexts = ['hmm salah pencet ya?', 'tombolnya kabur tuh 😆', 'ayo jujur ajaa', 'aku tungguin lho', 'pilih yang ijo yaa sayang'];
let noCount = 0;
const btnNo = $('#btnNo'), btnYes = $('#btnYes');
function runAway(e) {
  e && e.preventDefault();
  noCount++;
  const r = btnNo.getBoundingClientRect();
  btnNo.classList.add('runaway');
  const maxX = window.innerWidth - r.width - 20, maxY = window.innerHeight - r.height - 20;
  btnNo.style.left = Math.max(20, Math.random() * maxX) + 'px';
  btnNo.style.top = Math.max(20, Math.random() * maxY) + 'px';
  btnNo.textContent = noTexts[noCount % noTexts.length];
  $('#gateHint').textContent = hintTexts[noCount % hintTexts.length];
  const s = Math.min(1 + noCount * 0.12, 1.8);
  btnYes.style.transform = `scale(${s})`;
}
btnNo.addEventListener('mouseenter', runAway);
btnNo.addEventListener('click', runAway);
btnNo.addEventListener('touchstart', runAway, { passive: false });

btnYes.addEventListener('click', e => {
  heartBurst(e.clientX, e.clientY, 14);
  $('#gateQuestion').textContent = 'Aku jugaa! 🥰';
  btnNo.style.display = 'none';
  setTimeout(() => {
    $('#gate').classList.add('gone');
    document.body.classList.remove('locked');
    playMusic();
    $('#player').classList.add('expanded');
    setTimeout(() => $('#player').classList.remove('expanded'), 4500);
    if (Date.now() >= ANNIV_1) setTimeout(fireConfetti, 600);
  }, 900);
});

// ---------- Countdown / hero ----------
let heroCelebrated = false;
function tickHero() {
  const now = new Date();
  const diff = ANNIV_1 - now;
  const cd = $('#countdown');
  if (diff > 0 && diff < 1000 * 60 * 60 * 24 * 3) {
    cd.classList.remove('hidden');
    const h = Math.floor(diff / 3.6e6), m = Math.floor(diff / 6e4) % 60, s = Math.floor(diff / 1000) % 60;
    $('#cdH').textContent = pad(h); $('#cdM').textContent = pad(m); $('#cdS').textContent = pad(s);
  } else if (diff <= 0 && !heroCelebrated) {
    const wasCounting = !cd.classList.contains('hidden');
    heroCelebrated = true;
    cd.classList.add('hidden');
    $('#heroSub').textContent = 'TEPAT SATU TAHUN! 🎉 Makasih udah jadi bagian terindah di hidupku. 💚';
    if (wasCounting) { fireConfetti(); toast('Jam 00:00 — Happy 1st Anniversary, sayang! 🦖💚', 5000); }
  }
}

// ---------- Counter ----------
function tickCounter() {
  const now = new Date();
  const ms = Math.max(0, now - OFFICIAL);
  $('#cDays').textContent = Math.floor(ms / 864e5).toLocaleString('id-ID');
  $('#cHours').textContent = Math.floor(ms / 3.6e6).toLocaleString('id-ID');
  $('#cMins').textContent = Math.floor(ms / 6e4).toLocaleString('id-ID');
  $('#cSecs').textContent = Math.floor(ms / 1000).toLocaleString('id-ID');
  $('#metDays').textContent = Math.floor((now - FIRST_MET) / 864e5).toLocaleString('id-ID');
}
function tick() { tickHero(); tickCounter(); }

// ---------- Gallery ----------
const grid = $('#galleryGrid');
MEDIA.forEach((m, i) => {
  const card = document.createElement('figure');
  card.className = 'polaroid reveal';
  card.style.setProperty('--rot', `${(Math.random() * 8 - 4).toFixed(1)}deg`);
  const cap = m.type === 'video' ? 'video kita 🎬' : CAPTIONS[(i) % CAPTIONS.length];
  card.innerHTML = m.type === 'img'
    ? `<img src="${m.src}" alt="${cap}" loading="lazy" /><span class="cap">${cap}</span>`
    : `<video src="${m.src}" muted loop playsinline preload="metadata"></video><span class="play-badge">▶ video</span><span class="cap">${cap}</span>`;
  if (m.type === 'video') {
    const v = card.querySelector('video');
    card.addEventListener('mouseenter', () => v.play().catch(() => {}));
    card.addEventListener('mouseleave', () => v.pause());
  }
  card.addEventListener('click', () => openLightbox(i));
  grid.appendChild(card);
});

// ---------- Lightbox ----------
let lbIndex = 0;
const lb = $('#lightbox'), stage = $('#lbStage');
function renderLb() {
  const m = MEDIA[lbIndex];
  stage.innerHTML = m.type === 'img'
    ? `<img src="${m.src}" alt="foto kenangan" />`
    : `<video src="${m.src}" controls autoplay playsinline></video>`;
  if (m.type === 'video') duckMusic(true); else duckMusic(false);
}
function openLightbox(i) { lbIndex = i; renderLb(); lb.classList.add('open'); }
function closeLightbox() { lb.classList.remove('open'); stage.innerHTML = ''; duckMusic(false); }
function moveLb(d) { lbIndex = (lbIndex + d + MEDIA.length) % MEDIA.length; renderLb(); }
$('#lbClose').onclick = closeLightbox;
$('#lbPrev').onclick = () => moveLb(-1);
$('#lbNext').onclick = () => moveLb(1);
lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') moveLb(-1);
  if (e.key === 'ArrowRight') moveLb(1);
});
let tx = 0;
lb.addEventListener('touchstart', e => tx = e.touches[0].clientX, { passive: true });
lb.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - tx;
  if (Math.abs(dx) > 50) moveLb(dx < 0 ? 1 : -1);
});

// ---------- Eggs ----------
const eggGrid = $('#eggGrid');
let opened = 0;
REASONS.forEach(([icon, text], i) => {
  const egg = document.createElement('button');
  egg.className = 'egg reveal';
  egg.setAttribute('aria-label', `Buka telur ke-${i + 1}`);
  egg.innerHTML = `<div class="egg-shell"></div><span class="egg-num">#${i + 1}</span>
    <div class="egg-note"><div><span class="baby">${icon}</span>${text}</div></div>`;
  egg.addEventListener('click', e => {
    if (egg.classList.contains('open') || egg.classList.contains('cracking')) return;
    egg.classList.add('cracking');
    setTimeout(() => {
      egg.classList.remove('cracking'); egg.classList.add('open');
      heartBurst(e.clientX, e.clientY, 8);
      opened++;
      if (opened === REASONS.length) {
        toast('Semua telur udah netas! Dino-dinonya bilang: aku sayang kamu 🦖💚', 4500);
        fireConfetti();
      }
    }, 500);
  });
  eggGrid.appendChild(egg);
});

// ---------- Letter ----------
let letterOpened = false;
$('#envSeal').addEventListener('click', () => {
  if (letterOpened) return;
  letterOpened = true;
  $('#envelope').classList.add('open');
  $('#envHint').textContent = 'baca pelan-pelan yaa 🥹';
  setTimeout(typeLetter, 1300);
});
function typeLetter() {
  const box = $('#letterText');
  const paper = $('#envPaper');
  let i = 0;
  const caret = '<span class="caret"></span>';
  (function step() {
    if (i <= LETTER.length) {
      box.innerHTML = escapeHtml(LETTER.slice(0, i)) + caret;
      paper.scrollTop = paper.scrollHeight;
      const ch = LETTER[i - 1];
      i++;
      setTimeout(step, ch === '\n' ? 220 : ch === '.' || ch === ',' ? 120 : 28);
    } else {
      box.innerHTML = escapeHtml(LETTER);
    }
  })();
}
function escapeHtml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

// ---------- Music ----------
const audio = $('#audio');
const player = $('#player');
audio.volume = 0.85;
function playMusic() {
  const p = audio.play();
  if (p) p.catch(() => toast('Tap tombol ▶ di pojok kanan bawah buat muter lagunya yaa 🎶'));
}
audio.addEventListener('play', () => { player.classList.add('playing'); $('#btnPlay').textContent = '⏸'; });
audio.addEventListener('pause', () => { player.classList.remove('playing'); $('#btnPlay').textContent = '▶'; });
audio.addEventListener('timeupdate', () => {
  if (audio.duration) $('#progressBar').style.width = (audio.currentTime / audio.duration * 100) + '%';
});
audio.addEventListener('error', () => toast('Lagunya gagal dimuat 🥺'));
$('#btnPlay').addEventListener('click', e => {
  e.stopPropagation();
  if (audio.paused) playMusic(); else audio.pause();
});
$('#playerToggle').addEventListener('click', e => {
  e.stopPropagation();
  player.classList.toggle('expanded');
});
let ducked = false, prevVol = 1;
function duckMusic(on) {
  if (on && !ducked) { prevVol = audio.volume; audio.volume = 0.08; ducked = true; }
  else if (!on && ducked) { audio.volume = prevVol; ducked = false; }
}

// ---------- Reveal on scroll ----------
const io = new IntersectionObserver(entries => {
  entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// ---------- Confetti ----------
const cv = $('#confetti'), ctx = cv.getContext('2d');
let parts = [], raf = null;
function resize() { cv.width = innerWidth * devicePixelRatio; cv.height = innerHeight * devicePixelRatio; ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0); }
resize(); addEventListener('resize', resize);
const COLORS = ['#9CAF88', '#6E8B5E', '#DCE5D2', '#F4B6B6', '#E58C96', '#FFFDF8', '#F3D9A4'];
function fireConfetti() {
  for (let i = 0; i < 180; i++) {
    parts.push({
      x: innerWidth / 2 + (Math.random() - .5) * 200, y: innerHeight * .55,
      vx: (Math.random() - .5) * 16, vy: -Math.random() * 18 - 6,
      s: 6 + Math.random() * 8, r: Math.random() * 6, vr: (Math.random() - .5) * .3,
      c: COLORS[Math.floor(Math.random() * COLORS.length)], heart: Math.random() < .3, life: 0,
    });
  }
  if (!raf) loop();
}
function drawHeart(x, y, s) {
  ctx.beginPath();
  ctx.moveTo(x, y + s / 4);
  ctx.bezierCurveTo(x, y, x - s / 2, y, x - s / 2, y + s / 4);
  ctx.bezierCurveTo(x - s / 2, y + s / 2, x, y + s * .7, x, y + s);
  ctx.bezierCurveTo(x, y + s * .7, x + s / 2, y + s / 2, x + s / 2, y + s / 4);
  ctx.bezierCurveTo(x + s / 2, y, x, y, x, y + s / 4);
  ctx.fill();
}
function loop() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  parts.forEach(p => {
    p.vy += .4; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.r += p.vr; p.life++;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.fillStyle = p.c;
    if (p.heart) drawHeart(0, -p.s / 2, p.s * 1.4); else ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
    ctx.restore();
  });
  parts = parts.filter(p => p.y < innerHeight + 40 && p.life < 400);
  if (parts.length) raf = requestAnimationFrame(loop);
  else { raf = null; ctx.clearRect(0, 0, innerWidth, innerHeight); }
}
$('#btnConfetti').addEventListener('click', e => {
  fireConfetti(); heartBurst(e.clientX, e.clientY, 12);
  toast('Happy 1st Anniversary, Veronicha! 🦖💚 I love you!', 4000);
});

// ---------- Start clock ----------
tick(); setInterval(tick, 1000);
