![ExtForm](logo.svg)
## 자신의 웹사이트에서 구글 설문지를 사용하세요
###### ![버전](https://img.shields.io/badge/버전-1.0.1-informational) ![스크립트 버전](https://img.shields.io/badge/스크립트%20버전-61-brightgreen)
---
## 다국어 번역
* [영어](README.md)

---
## 목차
1. 작성중

---
## 소개
* 웹사이트에 구글 설문지를 추가하고 싶나요? 이 프로젝트가 안성맞춤입니다!
* 자신의 사이트 스타일에 맞춰진 설문지를 확인해보세요 (당연히 제출도 가능합니다!)
* 아직 만들어둔 웹사이트가 없나요? 걱정하지 마세요, 사용하실 수 있는 템플릿을 제공해드립니다!

---
## 설치 방법
* Google Apps Script 라이브러리 ID: `1i1cewH3ZPdQRH6FVUrCQQsV_JG4oZ1-vhtt9qJqN9dJiNHJntT0B9AJN` ![스크립트 버전](https://img.shields.io/badge/스크립트--버전-61-informational)
* kr을 입력하면 사용 가능한 한국어 명령어들이 떠요.
* 자세한 설치 방법은 [위키](https://github.com/ExtForm/ExtForm/wiki)를 참고해주세요.

```js
function setup() {
    ExtForm.library__registerFormListSheet_asActiveSpreadsheet("External Form List");
    ExtForm.library__registerLogSheet_asActiveSpreadsheet("External Form Log");
}

function doGet() {
    ExtForm.doGet(e);
}
```
8. 상단 메뉴에서 `setup` 함수를 선택하고 '실행' 버튼을 눌러주세요.
9. 스크립트 실행이 끝날 때까지 기다려주세요. 다시 스프레드시트로 돌아가면 'Form List' 시트가 나타나 있어요.
10. 열릴 때 트리거를 생성하고 웹 앱을 공유하세요. 가이드는 현재 준비중이에요.

---
## 사용법
* 작성중이에요.

---
## 도움을 주신 분들
* 중학교 방송부 친구들을 위해 만들었어요!
