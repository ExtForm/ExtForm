
/* VARIABLES */

const url = 'https://script.google.com/macros/s/' + SCRIPT_KEY + '/exec';

let div = document.getElementById('extform');
let token;
let forms = [];
let values = [];

/* HTML LOAD FUNCTIONS */

// loading
const HTML_LOADING = '<div id="loading"><i class="fas fa-spinner fa-3x fa-spin"></i><p>' + MSG.LOADING + '</p></div>';
function showLoading(maxTime) {
    appendHtml(HTML_LOADING.replace('$0',maxTime));
    putHtml();
}

// getFormList
const HTML_FORMLIST_START = '<header><h1>' + MSG.LIST_TITLE + '</h1><p>' + MSG.LIST_DESCRIPTION + '</p></header><section class="tiles">';
const HTML_FORMLIST_FORM = '<article class="style{0}"><span class="image"><img src="images/pic0{0}.jpg" alt="" /></span><a href="#" onclick="showForm({1});return false;"><h2>{2}</h2><div class="content"><p>{3}</p></div></a></article>';
const HTML_FORMLIST_URL = '<article class="style{0}"><span class="image"><img src="images/pic0{0}.jpg" alt="" /></span><a href="{1}" target="_blank"><h2>{2}</h2><div class="content"><p>{3}</p></div></a></article>';
const HTML_FORMLIST_END = '</section>';
function showFormList() {
    clean();
    showLoading(5);
    request('?type=getformlist', function(data) {
        appendHtml(HTML_FORMLIST_START);
        for(let i=0;i<data.length;i++) {
            let type = data[i].type;
            let title = data[i].title;
            let description = data[i].description;
            switch(type) {
                case 'url': {
                    let url = data[i].url;

                    appendHtml(String.format(HTML_FORMLIST_URL, (i%6)+1, url, title, description));
                    break;
                }
                case 'form':
                default:
                {
                    let name = data[i].name;

                    appendHtml(String.format(HTML_FORMLIST_FORM, (i%6)+1, i, title, description));
                    forms.push(name);
                    break;
                }
            }
        }
        appendHtml(HTML_FORMLIST_END);
        putHtml();
    });
}

// getForm
const HTML_FORM_START = '<form id="form">';
const HTML_FORM_END = '</form>';
function showForm(num) {
    let name = forms[num];
    showLoading(5);
    request('?type=getform&form=' + name, function(data) {
        appendHtml(HTML_FORM_START);
        handleFormData(data);
        appendHtml(HTML_FORM_END);
        putHtml();
        document.getElementById('form').addEventListener('submit', function(e) {
            e.preventDefault();
            doSubmit();
        });
    });
}

// submit
const HTML_SUBMIT_RECAPTCHA = '<div id="recaptcha"></div>';
function doSubmit() {
    document.getElementById('submit').style.display = 'none';
    div.insertAdjacentHTML('beforeend', HTML_SUBMIT_RECAPTCHA);

    let link = genSubmitUrl();
    console.log(link);
    request(link, function(data) {
        console.log(data);
        proceedSubmit();
    });
    
    grecaptcha.render('recaptcha', {
        'sitekey' : RECAPTCHA_SITEKEY,
        'callback' : recaptchaCallback
    });
}

function recaptchaCallback() {
    setTimeout(function() {
        showLoading(10);
        proceedSubmit();
    }, 1000, 10);
}

let showSubmitSucceedAlert = false;
function proceedSubmit() {
    if(!showSubmitSucceedAlert) showSubmitSucceedAlert = true;
    else {
        alert(MSG.SUBMIT_SUCCESS);
        clean();
        showFormList();
    }
}

function clean() {
    token = '';
    showSubmitSucceedAlert = false;
    forms = [];
    values = [];
}












/* LIBRARY */

function request(param,callback) {
    $.ajax({
        url: encodeURI(url + param),
        method: "GET",
        crossDomain: true,
        success: function(data) {
            if(data.error != null) {
                console.log(data.error);
                alert(MSG.ERROR + "\n\n" + data.error);
                location.reload();
            }
            else {
                console.log(data);
                callback(data);
            }
        },
        error: function(err) {
            console.log(err);
            alert(MSG.ERROR + "\n\n" + data.error);
            //location.reload();
        }
    });
}

let html = '';
function appendHtml(str) {
    html += str;
}
function putHtml() {
    while(div.firstChild) {
        div.removeChild(div.lastChild);
    }
    div.insertAdjacentHTML('beforeend', html);
    html = '';
}

String.format = function() {
    let args = arguments;
    return args[0].replace(/{(\d+)}/g, function(match, num) {
        num = Number(num) + 1;
        return typeof(args[num]) != undefined ? args[num] : match;
    });
}

String.prototype.md = function() {
    return markdown(this);
}

