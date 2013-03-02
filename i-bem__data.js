/**
 * Module to add data support to bem blocks.
 */
var DATA = BEM.DATA = function()  {
  this.schema = {};

  this.data = {};
};

DATA.prototype._schemaVerification = function() {
  for(var attribute in this.data)  {
    if(!this.schema.hasOwnProperty(attribute))  {
      delete this.data[attribute]
    }
  }  
};

DATA.prototype.set = function(key, value) {
  if(typeof key === 'object') {
    this.data = key;
    this._schemaVerification();
  }
};