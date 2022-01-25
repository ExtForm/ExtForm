function handle_getform(params) {
  let formName = params.form[0];
  let formId = getProperty('extform_form_' + formName);
  if(formId == null) throw new Error(getTranslation('web.getForm.unknownForm', formName));

  let token = newToken(formId);
  let result = JSON.parse(getProperty(Utilities.formatString('extform_form_%s_getform', formId)));
  result['token'] = token;
  return JSON.stringify(result);
}

/**
 * Makes new token
 * 
 * @param {String} formId Id of called form
 * @returns UUID-based token
 */
function newToken(formId) {
  let token = Utilities.getUuid();
  putCache('extform_token_' + token, formId);
  return token;
}