function markdown(str) {
    return str
        .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
        .replace(/__(.+?)__/g, "<u>$1</u>")
        .replace(/~~(.+?)~~/g, "<del>$1</del>")
        .replace(/_(.+?)_/g, "<i>$1</i>")
        .replace(/\*(.+?)\*/g, "<i>$1</i>");
}














/* RUN */

showFormList();

if (window.document.documentMode) {
    alert(MSG.INTERNET_EXPLORER);
}















/* FORM ITEM HANDLE */

function handleFormData(data) {
    token = data.token;

    const title = data.title;
    const description = data.description;
    appendHtml('<h1>' + title.md() + "</h1>");
    if(description != undefined && description != "")
    {
        appendHtml('<ul>');
        const des = description.split('\n');
        for(let i=0;i<des.length;i++) {
            appendHtml('<li>' + des[i].md() + "</li>");
        }
        appendHtml('</ul><br/><br/>');
    }

    const list = data.items;
    for(let i=0;i<list.length;i++) {
        const item = list[i];
        putItem(item);
    }
    appendHtml(String.format('<input id="submit" type="submit" value="{0}" />', MSG.SUBMIT));
    console.log(values);
}

function putItem(item) {
    const title = item.title;
    const helpText = item.helpText;
    const id = item.id;
    const type = item.type;
    const extra = item.extra;

    switch(type) {
        case "MULTIPLE_CHOICE": {
            const choices = extra.choices;
            const required = extra.required;

            appendHtml(String.format('<label style="font-size: 120%">{0}{1}</label>', title.md(), !required ? ' (' + MSG.OPTIONAL + ')' : ''));
            if(helpText != undefined) appendHtml(String.format('<label>{0}</label>', helpText));
            for(let i=0;i<choices.length;i++)
            {
                const choice = choices[i];
                const value = choice.value;
                appendHtml(String.format('<input type="radio" id="{0}_{1}" name="{0}" value="{2}" {3}/>', id, i, value, required ? 'required' : ''));
                appendHtml(String.format('<label for="{0}_{1}">{2}</label>', id, i, value.md()));

                //@TODO: extra.hasOtherOption
            }

            values.push({id : id, type : type});
            break;
        }
        case "LIST": {
            const choices = extra.choices;
            const required = extra.required;
            appendHtml(String.format('<label style="font-size: 120%">{0}{1}</label>', title.md(), !required ? ' (' + MSG.OPTIONAL + ')' : ''));
            if(helpText != undefined) appendHtml(String.format('<label>{0}</label>', helpText));
            
            appendHtml(String.format('<select id="{0}" {1}>', id, required ? 'required' : ''));
            appendHtml(String.format('<option value="" required selected disabled>{0}</option>', MSG.CHOICE));
            for(let i=0;i<choices.length;i++)
            {
                const choice = choices[i];
                const value = choice.value;
                appendHtml(String.format('<option value="{0}">{1}</option>', value, value.md()));
            }
            appendHtml(String.format('</select>'));
            
            values.push({id : id, type : type});
            break;
        }
        case "CHECKBOX": {
            const choices = extra.choices;
            const required = extra.required;
            appendHtml(String.format('<label style="font-size: 120%">{0}{1}</label>', title.md(), !required ? ' (' + MSG.OPTIONAL + ')' : ''));
            if(helpText != undefined) appendHtml(String.format('<label>{0}</label>', helpText));

            for(let i=0;i<choices.length;i++)
            {
                const choice = choices[i];
                const value = choice.value;
                appendHtml(String.format('<input type="checkbox" id="{0}_{1}" name="{0}" value="{2}" {3}/>', id, i, value, required ? 'required' : ''));
                appendHtml(String.format('<label for="{0}_{1}">{2}</label>', id, i, value.md()));
            }
            
            values.push({id : id, type : type});
            break;
        }
        case "TEXT": {
            const required = extra.required;
            appendHtml(String.format('<label style="font-size: 120%">{0}{1}</label>', title.md(), !required ? ' (' + MSG.OPTIONAL + ')' : ''));
            if(helpText != undefined) appendHtml(String.format('<label>{0}</label>', helpText));
            appendHtml(String.format('<input type="text" id="{0}" placeholder="Text input" {1}/>', id, required ? 'required' : ''));
            
            values.push({id : id, type : type});
            break;
        }
        case "PARAGRAPH_TEXT": {
            const required = extra.required;
            appendHtml(String.format('<label style="font-size: 120%">{0}{1}</label>', title.md(), !required ? ' (' + MSG.OPTIONAL + ')' : ''));
            if(helpText != undefined) appendHtml(String.format('<label>{0}</label>', helpText));
            appendHtml(String.format('<textarea id="{0}" placeholder="Text input" {1}></textarea>', id, required ? 'required' : ''));
            
            values.push({id : id, type : type});
            break;
        }
        case "SECTION_HEADER": {
            appendHtml(String.format('<label style="font-size: 140%">{0}</label>', title.md()));
            if(helpText != undefined) appendHtml(String.format('<label>{0}</label>', helpText));
            
            values.push({id : id, type : type});
            break;
        }
        case "SCALE": {
            const required = extra.required;
            const lowerBound = extra.lowerBound;
            const upperBound = extra.upperBound;
            const leftLabel = extra.leftLabel;
            const rightLabel = extra.rightLabel;

            const width = 50;
            
            appendHtml(String.format('<label style="font-size: 120%">{0}{1}</label>', title.md(), !required ? ' (' + MSG.OPTIONAL + ')' : ''));
            if(helpText != undefined) appendHtml(String.format('<label>{0}</label>', helpText));
            appendHtml(String.format('<input type="range" id="{0}" min="{1}" max="{2}" value="-1" step="1" list="mark_{0}" style="appearance: auto; width: {3}%" {4}/>',
                id, lowerBound, upperBound, width, required ? 'required' : ''))
            
            appendHtml(String.format('<datalist id="mark_{0}" style="display: flex; width: {1}%; justify-content: space-between;"">', id, width));
            for(var i=lowerBound;i<=upperBound;i++) {
                appendHtml(String.format('<option value="{0}" {1}></option>', i,
                    i == lowerBound || i == upperBound ? "label=\"" + 
                        (i == lowerBound ? leftLabel.md() : rightLabel.md()) + "\""
                    : ""));
            }
            appendHtml(String.format('</datalist>'));
            
            values.push({id : id, type : type});
            break;
        }
        case "GRID": {
            const required = extra.required;
            const rows = extra.rows;
            const columns = extra.columns;

            appendHtml(String.format('<label style="font-size: 120%">{0}{1}</label>', title.md(), !required ? ' (' + MSG.OPTIONAL + ')' : ''));
            if(helpText != undefined) appendHtml(String.format('<label>{0}</label>', helpText));

            appendHtml(String.format('<table><th>'));
            for(var i=0;i<columns.length;i++) {
                appendHtml(String.format('<td><label>{0}</label></td>', columns[i].md()));
            }
            appendHtml(String.format('</th>'));

            for(var i=0;i<rows.length;i++) {
                appendHtml(String.format('<tr><td><label>{0}</label></td>', rows[i].md()));
                for(var j=0;j<columns.length;j++) {
                    appendHtml(String.format('<td><input type="radio" id="{0}_{1}_{2}" name="{0}_{1}" value="{3}" {4}/><label for="{0}_{1}_{2}"></td>', id, i, j, columns[j],
                        required ? 'required' : ''));
                }
                appendHtml(String.format('</tr>'));
            }
            appendHtml(String.format('</table>'));
            
            values.push({id : id, type : type, rowLength : rows.length});
            break;
        }
        case "CHECKBOX_GRID": {
            const required = extra.required;
            const rows = extra.rows;
            const columns = extra.columns;

            appendHtml(String.format('<label style="font-size: 120%">{0}{1}</label>', title.md(), !required ? ' (' + MSG.OPTIONAL + ')' : ''));
            if(helpText != undefined) appendHtml(String.format('<label>{0}</label>', helpText));

            appendHtml(String.format('<table><th>'));
            for(var i=0;i<columns.length;i++) {
                appendHtml(String.format('<td><label>{0}</label></td>', columns[i].md()));
            }
            appendHtml(String.format('</th>'));

            for(var i=0;i<rows.length;i++) {
                appendHtml(String.format('<tr><td><label>{0}</label></td>', rows[i].md()));
                for(var j=0;j<columns.length;j++) {
                    appendHtml(String.format('<td><input type="checkbox" id="{0}_{1}_{2}" name="{0}_{1}" value="{3}" {4}/><label for="{0}_{1}_{2}"></td>', id, i, j, columns[j],
                        required ? 'required' : ''));
                }
                appendHtml(String.format('</tr>'));
            }
            appendHtml(String.format('</table>'));
            
            values.push({id : id, type : type, rows : rows});
            break;
        }
        case "DATE": {
            const required = extra.required;
            const includesYear = extra.includesYear;

            appendHtml(String.format('<label style="font-size: 120%">{0}{1}</label>', title.md(), !required ? ' (' + MSG.OPTIONAL + ')' : ''));
            if(helpText != undefined) appendHtml(String.format('<label>{0}</label>', helpText));

            appendHtml(String.format('<input type="date" id="{0}" name="{0}" {1} {2}/>', id,
                includesYear ? 'min="2021-01-01" max="2021-12-31"' : '',
                required ? 'required' : ''));
            
            appendHtml(String.format('<br/>'));

            values.push({id : id, type : type});
            break;
        }
        case "DATETIME": {
            const required = extra.required;
            const includesYear = extra.includesYear;

            appendHtml(String.format('<label style="font-size: 120%">{0}{1}</label>', title.md(), !required ? ' (' + MSG.OPTIONAL + ')' : ''));
            if(helpText != undefined) appendHtml(String.format('<label>{0}</label>', helpText));

            appendHtml(String.format('<input type="datetime-local" id="{0}" name="{0}" {1} {2}/>', id,
                includesYear ? 'min="2022-01-01" max="2022-12-31"' : '',
                required ? 'required' : ''));
            appendHtml(String.format('<br/>'));

            values.push({id : id, type : type});
            break;
        }
        case "TIME": {
            const required = extra.required;

            appendHtml(String.format('<label style="font-size: 120%">{0}{1}</label>', title.md(), !required ? ' (' + MSG.OPTIONAL + ')' : ''));
            if(helpText != undefined) appendHtml(String.format('<label>{0}</label>', helpText));

            appendHtml(String.format('<input type="time" id="{0}" name="{0}" step="1" {1}/>', id, required ? 'required' : ''));
            appendHtml(String.format('<br/>'));

            values.push({id : id, type : type});
            break;
        }
        case "DURATION": {
            const required = extra.required;

            appendHtml(String.format('<label style="font-size: 120%">{0}{1}</label>', title.md(), !required ? ' (' + MSG.OPTIONAL + ')' : ''));
            if(helpText != undefined) appendHtml(String.format('<label>{0}</label>', helpText));

            appendHtml(String.format('<input type="time" id="{0}" name="{0}" {1}/>', id, required ? 'required' : ''));
            appendHtml(String.format('<br/>'));

            values.push({id : id, type : type});
            break;
        }
        case "IMAGE": {
            const image = extra.image;
            const imageType = extra.imageType;
            const alignment = extra.alignment;
            
            appendHtml(String.format('<label style="font-size: 120%">{0}</label>', title.md()));
            if(helpText != undefined) appendHtml(String.format('<label>{0}</label>', helpText));

            appendHtml(String.format('<div style="display: flex; justify-content: {0}">', alignment));
            appendHtml(String.format('<img src="{0}" loading="lazy" style="width: 70%;"/>', 
                String.format('data:{0};base64,{1}', imageType, image)));
            appendHtml(String.format('</div><br/>'));

            values.push({id : id, type : type});
            break;
        }
        default: {
            console.log(item);
            throw new Error('no type: ' + type);
        }
    }
    appendHtml('<br/><hr/>');
}

