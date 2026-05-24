/* ============================================
   Retro Sound Effects Synthesizer (8-Bit Style)
   Synthesizes retro sounds in code using Web Audio API.
   ============================================ */

type SoundStoreListener = () => void;

interface WebkitAudioWindow extends Window {
  webkitAudioContext?: typeof AudioContext;
}

class RetroSound {
  private static ctx: AudioContext | null = null;
  private static isMuted = true; // default to muted to avoid unexpected noise, let user unmute!
  private static listeners = new Set<SoundStoreListener>();

  private static getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    try {
      if (!RetroSound.ctx) {
        const AudioContextCtor = window.AudioContext || (window as WebkitAudioWindow).webkitAudioContext;
        if (!AudioContextCtor) return null;
        RetroSound.ctx = new AudioContextCtor();
      }
      if (RetroSound.ctx.state === 'suspended') {
        RetroSound.ctx.resume();
      }
      return RetroSound.ctx;
    } catch {
      return null;
    }
  }

  private static emitChange() {
    RetroSound.listeners.forEach((listener) => listener());
  }

  static subscribe(listener: SoundStoreListener): () => void {
    RetroSound.listeners.add(listener);
    return () => RetroSound.listeners.delete(listener);
  }

  static init() {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('portfolio-sfx-muted');
        if (saved !== null) {
          const nextMuted = saved === 'true';
          if (RetroSound.isMuted !== nextMuted) {
            RetroSound.isMuted = nextMuted;
            RetroSound.emitChange();
          }
        }
      } catch {
        // Fallback
      }
    }
  }

  static toggleMute(): boolean {
    RetroSound.isMuted = !RetroSound.isMuted;
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('portfolio-sfx-muted', String(RetroSound.isMuted));
      } catch {
        // Ignored
      }
    }
    RetroSound.emitChange();
    return RetroSound.isMuted;
  }

  static getMuted(): boolean {
    return RetroSound.isMuted;
  }

  static getServerMuted(): boolean {
    return true;
  }

  static playClick() {
    if (RetroSound.isMuted) return;
    const ctx = RetroSound.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle'; // Pixel sound style
      osc.frequency.setValueAtTime(440, ctx.currentTime); // A4
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08); // Quick slide up

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Audio might fail due to browser autoplay policies
    }
  }

  static playToggle() {
    if (RetroSound.isMuted) return;
    const ctx = RetroSound.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(330, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } catch {
      // Ignored
    }
  }

  static playKey() {
    if (RetroSound.isMuted) return;
    const ctx = RetroSound.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      // Add slight random pitch to simulate typing variance
      const pitch = 500 + Math.random() * 250;
      osc.frequency.setValueAtTime(pitch, ctx.currentTime);

      gain.gain.setValueAtTime(0.02, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch {
      // Ignored
    }
  }

  static playLevelUp() {
    if (RetroSound.isMuted) return;
    const ctx = RetroSound.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const playTone = (freq: number, start: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.04, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + duration);
      };

      // Upward arpeggio
      playTone(523.25, now, 0.08); // C5
      playTone(659.25, now + 0.08, 0.08); // E5
      playTone(783.99, now + 0.16, 0.08); // G5
      playTone(1046.50, now + 0.24, 0.25); // C6
    } catch {
      // Ignored
    }
  }

  static playQuestComplete() {
    if (RetroSound.isMuted) return;
    const ctx = RetroSound.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const playTone = (freq: number, start: number, duration: number) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0.05, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + duration);
      };

      // Cute heroic accent
      playTone(587.33, now, 0.1); // D5
      playTone(880.00, now + 0.1, 0.15); // A5
      playTone(1174.66, now + 0.25, 0.3); // D6
    } catch {
      // Ignored
    }
  }

  static playEasterEgg() {
    if (RetroSound.isMuted) return;
    const ctx = RetroSound.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.22); // Fun laser slide

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {
      // Ignored
    }
  }
}

// Initialise on import if window exists
RetroSound.init();

export default RetroSound;
