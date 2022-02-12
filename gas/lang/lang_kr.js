
function getTranslation_kr(key) {
    return {
        // web/0_handle_request
        "web.handle.requestError": "요청을 처리하는 중 오류가 발생했습니다;\n요청값: %s\n오류: %s",
        "web.handle.responseError": "요청을 반환하던 중 오류가 발생했습니다;\n요청값: %s\n결과: %s\n오류: %s",
        "web.handle.unknownRequestType": "'%s'는 알 수 없는 요청입니다.",

        // web/2_getform
        "web.getForm.unknownForm": "'%s'는 알 수 없는 설문지입니다.",
        
        // web/3_submit
        "web.submit.unknownToken": "'%s' 토큰을 일치시킬 수 없습니다. 제출하기까지 너무 많은 시간이 소요되어 토큰이 만료되었을 수 있습니다.",
        "web.submitError": "설문지를 제출하던 중 오류가 발생했습니다; %s",
        "web.submit.unknownItemType": "'%s'는 알 수 없는 설문지 아이템 종류입니다.",
        
        // itemlist
        "itemlist.workingType": "ExtForm은 아직 '%s' 종류의 설문지 아이템을 지원하지 않습니다.",
        "itemlist.unknownType": "'%s'는 알 수 없는 설무니 아이템 종류입니다.",

        // library
        "library.invalidLogsheetUrl": "스프레드시트를 로드할 수 없습니다. 입력한 링크가 유효한지, 또는 해당 스프레드시트에 수정 권한이 있는지 확인해주세요.\n" +
                                     "링크는 string 형식이여야 하며, \"\" 안에 있어야 합니다.\n" +
                                     "예: kr__링크의_스프레드시트에서_로그_시트_생성하기(\"https://docs.google.com/spreadsheets/d/1q2w3e4r/edit\");\n" +
                                     "\n%s",
        
        // lang
        "lang.unsupportedLanguage": "아직 '%s' 언어를 지원하지 않습니다. 번역을 도와주세요! https://github.com/HURDOO/ExtForm",
        
        // log
        "logsheet.name": "ExtForm 로그",
        
        // reset (Skipped)

        // spreadsheet
        "formListSheet.sheetName": "ExtForm 설문지 목록",
        "formListSheet.newVersion": "🚀 버전 %d을(를) 사용할 수 있습니다!",
        "formListSheet.notice" : "📣 공지: %s",
        "formListSheet.status": "상태: %s",
        "formListSheet.identifier": "이름",
        "formListSheet.url": "링크",
        "formListSheet.title": "제목",
        "formListSheet.description": "설명",

        // spreadsheet menu
        "menu.name": "⚙ ExtForm",
        "menu.saveFormList": "설문지 목록 저장",
        "menu.reloadForm": "새로고침: %s",
        
        // spreadsheet status
        "status.done": "✅ 모든 작업 완료!",
        "status.menu.reload": "🔄 메뉴 새로고침 중",
        "status.menu.addForm": "🔄 '%s' 설문지의 새로고침 버튼 추가하는 중",
        "status.formlist.reload": "🔄 설문지 목록 새로고침 중",
        "status.formlist.loadForm": "🔄 '%s' 설문지 로드하는 중",
        

    }[key];
}