function genSubmitUrl(){
    link = "?type=submit&token=" + token;
    for(let i=0;i<values.length;i++)
    {
        let value = values[i];
        console.log(i);

        let id = value.id;
        let type = value.type;

        console.log(id);
        console.log(type);

        switch(type)
        {
            case "MULTIPLE_CHOICE":
            case "CHECKBOX":{
                let elements = document.querySelectorAll(String.format('input[name="{0}"]:checked', id));
                for(let j=0;j<elements.length;j++) {
                    link += String.format('&{0}={1}', id, encodeURIComponent(elements[j].value));
                }
                if(elements.length == 0) link += String.format('&{0}=', id);
                break;
            }
            case "DATE":
            case "DATETIME":
            case "TIME":
            case "DURATION":
            case "LIST":
            case "TEXT": 
            case "PARAGRAPH_TEXT":
            case "SCALE": {
                let element = document.getElementById(id);
                link += String.format('&{0}={1}', id, encodeURIComponent(element.value));
                break;
            }
            case "GRID": {
                for(let j=0;j<value.rowLength;j++) {
                    let elements = document.querySelectorAll(String.format('input[name="{0}_{1}"]:checked', id, j));
                    for(let k=0;k<elements.length;k++) {
                        link += String.format('&{0}={1}', id, encodeURIComponent(elements[k].value));
                    }
                }
                break;
            }
            case "CHECKBOX_GRID": {
                let rows = value.rows;
                let result = [];
                for(let j=0;j<rows.length;j++) {
                    let arr = [];
                    let elements = document.querySelectorAll(String.format('input[name="{0}_{1}"]:checked', id, j));
                    for(let k=0;k<elements.length;k++) {
                        arr.push(elements[k].value);
                    }
                    result.push(arr);
                }
                link += String.format('&{0}={1}', id, encodeURIComponent(JSON.stringify(result)));
                break;
            }
            case "SECTION_HEADER": 
            case "IMAGE":
                break;
            default: {
                throw new Error("no support for " + type + i);
            }
        }
    }
    /*try {
        return link.replaceAll(" ","%20").replaceAll("\n","%0D%0A");
    } catch (err) { // internet explorer
        return link.replace(/" "/gi,"%20").replace(/"\n"/gi,"%0D%0A");
    }*/
    return link;
}
