function handle_submit(params) {
  let token = params.token[0];
  let formId = getCache('extform_token_' + token);
  if(formId == null) throw new Error(getTranslation('web.submit.unknownToken', token));

  let form = FormApp.openById(formId);
  return submitForm(form,params);
}

function submitForm(form,params) {
  try {
    let response = form.createResponse();
    let items = form.getItems();
    for(var i=0;i<items.length;i++)
    {
      let item = items[i];
      let type = item.getType();
      let id = item.getId();
      let values = params[id];

      let itemResponse = submitItem(item,type,values);
      if(itemResponse != undefined) response.withItemResponse(itemResponse);
    }
    response.submit(); 
    return '{"status":"success"}';
  } catch (ex) {
    throw new Error("Error while submitting the form; " + ex);
  }
}

/**
 * Returns response data for item.
 * 
 * @param {FormApp.Item} item Form item to submit response
 * @param {FormApp.ItemType} type Item type
 * @param {String[]} values Values to submit as response
 * @returns Response data for item
 */
function submitItem(item,type,values) {

  if(values == undefined) return undefined;
  for(let i=0;i<values.length;i++) {
    values[i] = decodeURIComponent(values[i]);
  }

  switch(type) {
    case FormApp.ItemType.MULTIPLE_CHOICE: {
      return item.asMultipleChoiceItem().createResponse(values[0]);
    }
    case FormApp.ItemType.CHECKBOX: {
      return item.asCheckboxItem().createResponse(values);
    }
    case FormApp.ItemType.LIST: {
      return item.asListItem().createResponse(values[0]);
    }
    case FormApp.ItemType.TEXT: {
      return item.asTextItem().createResponse(values[0]);
    }
    case FormApp.ItemType.PARAGRAPH_TEXT: {
      return item.asParagraphTextItem().createResponse(values[0]);
    }
    case FormApp.ItemType.SCALE: {
      return item.asScaleItem().createResponse(values[0]);
    }
    case FormApp.ItemType.GRID: {
      return item.asGridItem().createResponse(values);
    }
    case FormApp.ItemType.CHECKBOX_GRID: {
      return item.asCheckboxGridItem().createResponse(JSON.parse(values[0]));
    }
    case FormApp.ItemType.DATE: {
      return item.asDateItem().createResponse(new Date(values[0]));
    }
    case FormApp.ItemType.DATETIME: {
      let date = new Date(values[0]);
      date.setUTCHours(date.getHours());
      return item.asDateTimeItem().createResponse(date);
    }
    case FormApp.ItemType.TIME: {
      let times = values[0].match(/\d\d/g);
      let hour = Number.parseInt(times[0]);
      let minute = Number.parseInt(times[1]);
    return item.asTimeItem().createResponse(hour, minute);
    }
    case FormApp.ItemType.DURATION: {
      let times = values[0].match(/\d\d/g);
      let hour = Number.parseInt(times[0]);
      let minute = Number.parseInt(times[1]);
      let second = Number.parseInt(times[2]);
      return item.asDurationItem().createResponse(hour, minute, second);
    }
    case FormApp.ItemType.SECTION_HEADER:
    case FormApp.ItemType.IMAGE:
      return undefined;
    default:
      throw new Error(getTranslation('web.submit.unknownItemType', item.getType()));
  }
}
