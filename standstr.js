function standchr(instring) {
    var reg = /^[a-zA-Z\s\-]*$/;
    return instring.match(reg) ? true : false;
  }

function replaceSpace(text, cell) {
  cellValue = "_" + cell.toUpperCase();
  reg = /[()]/g;
  if (!text.match(reg)) {
    textTrimmed = text;
  } else {
    textTrimmed = text.substr(0, text.search(reg)-1);  
  }                                             
  return textTrimmed.toUpperCase().replace("OF ","").replace("THE ","").replace(/ /g, "_").concat(cellValue);  
}
