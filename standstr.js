function standchr(instring) {
    var reg = /^[a-zA-Z\s\-]*$/;
    return instring.match(reg) ? true : false;
  } 
