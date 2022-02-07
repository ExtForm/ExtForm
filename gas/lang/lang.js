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
    if(lang == null) lang = "en";
    let translationValue;
    switch (lang) {
        case 'en':
            translationValue = getTranslation_en(translationkey);
            break;
        case 'kr':
            translationValue = getTranslation_kr(translationkey);
            break;
        default:
            translationValue = getTranslation_en(translationkey);
            break;
    }
    return Utilities.formatString(translationValue, args);
}