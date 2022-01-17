function setup(spreadsheet,name) {

  if(spreadsheet.getSheetByName(name) == undefined) {
    //throw new Error(Utilities.formatString('이미 외부 설문지 목록이 존재합니다. "%s" 시트를 삭제하거나 이름을 변경하고 다시 시도해보세요.', SPREADSHEET_NAME));

    let sheet = spreadsheet.insertSheet(name);
    sheet.getRange(1,1).setValue('About: https://github.com/HURDOO/ExtForm');
    sheet.getRange(2,1).setValue('Status: 🔄 creating form list');
    sheet.getRange(3,1).setValue('---------------------------------');
    sheet.getRange(4,1).setValue('Identifier');
    sheet.getRange(4,2).setValue('Form url');
    sheet.getRange(4,3).setValue('Title');
    sheet.getRange(4,4).setValue('Description');
    sheet.getRange(5,1).setValue('---------------------------------');
  }

  setProperty('extform_spreadsheet_id', spreadsheet.getId());
  setProperty('extform_spreadsheet_name', name);

  reloadMenu();
  setStatus('✅ Done!');
}

function setStatus(str) {
  SpreadsheetApp.openById(getProperty('extform_spreadsheet_id')).getSheetByName(getProperty('extform_spreadsheet_name')).getRange(2,1).setValue('Current Status: ' + str);
}

function reloadMenu() {

  setStatus('🔄 Resetting menu');
  let spreadsheet = SpreadsheetApp.openById(getProperty('extform_spreadsheet_id'));
  let sheet = spreadsheet.getSheetByName(getProperty('extform_spreadsheet_name'));

  let menus = [{name : 'Save Form List', functionName: 'ExtForm.reloadMenu'},null];
  let forms = reloadFormList(sheet);
  for(let i=0;i<forms.length;i++) {
    let name = forms[i].name;
    let id = forms[i].id;

    setStatus('🔄 Adding forms to menu : ' + name);
    
    menus.push({name : Utilities.formatString('Reload: %s', name), functionName : Utilities.formatString('ExtForm.reloadForm_%d', i)});
  }

  spreadsheet.updateMenu('⚙ Form Setting', menus);
  setStatus('✅ Done!');
}

function reloadFormList(sheet) { //  = SpreadsheetApp.openById('').getSheetByName('')

  setStatus('🔄 Reloading Form List');
  let forms = [];
  let formlist = [];
  for(let i=6;;i++) {
    let name = sheet.getRange(i,1).getValue();
    if(name == '') break;
    setStatus('🔄 Loading Form : ' + name);

    let url = sheet.getRange(i,2).getValue();
    let id = FormApp.openByUrl(url).getId();

    let title = sheet.getRange(i,3).getValue();
    let description = sheet.getRange(i,4).getValue();

    formlist.push({name : name, title : title, description : description});
    forms.push({name : name, id : id});
    setProperty(Utilities.formatString('extform_form_%s', name), id);
    setProperty(Utilities.formatString('extform_form_%s', id), name);
    reloadFormItems(id);
  }
  setProperty('extform_forms',JSON.stringify(forms));
  setProperty('extform_formlist',JSON.stringify(formlist));
  
  return forms;
}

function reloadForm(num) {
  reloadFormItems(JSON.parse(getProperty('extform_forms'))[num]['id']);
  setStatus('✅ Done!');
}

function reloadFormItems(id) {
  setStatus('🔄 Loading Form : ' + getProperty(Utilities.formatString('extform_form_%s', id)));
  setProperty(Utilities.formatString('extform_form_%s_getform', id), getItemList(FormApp.openById(id)));
}
