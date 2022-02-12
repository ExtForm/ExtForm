
function getTranslation_en(key) {
    return {
        // web/0_handle_request
        "web.handle.requestError": "Error while handling request;\nparameters: %s\nerror: %s",
        "web.handle.responseError": "Error while returning the response;\nparameters: %s\nresult: %s\nerror: %s",
        "web.handle.unknownRequestType": "Unknown request type '%s'",

        // web/2_getform
        "web.getForm.unknownForm": "Unknown form '%s'",
        
        // web/3_submit
        "web.submit.unknownToken": "Cannot match token '%s'. Maybe you spent too much time submitting, so the token has expired.",
        "web.submitError": "Error while submitting the form; %s",
        "web.submit.unknownItemType": "Unknown '%s' type of form item",
        
        // itemlist
        "itemlist.workingType": "ExtForm doesn't support '%s' type of form item yet",
        "itemlist.unknownType": "Unknown '%s' type of form item",

        // library
        "library.invalidLogsheetUrl": "Cannot load spreadsheet. Check if the url is valid, or you hava edit permission on the spreadsheet.\n" +
                                     "Format must be string, and it must be inside \"\".\n" +
                                     "ex. library__registerLogSheet_byUrl(\"https://docs.google.com/spreadsheets/d/1q2w3e4r/edit\");\n" +
                                     "\n%s",
        
        // lang
        "lang.unsupportedLanguage": "We don't support language '%s' yet. If you can, please help us translate! https://github.com/HURDOO/ExtForm",
        
        // log
        "logsheet.name": "ExtForm Log",
        
        // reset (Skipped)

        // spreadsheet
        "formListSheet.sheetName": "ExtForm forms",
        "formListSheet.newVersion": "🚀 Version %d is available!",
        "formListSheet.notice" : "📣 Notice: %s",
        "formListSheet.status": "Status: %s",
        "formListSheet.identifier": "Identifier",
        "formListSheet.url": "Form url",
        "formListSheet.title": "Title",
        "formListSheet.description": "Description",

        // spreadsheet menu
        "menu.name": "⚙ ExtForm",
        "menu.saveFormList": "Save Form List",
        "menu.reloadForm": "Reload: %s",
        
        // spreadsheet status
        "status.done": "✅ Done!",
        "status.menu.reload": "🔄 Reloading menu",
        "status.menu.addForm": "🔄 Adding reload button for form '%s' ",
        "status.formlist.reload": "🔄 Reloading form list",
        "status.formlist.loadForm": "🔄 Loading form '%s'",
        

    }[key];
}