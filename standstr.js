function standchr(instring) {
    var reg = /^[a-zA-Z\s\-]*$/;
    return instring.match(reg) ? true : false;
  }

function createTabs() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getActiveSheet();
  var rData = sh.getDataRange().getValues();
  var ui = SpreadsheetApp.getUi();
  var response = ui.alert('This script will create new sheets. Are you sure you want to continue?', ui.ButtonSet.YES_NO);
  var message = [];      
  if (response == ui.Button.YES) {
    for(var i=1, len=rData.length; i<len; i++) {
      if(rData[i][2] != null || rData[i][2] != "") {         
       try {      
          ss.insertSheet(rData[i][2]);
          ss.getSheetByName(rData[i][2]).getRange('a1').setValue('Date');
          ss.setActiveSheet(ss.getSheets()[0]);
          sh.getRange("D"+(i+1)).setValue(new Date());
       } catch(e) {
          message.push("row " + (i+1));        
         }    
       }
     }
     ss.toast("These sheets allready exist: " + message);
     ss.setActiveSheet(ss.getSheets()[0]);
   } else {
      return;
   }
}

function replaceSpace(text, cell) {
  if (cell=="") {
    cellValue = "";
  } else {
    cellValue = "_" + cell;
  }  
  reg = /[()]/g;
  if (!text.match(reg)) {
    textTrimmed = text.trim();
  } else {
    textTrimmed = text.trim().substr(0, text.search(reg)-1);  
  }                                             
  return textTrimmed.toUpperCase().replace("OF ","").replace("THE ","").replace(" &", "").replace(/ /g, "_").concat(cellValue);  
}
