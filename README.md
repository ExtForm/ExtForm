![ExtForm](logo.svg)
# <center>Use Google Forms on your website</center>
###### <center>![version](https://img.shields.io/badge/version-1.0.0-informational) ![script-version](https://img.shields.io/badge/script--version-60-brightgreen)</center>
---
## Multi-language
* [한국어](README.kr.md) (WIP)

---
## Contents
1. WIP

---
## What is this
* Wanna embed Google Forms on your website? Check out this project!
* You may view form in your website, using your website style/css (of course, you can submit too!)
* Don't have your website yet? No need to worry, there is a sample page for you!

---
## Setup
1. Go to Google Drive and make a new SpreadSheet (or open the spreadsheet file you want).
2. On top menu, click 'Extensions' then 'Apps Script'
3. Apps script for your spreadsheet will be loaded. On the left sidebar, find 'Library' and click '+'.
4. Insert `1i1cewH3ZPdQRH6FVUrCQQsV_JG4oZ1-vhtt9qJqN9dJiNHJntT0B9AJN` as Script ID and click 'Look up'
5. Select the latest version ![script-version](https://img.shields.io/badge/script--version-60-informational)
6. Set Identifier as `ExtForm` then click 'OK'.
7. Write these codes.
```js
function setup() {
    ExtForm.library__registerFormListSheet_asActiveSpreadsheet("External Form List");
    ExtForm.library__registerLogSheet_asActiveSpreadsheet("External Form Log");
}

function doGet() {
    ExtForm.doGet(e);
}
```
8. On top menu, select `setup` function and click 'Run'.
9. Wait until the script is finished. Back to the spreadsheet, 'Form List' sheet may have appeared.
10. Add onOpen trigger & Deploy web app. Guide is currently work in progress.

---
## How to use
* Guide is currently work in progress.

---
## Credits
* To my middle school broadcasting club members, I made this for you.