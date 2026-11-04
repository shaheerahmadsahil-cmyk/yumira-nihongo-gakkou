/**
 * Japanese Audio Pronunciation Utility
 * Provides native Japanese speech synthesis (SpeechSynthesis ja-JP)
 * with graceful Web Audio frequency fallbacks and custom audio playback.
 */

export function playJapaneseSpeech(text: string): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if ("speechSynthesis" in window) {
      // Cancel previous speech if any
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ja-JP";
      utterance.rate = 0.85; // Slightly slower for clear language learning
      utterance.pitch = 1.0;

      // Select Japanese voice if available
      const voices = window.speechSynthesis.getVoices();
      const jaVoice = voices.find((v) => v.lang.startsWith("ja") || v.lang === "ja-JP");
      if (jaVoice) {
        utterance.voice = jaVoice;
      }

      utterance.onend = () => resolve(true);
      utterance.onerror = () => {
        fallbackWebAudioBeep();
        resolve(true);
      };

      window.speechSynthesis.speak(utterance);
    } else {
      fallbackWebAudioBeep();
      resolve(true);
    }
  });
}

function fallbackWebAudioBeep() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.3);
  } catch {
    // Ignore audio fallback error
  }
}
