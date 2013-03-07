/* Initializing BEM Namespace. */
var BEM = BEM || {};

/**
 * Method to extend the class with subclass.
 * @method extend
 * @access public
 * @param object child
 * @return object
 */
var extend = function(child) {
  var base = this;

  if(child) {
    for(var prop in child)  {
      base[prop] = child[prop];
    }

    for(var prop in child)  {
      base.prototype[prop] = child[prop];
    }
  }

  return base;
}; 

/**
 * Module to represent single data with respected to the user suggested
 * schema. Also maintain data operations.
 * @namespace BEM
 * @module Model
 */
var Model = BEM.Model = function()  {

  /* Schema of the model. */
  this.schema = this.schema || {};

  /* Object to keep data. */
  this.data = {};
};

/* Attaching extend capacity to Model. */
Model.extend = extend;

/* Extending Model class adding common methods to prototype. */
BEM.Model.extend({

  /**
   * Method to verify the asserted data across the defined schema. if the 
   * attribute is not found in schema ignore the attribute and if its found
   * check aganist the type defined in schema. when this fails the data get
   * reseted.
   * @method _schemaVerification
   * @access private
   */
  _schemaVerification : function() {
    var clear = false;

    for(var attribute in this.data)  {
      if(!this.schema.hasOwnProperty(attribute))  {
        delete this.data[attribute];
      }else if(typeof this.data[attribute] !== this.schema[attribute])  {
        clear = true;
        break;
      }
    }  

    this.data = (clear) ? {} : this.data;
  },

  /**
   * Method to set data to the model.
   * @method set
   * @access public
   * @param object|string key
   * @param object|string value
   */
  set : function(key, value) {
    if(typeof key === 'object') {
      this.data = key;
      this._schemaVerification();
    }
  },

  /**
   * Method to get the data. if you pass '*' as key, the method will return
   * full data.
   * @method get
   * @access public
   * @param string key
   * @return object
   */
  get : function(key)  {
    if(key === '*') {
      return this.data;
    }else {
      return this.data[key];
    }
  }

});


var Collection = BEM.Collection = function()  {

};
