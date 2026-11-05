(() => {
  const root = document.documentElement;
  const loader = document.getElementById('loader');

  /* ---------- Language (Mongolian / English) ---------- */
  const TEXT = {
    mn: {
      title: 'OctoLearn — Видео хичээлээр суралц',
      loading: 'Ачаалж байна…',
      eyebrow: 'Видео хичээлийн апп',
      lead: 'Богино видео хичээл, шалгалт, XP бүгд нэг апп-д. Алхам алхмаар суралцаж, ахицаа харна уу.',
      androidLabel: 'Android-д татах',
      androidSub: 'APK · v1.0.1 · 58.5 MB',
      note: 'Android: татаж авсны дараа утас асуухад «Үл мэдэгдэх эх сурвалжаас суулгах» зөвшөөрлийг өгнө үү.',
      demo: 'Туршилтын бүртгэл:',
    },
    en: {
      title: 'OctoLearn — Learn with video lessons',
      loading: 'Loading…',
      eyebrow: 'Video course app',
      lead: 'Short video lessons, quizzes and XP in one app. Learn step by step and watch your progress grow.',
      androidLabel: 'Download for Android',
      androidSub: 'APK · v1.0.1 · 58.5 MB',
      note: 'Android: after downloading, allow “Install unknown apps” when your phone asks.',
      demo: 'Demo account:',
    },
  };

  const buttons = document.querySelectorAll('[data-lang]');

  function setLanguage(lang) {
    const dict = TEXT[lang] || TEXT.mn;
    root.lang = lang;
    document.title = dict.title;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = dict[el.dataset.i18n];
      if (value) el.textContent = value;
    });
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.lang === lang)));
  }

  function savedLanguage() {
    try {
      const value = localStorage.getItem('octolearn-lang');
      return value === 'en' || value === 'mn' ? value : 'mn';
    } catch {
      return 'mn'; // storage can be blocked (private mode); the page still works
    }
  }

  buttons.forEach((b) =>
    b.addEventListener('click', () => {
      setLanguage(b.dataset.lang);
      try {
        localStorage.setItem('octolearn-lang', b.dataset.lang);
      } catch {
        /* ignore */
      }
    }),
  );
  if (savedLanguage() !== 'mn') setLanguage(savedLanguage());

  /* ---------- Loader ---------- */
  const MIN_MS = 1200; // long enough to see the octagram draw
  const FAILSAFE_MS = 6000; // never trap the visitor behind the loader
  const startedAt = performance.now();
  let finished = false;

  function removeLoader() {
    if (loader && loader.isConnected) loader.remove();
  }

  function finish() {
    if (finished) return;
    finished = true;
    const wait = Math.max(0, MIN_MS - (performance.now() - startedAt));
    setTimeout(() => {
      root.classList.add('is-ready');
      if (loader) loader.addEventListener('transitionend', removeLoader, { once: true });
      setTimeout(removeLoader, 1200);
    }, wait);
  }

  const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  const pageLoaded = new Promise((resolve) => {
    if (document.readyState === 'complete') resolve();
    else window.addEventListener('load', resolve, { once: true });
  });
  Promise.all([pageLoaded, fontsReady]).then(finish, finish);
  setTimeout(finish, FAILSAFE_MS);
})();
