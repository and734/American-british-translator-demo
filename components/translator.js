const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');

class Translator {
  translate(text, locale) {
    let translated = text;
    let highlighted = text;
    let somethingChanged = false;


    if (locale === 'american-to-british') {
      // Combine dictionaries
      const combinedDict = {
        ...americanOnly,
        ...americanToBritishSpelling,
      };

      // Sort keys by length (longest first)
      const sortedKeys = Object.keys(combinedDict).sort((a, b) => b.length - a.length);

      // Translate words and phrases
      for (const key of sortedKeys) { // Iterate through sortedKeys
          const regex = new RegExp(`\\b${key}\\b`, 'gi');
          if (regex.test(translated)) {
              translated = translated.replace(regex, combinedDict[key]);
              highlighted = highlighted.replace(regex, `<span class="highlight">${combinedDict[key]}</span>`);
              somethingChanged = true;
          }
      }
      //Translate titles
      for(const key in americanToBritishTitles){
        const regex = new RegExp(`${key}`, 'gi');
        if(regex.test(translated)) {
            let replaceValue = americanToBritishTitles[key].charAt(0).toUpperCase() + americanToBritishTitles[key].slice(1);
            translated = translated.replace(regex, replaceValue);
            highlighted = highlighted.replace(regex, `<span class="highlight">${replaceValue}</span>`);
            somethingChanged = true;
        }
      }

      // Translate time
      const timeRegex = /(\d{1,2}):(\d{2})/g;
      if (timeRegex.test(translated)) {
        translated = translated.replace(timeRegex, '$1.$2');
        highlighted = highlighted.replace(timeRegex, '<span class="highlight">$1.$2</span>');
        somethingChanged = true;
      }

    } else if (locale === 'british-to-american') {

         // Combine dictionaries (inverting spelling)
      const combinedDict = {
        ...britishOnly,
      };
      for(const key in americanToBritishSpelling){
        combinedDict[americanToBritishSpelling[key]] = key;
      }

      // Sort keys by length (longest first)
      const sortedKeys = Object.keys(combinedDict).sort((a, b) => b.length - a.length);

        // Translate words
      for (const key of sortedKeys) { // Iterate through sortedKeys
        const regex = new RegExp(`\\b${key}\\b`, 'gi');

        if(regex.test(translated)){
            translated = translated.replace(regex, combinedDict[key]);
            highlighted = highlighted.replace(regex, `<span class="highlight">${combinedDict[key]}</span>`);
            somethingChanged = true;
        }
      }

      //Translate Titles
      for(const key in americanToBritishTitles){
        let replaceValue = key.charAt(0).toUpperCase() + key.slice(1);
        const regex = new RegExp(`\\b${americanToBritishTitles[key]}\\b`, 'gi');
        if(regex.test(translated)) {
            translated = translated.replace(regex, replaceValue);
            highlighted = highlighted.replace(regex, `<span class="highlight">${replaceValue}</span>`);
            somethingChanged = true;
        }
      }

      // Translate time
      const timeRegex = /(\d{1,2})\.(\d{2})/g;
      if (timeRegex.test(translated)) {
        translated = translated.replace(timeRegex, '$1:$2');
        highlighted = highlighted.replace(timeRegex, '<span class="highlight">$1:$2</span>');
        somethingChanged = true;
      }
    } else {
        return {error: 'Invalid value for locale field'}; //error handle
    }

    if(!somethingChanged) return {text: text, translation: "Everything looks good to me!"}

    return { text: text, translation: highlighted };
  }
}

module.exports = Translator;
