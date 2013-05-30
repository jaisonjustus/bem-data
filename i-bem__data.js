/* Initializing BEM Namespace. */
var BEM = BEM || {};

/**
 * Method to extend the class with subclass.
 * @method extend
 * @access public
 * @param object child
 * @param object parent
 * @return object
 */
var extend = function(child, parent) {
  parent = (parent) ? parent : this;
  
  var mutant = function() { parent.apply(this,arguments); },
      p = parent.prototype;

  for(var prop in parent.prototype)  { 
    mutant.prototype[prop] = parent.prototype[prop];
  }

  if(child) {
    for(var prop in child)  {
      mutant.prototype[prop] = child[prop];
    }
  }

  return mutant;
}; 

/**
 * Module to represent single data with respected to the user suggested
 * schema. Also maintain data operations.
 * @namespace BEM
 * @module Model
 */
var Model = BEM.Model = function()  {

  /* Schema of the model. */
  this.schema = {};

  /* Data transformation with respect to Schema. */
  this.strict = true;

  /* Object to keep current selected data. */
  this.datum = {};

  /* Array of datum. */
  this.data = [];

  this.initialize.apply(this, arguments);
};

/* Extending Model class adding common methods to prototype. */
Model = BEM.Model = extend({

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
      this.datum = key;
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
      return this.datum;
    }else {
      return this.datum[key];
    }
  }
}, BEM.Model);

Model.extend = BEM.Model.extend = extend;