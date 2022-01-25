function setLanguage(lang) {
    switch(lang) {
        case "en":
        case "kr":
            setProperty('extform_lang', lang);
            break;
        default:
            throw new Error('We don\'t support that language: ' + lang);
    }
}

function getTranslation(translationkey, ...args) {
    let lang = getProperty('extform_lang');
    /*switch (lang) {
        
    }*/
    return Utilities.formatString(getTranslation_en(translationkey), args);
}