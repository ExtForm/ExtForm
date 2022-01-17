function reset() {
  let date = new Date();
  let forms = JSON.parse(getProperty('extform_forms'));

  for(let i=0;i<forms.length;i++) {

    let formId = forms[i]['id'];
    let form = FormApp.openById(formId);
    let sheetId;
    try {
      sheetId = form.getDestinationId();
      form.removeDestination();
    } catch (err) {
      Logger.log('skip cleaning connected spreadsheet; ' + err);
    }

    var responses = form.getResponses();
    Logger.log('Started form ' + i + '; length: ' + responses.length);

    for(let j=0;j<responses.length;j++) {
      var response = responses[j];
      if(response == undefined)
      {
        Logger.log('Skip undefined: ' + j + ' in form ' + i);
        continue;
      }
      var time = response.getTimestamp();
      if(time.valueOf() > date.valueOf())
      {
        Logger.log(Utilities.formatString('(%d/%d) skipping all responses from here in form %d; timestamp is %s',
          j, responses.length, i, response.getTimestamp().toLocaleString()));
        break;
      }
      form.deleteResponse(response.getId());
      Logger.log(Utilities.formatString('(%d/%d) deleted %s in form %d;', j, responses.length, response.getId(), i));
    }

    try {
      form.setDestination(FormApp.DestinationType.SPREADSHEET, sheetId);
    } catch (err) {
      Logger.log('skip cleaning connected spreadsheet; ' + err);
    }
    Logger.log('Ended form ' + i);
  }
}

/*Date.prototype.getWeek = function (dowOffset) {
  // getWeek() was developed by Nick Baicoianu at MeanFreePath: http://www.meanfreepath.com

  dowOffset = typeof(dowOffset) == 'number' ? dowOffset : 0; // dowOffset이 숫자면 넣고 아니면 0
  var newYear = new Date(this.getFullYear(),0,1);
  var day = newYear.getDay() - dowOffset; //the day of week the year begins on
  day = (day >= 0 ? day : day + 7);
  var daynum = Math.floor((this.getTime() - newYear.getTime() -
    (this.getTimezoneOffset()-newYear.getTimezoneOffset())*60000)/86400000) + 1;
  var weeknum;
  //if the year starts before the middle of a week
  if(day < 4) {
    weeknum = Math.floor((daynum+day-1)/7) + 1;
    if(weeknum > 52) {
      let nYear = new Date(this.getFullYear() + 1,0,1);
      let nday = nYear.getDay() - dowOffset;
      nday = nday >= 0 ? nday : nday + 7;
      // if the next year starts before the middle of the week, it is week #1 of that year
      weeknum = nday < 4 ? 1 : 53;
    }
  }
  else {
    weeknum = Math.floor((daynum+day-1)/7);
  }
  return weeknum;
};*/