const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */
class VigenereCipheringMachine {
  constructor(clear = true) {
    this.clear = clear;
    this.alphabet = 'abcdefghijklmnopqrstuvwxyz';
  }

  encrypt(text, keyword) {
    if (typeof text !== 'string' || typeof keyword !== 'string') {
      throw new Error('Incorrect arguments!');
    }
    return this.process(text, keyword, true);
  }

  decrypt(text, keyword) {
    if (typeof text !== 'string' || typeof keyword !== 'string') {
      throw new Error('Incorrect arguments!');
    }
    return this.process(text, keyword, false);
  }

  process(text, keyword, isEncrypt) {
    let outputText = '';
    let index = 0;
    const n = this.alphabet.length;

    for (let char of text) {
      if (!/[a-zA-Z]/.test(char)) {
        outputText += char;
        continue;
      }

      const textIndex = this.alphabet.indexOf(char.toLowerCase());
      const keyChar = keyword[index % keyword.length].toLowerCase();
      const keyIndex = this.alphabet.indexOf(keyChar);

      const mod = isEncrypt
          ? (textIndex + keyIndex) % n
          : (textIndex - keyIndex + n) % n;

      const resultChar = this.alphabet[mod].toUpperCase();
      outputText += char === char.toUpperCase() ? resultChar.toUpperCase() : resultChar;
      index += 1;
    }

    return this.clear ? outputText : outputText.split('').reverse().join('');
  }
}

module.exports = {
  VigenereCipheringMachine
};
