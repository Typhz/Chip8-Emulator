class Speaker {
  constructor() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    this.audioCtx = new AudioContext();

    // Cria um ganho (volume) de áudio que pode ser controlado
    this.gain = this.audioCtx.createGain();
    this.finish = this.audioCtx.destination;

    // Conecta o ganho ao destino de áudio
    this.gain.connect(this.finish);
  }

  play(frequency) {
    if (this.audioCtx && !this.oscillator) {
      this.oscillator = this.audioCtx.createOscillator();

      // Seta a frequência do som
      this.oscillator.frequency.setValueAtTime(
        frequency || 440,
        this.audioCtx.currentTime
      );

      // Seta o tipo de onda do som
      this.oscillator.type = "square";

      // Conecta o oscilador ao ganho
      this.oscillator.connect(this.gain);
      this.oscillator.start();
    }
  }

  stop() {
    if (this.oscillator) {
      this.oscillator.stop();
      this.oscillator.disconnect();
      this.oscillator = null;
    }
  }
}

export default Speaker;
