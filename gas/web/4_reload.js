function handle_reload(params) {
    if ('form' in params) {
        let formName = params.form[0];
        let formId = getProperty('extform_form_' + formName);
        if(formId == null) throw new Error(getTranslation('web.reload.unknownForm', formName));

        try {
            reloadFormItems(formId);
        }
        catch (err) {
            throw new Error(getTranslation('web.reload.reloadError', formName, err));
        }
    }
    else {
        try {
            reloadMenu();
        }
        catch (err) {
            throw new Error('Error while reloading the entire sheet; ' + err);
        }
    }
    return '{"status":"success"}';
}