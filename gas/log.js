function getLogSheet() {
  return SpreadsheetApp
    .openById(getProperty('extform_logsheet_spreadsheetId'))
    .getSheetByName(getProperty('extform_logsheet_sheetName'));
}

/**
 * Register new logsheet
 * @param {SpreadsheetApp.Spreadsheet} spreadsheet spreadsheet to save as logsheet
 */
function setLogSheet(spreadsheet) {

  let name = getTranslation('logsheet.name');

  if(spreadsheet.getSheetByName(name) == undefined) {
    spreadsheet.insertSheet(name);
  }
  setProperty('extform_logsheet_spreadsheetId', spreadsheet.getId());
  setProperty('extform_logsheet_sheetName', name);
}

/* DIRECT LOG */

/**
 * Logs directly to logsheet.
 * May cause delay/lag if used too many times, use `addLog()` instead.
 * @param {String} type Log type
 * @param {String} str Log message
 */
function log(type,str) {
  getLogSheet().appendRow([new Date().toLocaleString(),type,str]);
}

/* MANY LOGS */
let logs = [];

/**
 * Add log to queue.
 * You can remove delay produced in calling `log()` many times.
 * Don't forget to call `submitLogs()` to submit logs.
 * @param {String} type Log type
 * @param {String} str Log message
 */
function addLog(type,str) {
  logs.push([new Date().toLocaleString(),type,str]);
}

/**
 * Submit all logs in queue.
 * You may add log to the queue with `addLog()`
 */
function submitLogs() {
  if(logs.length == 0) return;
  let sheet = getLogSheet();
  let lastrow = sheet.getLastRow();
  sheet.getRange(lastrow+1,1,logs.length,3).setValues(logs);
  logs = [];
}