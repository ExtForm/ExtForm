/**
 * Make new 'Form List' sheet into current spreadsheet, which can manage forms.
 * (User needs edit permission to the spreadsheet)
 * 
 * ex. ```library__registerFormListSheet_asCurrentSpreadsheet(name);```
 * 
 * @params {string} Name of sheet
 */
function library__registerFormListSheet_asActiveSpreadsheet(name) {
  setup(SpreadsheetApp.getActiveSpreadsheet(), name);
}

/**
 * Register spreadsheet to write system logs.
 * Current spreadsheet will be automatically detected and registered.
 * (User needs edit permission to the spreadsheet)
 * 
 * ex. ```library__registerLogSheet_asActiveSpreadsheet();```
 * 
 * Note. You may register external spreadsheet with `library__registerLogSheet_byUrl`.
 */
function library__registerLogSheet_asActiveSpreadsheet(name) {
  setLogSheet(SpreadsheetApp.getActiveSpreadsheet(),name);
}

/**
 * Register spreadsheet to write system logs.
 * Spreadsheet of written url will be used as log sheet.
 * (User needs edit permission to the spreadsheet)
 * 
 * ex. ```library__registerLogSheet_byUrl("https://docs.google.com/spreadsheets/d/1q2w3e4r/edit");```
 * 
 * Note. You may automatically detect and register current spreadsheet with `library__registerLogSheet_asActiveSpreadsheet`.
 * 
 * @param {string} url The url of spreadsheet
 * @param {string} name The name of log sheet
 */
function library__registerLogSheet_byUrl(url,name) {
  try {
    setLogSheet(SpreadsheetApp.openByUrl(url),name);
  } catch (err) {
    throw new Error(Utilities.formatString('%s\n%s\n%s\n\n%s',
      'Cannot load spreadsheet. Check if the url is valid, or you have edit permission on the spreadsheet.',
      'Format must be string, and it must be inside "".',
      'ex. library__registerLogSheet_byUrl("https://docs.google.com/spreadsheets/d/1q2w3e4r/edit");',
      err));
  }
}

/**
 * Delete all responses from every registered forms.
 * Useful when you use with time-based trigger, if you need to reset the responses per period.
 * (User needs edit permission to every forms)
 * 
 * ex. ```library__resetAllResponses();```
 */
function library__resetAllResponses() {
  reset();
}