let loadingPromise = null;
const RESET_FLAG = "px_gt_reset_once";

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Translate script"));
    document.head.appendChild(script);
  });
}

export function ensureGoogleTranslate() {
  if (typeof window === "undefined") return Promise.resolve();
  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise((resolve, reject) => {
    const init = () => {
      try {
        if (!window.google?.translate?.TranslateElement) {
          reject(new Error("Google Translate API unavailable"));
          return;
        }
        const host = document.getElementById("google_translate_element");
        if (!host) {
          reject(new Error("Missing google_translate_element container"));
          return;
        }
        if (!host.dataset.inited) {
          // eslint-disable-next-line no-new
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,de,ar",
              autoDisplay: false,
            },
            "google_translate_element"
          );
          host.dataset.inited = "1";
        }
        resolve();
      } catch (err) {
        reject(err);
      }
    };

    if (window.google?.translate?.TranslateElement) {
      init();
      return;
    }

    window.googleTranslateElementInit = init;
    loadScript("https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit").catch(reject);
  });

  return loadingPromise;
}

export async function applyGoogleTranslate(lang) {
  const normalized = lang === "de" || lang === "ar" ? lang : "en";

  const clearGoogleTranslateState = () => {
    try {
      document.cookie = "googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
      const host = window.location.hostname;
      document.cookie = `googtrans=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${host}`;
      localStorage.removeItem("googtrans");
      sessionStorage.removeItem("googtrans");
    } catch {
      // ignore cookie/storage clearing errors
    }
  };

  if (normalized === "en") {
    clearGoogleTranslateState();

    const combo = document.querySelector(".goog-te-combo");
    if (combo) {
      combo.value = "en";
      combo.dispatchEvent(new Event("change"));
    }

    const translated = document.body.classList.contains("translated-ltr")
      || document.body.classList.contains("translated-rtl")
      || document.documentElement.classList.contains("translated-ltr")
      || document.documentElement.classList.contains("translated-rtl");

    if (translated && !sessionStorage.getItem(RESET_FLAG)) {
      sessionStorage.setItem(RESET_FLAG, "1");
      window.location.reload();
      return;
    }

    sessionStorage.removeItem(RESET_FLAG);
    return;
  }

  await ensureGoogleTranslate();

  const setCombo = () => {
    const combo = document.querySelector(".goog-te-combo");
    if (!combo) return false;
    combo.value = normalized;
    combo.dispatchEvent(new Event("change"));
    return true;
  };

  if (setCombo()) return;

  let attempts = 0;
  const interval = window.setInterval(() => {
    attempts += 1;
    if (setCombo() || attempts > 20) {
      window.clearInterval(interval);
    }
  }, 150);
}
