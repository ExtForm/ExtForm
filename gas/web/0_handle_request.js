function doGet(e) {
  let result;

  try {
    result = handle(e);
  } catch (ex) {
    log("error", Utilities.formatString('Error while handling get request;\nparameters: %s\nerror: %s', JSON.stringify(e.parameters), ex));
    result = Utilities.formatString('{"error":"%s"}', ex);
  }

  try {
    return ContentService.createTextOutput().setContent(result).setMimeType(ContentService.MimeType.JSON);
  } catch (ex) {
    log("error", Utilities.formatString('Error while returning the result;\nparameters: %s\nresult: %s\nerror: %s', JSON.stringify(e.parameters), result, ex));
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
      throw new SyntaxError("Error while handling the request; query 'type' cannot be: " + type);
  }

  submitLogs();
  return result;
}
