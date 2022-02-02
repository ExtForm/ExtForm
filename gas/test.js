function test() {
  //PropertiesService.getUserProperties().deleteAllProperties();
  Logger.log(PropertiesService.getUserProperties().getProperties());
  //doGet({'parameters' : [{'type':'getformlist'}]});
}

function testSubmit(form) {
  submitForm(form,JSON.parse('{"136314928":["<TEST>%20테스트"],"1148749992":["test.com"],"grade":["3"]}'))
}

function genHtml(form) {
  var html = "";
  for(var i=0;i<form.getItems().length;i++)
  {
    var item = form.getItems()[i];
    var index = item.getIndex();
    var type = item.getType();
    var title = item.getTitle();
    var id = item.getId();
    
    switch(type)
    {
      case FormApp.ItemType.MULTIPLE_CHOICE:
        var choices = item.asMultipleChoiceItem().getChoices();
        html += Utilities.formatString('<label>%s</label>\n', title);
        for(var j=0;j<choices.length;j++)
        {
          var value = choices[j].getValue();
          var elementId = id + "_" + j;
          html += Utilities.formatString('<input type="radio" id="%s" name="%s" value="%s"/>\n', elementId, id, value);
          html += Utilities.formatString('<label for="%s">%s</label>\n', elementId, value);
        }
        html += '<br/>\n\n';
        break;
      case FormApp.ItemType.CHECKBOX:
        var choices = item.asCheckboxItem().getChoices();
        html += Utilities.formatString('<label>%s</label>\n', title);
        for(var j=0;j<choices.length;j++)
        {
          var value = choices[j].getValue();
          var elementId = id + "_" + j;
          html += Utilities.formatString('<input type="checkbox" id="%s" name="%s" value="%s"/>\n', elementId, id, value);
          html += Utilities.formatString('<label for="%s">%s</label>\n', elementId, value);
        }
        html += '<br/>\n\n';
        break;
      case FormApp.ItemType.LIST:
        var choices = item.asListItem().getChoices();
        html += Utilities.formatString('<label>%s</label>\n', title);
        html += Utilities.formatString('<select id=%s>\n', id);
        for(var j=0;j<choices.length;j++) {
          var value = choices[j].getValue();
          html += Utilities.formatString('\t<option value="%s">%s</option>\n', value, value);
        }
        html += '</select>\n<br/>\n\n';
        break;
      case FormApp.ItemType.TEXT:
        html += Utilities.formatString('<label>%s</label>\n', title);
        html += Utilities.formatString('<input type="text" id="%s" />\n', id);
        html += '<br/>\n\n';
        break;
      case FormApp.ItemType.PARAGRAPH_TEXT:
        html += Utilities.formatString('<label>%s</label>\n', title);
        html += Utilities.formatString('<textarea id="%s"></textarea>\n', id);
        html += '<br/>\n\n';
        break;
      default:
        throw new Error("no type: " + type);
    }
  }
  Logger.log(html);
}

function genJs(form) {
  var str = "[";
  for(var i=0;i<form.getItems().length;i++) {
    if(i!=0) str += ",";
    str += '\"' + form.getItems()[i].getId() + '\"';
  }
  str += "]";
  Logger.log(str);
}


function getFormItemIds(form) {
  for(var i=0;i<form.getItems().length;i++)
  {
    var item = form.getItems()[i];
    var index = item.getIndex();
    var type = item.getType();
    var title = item.getTitle();
    var id = item.getId();

    Logger.log(Utilities.formatString("[%d | %s] %s : %s", index, type, title, id));
  }
}
