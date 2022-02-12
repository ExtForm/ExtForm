function setup(spreadsheet) {

  let name = getTranslation('formListSheet.sheetName')

  let sheet = spreadsheet.getSheetByName(name);
  
  if(sheet == undefined) {
    //throw new Error(Utilities.formatString('이미 외부 설문지 목록이 존재합니다. "%s" 시트를 삭제하거나 이름을 변경하고 다시 시도해보세요.', SPREADSHEET_NAME));
    sheet = makeNewSheet(name);
  }

  handleInfo(sheet);

  setProperty('extform_formlistsheet_spreadsheetId', spreadsheet.getId());
  setProperty('extform_formlistsheet_sheetName', name);

  reloadMenu();
  setStatus(getTranslation('status.done'));
}

function makeNewSheet(name) {
  let sheet = spreadsheet.insertSheet(name,0);
  
  sheet.getRange(1,1).setRichTextValue(
    SpreadsheetApp.newRichTextValue()
      .setText(Utilities.formatString('ExtForm (%d)', getVersion()))
      .setLinkUrl(0, 7, 'https://github.com/HURDOO/ExtForm')
      .setTextStyle(0, 7, SpreadsheetApp.newTextStyle().setBold(true).build())
      .build()
  );

  sheet.getRange(2,1).setValue(getTranslation('formListSheet.status', getTranslation('status.menu.reload')));
  sheet.getRange(3,1).setValue('---------------------------------');
  sheet.getRange(4,1).setValue(getTranslation('formListSheet.identifier'));
  sheet.getRange(4,2).setValue(getTranslation('formListSheet.url'));
  sheet.getRange(4,3).setValue(getTranslation('formListSheet.title'));
  sheet.getRange(4,4).setValue(getTranslation('formListSheet.description'));
  sheet.getRange(5,1).setValue('---------------------------------');

  return sheet;
}

function handleInfo(sheet) {
  let info = getInfo();
  let content = '';

  let latest = info['version'];
  if(latest != getVersion()) {
    content = getTranslation('formListSheet.newVersion', latest);
  }

  let notice = info['notice'];
  if(notice != '') {
    if(content != '') content += ' ';
    content += getTranslation('formListSheet.notice', notice);
  }

  sheet.getRange(1,2).setValue(content);
}

function getInfo() {
  let response = UrlFetchApp.fetch('http://info.extform.kro.kr');
  let code = response.getResponseCode();
  let content = response.getContentText();
  log('info',Utilities.formatString("%d / %s", code, content));
  return JSON.parse(content);
}

function getVersion() {
  return 62;
}

function setStatus(str) {
  SpreadsheetApp.openById(getProperty('extform_formlistsheet_spreadsheetId')).getSheetByName(getProperty('extform_formlistsheet_sheetName')).getRange(2,1).setValue(getTranslation('formListSheet.status', str));
}

function reloadMenu() {

  setStatus(getTranslation('status.menu.reload'));
  let spreadsheet = SpreadsheetApp.openById(getProperty('extform_formlistsheet_spreadsheetId'));
  let sheet = spreadsheet.getSheetByName(getProperty('extform_formlistsheet_sheetName'));

  let menus = [{name : getTranslation('menu.saveFormList'), functionName: 'ExtForm.reloadMenu'},null];
  let forms = reloadFormList(sheet);
  for(let i=0;i<forms.length;i++) {
    let name = forms[i].name;
    setStatus(getTranslation('status.menu.addForm', name));
    
    menus.push({name : Utilities.formatString(getTranslation('menu.reloadForm', name)), functionName : Utilities.formatString('ExtForm.reloadForm_%d', i)});
  }

  spreadsheet.updateMenu(getTranslation('menu.name'), menus);
  setStatus(getTranslation('status.done'));
}

function reloadFormList(sheet) { //  = SpreadsheetApp.openById('').getSheetByName('')

  setStatus(getTranslation('status.menu.reload'));
  let forms = [];
  let formlist = [];
  for(let i=6;;i++) {
    let name = sheet.getRange(i,1).getValue();
    if(name == '') break;
    setStatus(getTranslation('status.formlist.loadForm', name));

    let url = sheet.getRange(i,2).getValue();

    let title = sheet.getRange(i,3).getValue();
    let description = sheet.getRange(i,4).getValue();

    try {
      let id = FormApp.openByUrl(url).getId();
      formlist.push({type : 'form', name : name, title : title, description : description});

      forms.push({name : name, id : id});
      setProperty(Utilities.formatString('extform_form_%s', name), id);
      setProperty(Utilities.formatString('extform_form_%s', id), name);
      reloadFormItems(id);
    } catch (err) {
      formlist.push({type : 'url', url : url, title : title, description : description});
    }
  }
  return forms;
}

function reloadForm(num) {
  reloadFormItems(JSON.parse(getProperty('extform_forms'))[num]['id']);
  setStatus(getTranslation('status.done'));
}

function reloadFormItems(id) {
  setStatus(getTranslation('status.formlist.loadForm', getProperty(Utilities.formatString('extform_form_%s', id))));
  setProperty(Utilities.formatString('extform_form_%s_getform', id), getItemList(FormApp.openById(id)));
}

/**
 * Set ui/status/log language
 * @param {String} lang language to set
 */
function setLanguage(lang) {
  setProperty('extform_lang',lang);
}
