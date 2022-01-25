function doGet(e) {
  let result;

  try {
    result = handle(e);
  } catch (ex) {
    log("error", getTranslation('web.handle.requestError', JSON.stringify(e.parameters), ex));
    result = Utilities.formatString('{"error":"%s"}', ex);
  }

  try {
    return ContentService.createTextOutput().setContent(result).setMimeType(ContentService.MimeType.JSON);
  } catch (ex) {
    log("error", getTranslation('web.handle.responseError', JSON.stringify(e.parameters), result, ex));
    throw ex;
  }
}

function handle(e)
{
  var params = e.parameters;

  var type = params.type[0];
  log(type,JSON.stringify(params));

  let result;
  switch(type)
  {
    case "getformlist": {
      result = handle_getformlist();
      break;
    }

    case "getform":
      result = handle_getform(params);
      break;

    case "submit":
      result = handle_submit(params);
      break;

    default:
      throw new SyntaxError(getTranslation('web.handle.unknownRequestType', type));
  }

  submitLogs();
  return result;
}
