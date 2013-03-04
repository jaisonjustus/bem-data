var BEM = BEM || {};

var SYNC = BEM.SYNC = function()  {
  
  this.xhr = '';

  this.params = {
    type : 'POST',
    dataType : 'json',
    url : '',
    contentType : 'application/json',
    data : {}
  };

}