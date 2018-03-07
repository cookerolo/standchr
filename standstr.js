function standchr(instring) {
    var reg = /^[a-zA-Z\s\-]*$/;
    return instring.match(reg) ? true : false;
  }

function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    {name: 'Create Tabs', functionName: 'createTabs'}
  ];
  spreadsheet.addMenu('Scripts', menuItems);
}

function createTabs() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getActiveSheet();
  var rData = sh.getDataRange().getValues();
  var ui = SpreadsheetApp.getUi();
  var response = ui.alert('This script will create new sheets. Are you sure you want to continue?', ui.ButtonSet.YES_NO);
  var header = [["Date", "First Name", "Last Name", "Email", "Campaign", "Phone", "Profile Link", "Country", "English Fluency"]];
  var message = [];    

   if (response == ui.Button.YES) {
     for(var i=1, len=rData.length; i<len; i++) {
       if(rData[i][2] != null || rData[i][2] != "") {   
      
        try {      
          ss.insertSheet(rData[i][2]);
          ss.getSheetByName(rData[i][2]).getRange('a1:i1').setValues(header);
          ss.setActiveSheet(ss.getSheets()[0]);
          sh.getRange("D"+(i+1)).setValue(new Date());
        } catch(e) {
          message.push(" "+rData[i][2]);        
        }    
       }
     }
     (message.length > 0) ? ss.toast("These sheets already exist: " + message, "Warning", 5) : ss.toast("All sheet were added") ;
     ss.setActiveSheet(ss.getSheets()[0]);
   } else {
      return;
   }
}

function tabName(text, cell) {
  reg = /[()]/g;
  (cell=="") ? cellValue = "" : cellValue = "_" + cell;  
  (!text.match(reg)) ? textTrimmed = text.trim() : textTrimmed = text.trim().substr(0, text.search(reg)-1);                                              
  return textTrimmed.toUpperCase().replace("OF ","").replace("THE ","").replace(" &", "").replace(/ /g, "_").concat(cellValue);  
}
