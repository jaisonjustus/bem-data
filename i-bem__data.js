/* Initializing BEM Namespace. */
var BEM = BEM || {};

/**
 * Extend the class with subclass.
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

  /* Specify the model to act as a collection of data. */
  this.collection = false;

  /* Schema of the model. */
  this.schema = null;

  /* Data transformation with respect to Schema. */
  this.strict = true;

  /* Object to keep current selected data. */
  this.datum = {};

  /* Array of datum. */
  this.data = [];

  this.id = 'id';

  this.collectionIndex = -1;

  this.url = null;

  this.initialize.apply(this, arguments);

  if(this.schema) { this._schemaVerification(); }
};

/* Extending Model class adding common methods to prototype. */
Model = BEM.Model = extend({

  /**
   * To verify the dataType specified in the schema is valid or not. if the
   * datatype if invalid, it omitts the attribute from the schema.
   * @method _schemaVerification
   * @access private
   */
  _schemaVerification : function()  {
    for(var attribute in this.schema) {
      if(this.schema[attribute] !== 'int' &&
          this.schema[attribute] !== 'string' &&
          this.schema[attribute] !== 'float') {
        delete this.schema[attribute];
      }
    }
  },

  /**
   * Enforce the datatype of datum to what specified in the model
   * schema.
   * @method _enforceSchema
   * @access private
   */
  _enforceSchema : function() {
    var schema = this.schema,
        dataType = null;
    
    for(var attribute in schema) {          
      dataType = schema[attribute].toLowerCase();

      if(this.datum.hasOwnProperty(attribute))  {

        if(dataType === 'int')  {
          this.datum[attribute] = parseInt(this.datum[attribute]);
        }else if(dataType === 'float')  {
          this.datum[attribute] = parseFloat(this.datum[attribute]);
        }else if(dataType === 'string') {
          this.datum[attribute] = this.datum[attribute].toString();
        }
      }
    }
  },

  /**
   * Add the datum in the data collection array.
   * @method add
   * @access private
   */
  add : function() {
    this.data.push(this.copy());
    return this;
  },

  /**
   * To get a copy of current datum.
   * @method copy
   * @access public
   * @return object
   */
  copy : function() {
    var forge = {};

    for(var attribute in this.datum)  {
      forge[attribute] = this.datum[attribute];
    }
    return forge;
  },

  /**
   * Set value to the model.
   * @method set
   * @access public
   * @param object|string key
   * @param object|string value
   */
  set : function(key, value) {
    var set = false;

    if(typeof key === 'object') {
      for(var attribute in this.schema) {
        this.datum[attribute] = key[attribute];
      }
      set = !set;
    }else if(typeof key === 'string' && value)  {
      this.datum[key] = value;
    }

    /* if strict mode is enabled enforce the datatype of elements in datum 
       to the what specified in the schema. */ 
    if(this.strict) { this._enforceSchema(); }

    if(set) {
      /* if the collection transformation flag is enabled add the datum to data 
         array. */
      if(this.collection) { this.add(); }
    }

    return this;
  },

  /**
   * Get the data. if you pass '*' as key, the method will return full data.
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
  },

  /**
   * To get the object from the collection with respect to the id give.
   * @method find
   * @access public
   * @param string id
   * @return object
   */
  find : function(id)  {
    this.data.forEach(function(datum, index) {
      if(datum[this.id] === id) {
        this.datum = datum;
        this.collectionIndex = index;
      }
    }, this);

    return this.datum;
  },

  /**
   * To get the data from the collection at the index.
   * @method at
   * @access public
   * @param int index
   * @return object
   */
  at : function(index)  {
    return this.data[index];
  },

  /**
   * To get an array of objects in the collection matches the supplied attributes.
   * @method where
   * @access public
   * @param object attrs
   * @return array
   */
  where : function(attrs)  {
    var filtered = false,
        filteredArray = [];

    this.data.forEach(function(datum) {
      for(var attr in attrs)  {
        if(datum[attr] === attrs[attr]) { filtered = true; } 
        else { filtered = false; }
      }
      if(filtered)  { filteredArray.push(datum); }
    }, this);

    return filteredArray;
  },

  fetch : function(success, error)  {
    var successCallback = success,
        options = {
          success : null,
          error : error
        };

    options.success = function()  {
      response.forEach(function(datum)  {
        this.set(datum);
      }, this);

      if(successCallback) { successCallback.apply(this); }
    }
        
    this._comm('GET', null, options, this);
  },

  _comm : function(method, data, options, context) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, this.url, true);
    xhr.onload = function() {
      console.log(this);
      response = JSON.parse(this.response);
      if(this.status == 200) {
        options.success.apply(context, response);
      }else if(this.status == 400)  {
        options.error.apply(context, arguments);
      }
    }
    xhr.send();
  }
  
}, BEM.Model);

Model.extend = BEM.Model.extend = extend;