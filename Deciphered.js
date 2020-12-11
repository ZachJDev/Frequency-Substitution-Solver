class DecipherTool {
  constructor(cipher) {
    this.inputFrequency = {};
    this.length = 0;
    this.frequencies = [];
    this.originalText = cipher;

    // Set up text for original / display
    const splitText = cipher.split("");
    this.text = splitText.map((val) => {
      return { cipherValue: val.toLowerCase(), display: val.toUpperCase() };
    });
    // Get actual number of each letter in cipher
    splitText.forEach((el) => {
      let letter = el.toLowerCase();
      if (this.isAlpha(letter)) {
        this.inputFrequency[letter] = ++this.inputFrequency[letter] || 1;
        this.length++;
      }
    });
    // Create a list of letters sorted by frequency.
    for (let key in this.inputFrequency) {
      this.frequencies.push({ letter: key, freq: this.inputFrequency[key] });
    }
    this.frequencies.sort((a, b) => b.freq - a.freq);
  }
  isAlpha = (char) => {
    let code = char.charCodeAt(0);
    return (code >= 65 && code <= 90) || (code >= 97 && code <= 122);
  };
  updateLetter(original, replacement) {
    this.text = this.text.map((val) => {
      return {
        cipherValue: val.cipherValue,
        display: val.cipherValue === original ? replacement : val.display,
      };
    });
  }
  revertLetter(original) {
    this.updateLetter(original.toLowerCase(), original.toUpperCase());
  }
  get displayText() {
    return this.text.map((val) => val.display).join("");
  }
}
