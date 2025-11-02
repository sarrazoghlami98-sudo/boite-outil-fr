export type TTSSpeed = 0.8 | 1 | 1.2;

class TTSService {
  private synthesis: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private speed: TTSSpeed = 1;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synthesis = window.speechSynthesis;
    }
  }

  setSpeed(speed: TTSSpeed) {
    this.speed = speed;
  }

  speak(text: string, onEnd?: () => void): void {
    if (!this.synthesis) {
      console.warn('Speech synthesis not supported');
      return;
    }

    this.stop();

    this.currentUtterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance.lang = 'fr-FR';
    this.currentUtterance.rate = this.speed;
    
    if (onEnd) {
      this.currentUtterance.onend = onEnd;
    }

    this.synthesis.speak(this.currentUtterance);
  }

  stop(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
    this.currentUtterance = null;
  }

  isSupported(): boolean {
    return this.synthesis !== null;
  }

  isSpeaking(): boolean {
    return this.synthesis?.speaking || false;
  }
}

export const ttsService = new TTSService();
