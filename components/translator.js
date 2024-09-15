
const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require('./american-to-british-titles.js');
const britishOnly = require('./british-only.js');
 
// capitalizeFirstLetter used for titles
const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
const invertObject = (obj) => {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [value, key]));
};


class Translator {
    toBritishEnglish(text) {
        let translation = text;
    
     
        // αντικατάσταση αμερικανικών σε βρετανικά
        for (let [american, british] of Object.entries(americanToBritishSpelling)) {
            const regex = new RegExp(`\\b${american}\\b(?!<\/span>)`, 'gi');
            translation = translation.replace(regex, `<span class="highlight">${british}</span>`);
        }
    
     
        // αντικατάσταση American-only λέξεων
        for (let americanWord in americanOnly) {
            const regex = new RegExp(`\\b${americanWord}\\b(?!<\/span>)`, 'gi');
            translation = translation.replace(regex, `<span class="highlight">${americanOnly[americanWord]}</span>`);
        }
    
     
        // αντικατάσταση τίτλων 
        for (let [americanTitle, britishTitle] of Object.entries(americanToBritishTitles)) {
            const regex = new RegExp(`\\b${britishTitle}\\b\\.`, 'gi');
            translation = translation.replace(regex, (match) => {
                return `<span class="highlight">${capitalizeFirstLetter(britishTitle)}</span>`;
            });
        }
    
     
        translation = this.convertTimeToBritish(translation);
    
     
        if (translation === text) {
            return "Everything looks good to me!";
        }
    
        return translation;
    }

    toAmericanEnglish(text) {
        let translation = text;
        const britishToAmericanSpelling = invertObject(americanToBritishSpelling);
        const britishToAmericanTitles = invertObject(americanToBritishTitles);

        // αντικατάσταση βρετανικών σε αμερικανικά
        for (let [british, american] of Object.entries(britishToAmericanSpelling)) {
            const regex = new RegExp(`\\b${british}\\b(?!<\/span>)`, 'gi');
            translation = translation.replace(regex, `<span class="highlight">${american}</span>`);
        }

        // αντικατάσταση βρετανικών-only λέξεων
        for (let britishWord in britishOnly) {
            const regex = new RegExp(`\\b${britishWord}\\b(?!<\/span>)`, 'gi');
            translation = translation.replace(regex, `<span class="highlight">${britishOnly[britishWord]}</span>`);
        }

        // αντικατάσταση τίτλων
        for (let [britishTitle, americanTitle] of Object.entries(britishToAmericanTitles)) {
            const regex = new RegExp(`\\b${britishTitle}\\b`, 'gi');
            translation = translation.replace(regex, (match) => {
                return `<span class="highlight">${capitalizeFirstLetter(americanTitle)}</span>`;
            });
        }

        translation = this.convertTimeToAmerican(translation);

        if (translation === text) {
            return "Everything looks good to me!";
        }

        return translation;
    }

    convertTimeToBritish(text) {
        return text.replace(/\b(\d{1,2}):(\d{2})\b/g, (match, p1, p2) => {
            return `<span class="highlight">${p1}.${p2}</span>`;
        });
    }

    convertTimeToAmerican(text) {
        return text.replace(/\b(\d{1,2})\.(\d{2})\b/g, (match, p1, p2) => {
            return `<span class="highlight">${p1}:${p2}</span>`;
        });
    }
}

module.exports = Translator;