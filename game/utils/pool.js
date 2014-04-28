'use strict';

/**
 * Creates a pool that contains objects of the type defined by `constructor`.
 * 
 * @constructor
 * @param {function} constructor - The constructor for the object types in this pool
 * @param {Array} args - Default arguments for every new instance added to this pool
 */
var Pool = function(constructor, args) {
  
  this.store = [];
  this.template = function() {
    return constructor.prototype.constructor.apply(this, args);
  }

  this.template.prototype = constructor.prototype;
};

Pool.prototype = {

  /**
   * Create a new object and add it to the pool
   *
   * @returns {Object}
   */
  new: function() {

    var result = new this.template();

    this.store.push(result);

    return result;
  },

  /**
   * Get the first object matching `criteria` from the pool. If there
   * are no matching objects, then create a new object with the givin
   * criteria and add it to the pool.
   * 
   * @param {Object} [criteria] - The properties to match against
   * @returns {Object}
   */
  get: function(criteria) {

    var criteria = criteria || {};
    var keys = Object.keys(criteria);
    var result = null;

    if (this.store.find) {
      result = this.store.find(function(item) {
        return keys.length == 0 || keys.every(function(key) {
          return item[key] == criteria[key];
        });
      }); 
    }
    else {
      this.store.some(function(item) {
        if (keys.length == 0 || keys.every(function(key) {
          return item[key] == criteria[key];
        })) {
          result = item;
          return true;
        }
        else {
          return false;
        }
      }); 
    }

    if (!result) {
      result = this.new();
      keys.forEach(function(key) {
        result[key] = criteria[key];
      });
    }

    return result;
  },

  /**
   * Get all the objects matching `criteria` from the pool.
   *
   * @param {Object} [criteria] - The properties to match against
   * @returns {Array}
   */
  getAll: function(criteria) {

    var criteria = criteria || {};
    var keys = Object.keys(criteria);

    return this.store.filter(function(item) {
      return keys.length == 0 || keys.every(function(key) {
        return item[key] == criteria[key];
      });
    });
  },

  /**
   * Set properties of all the objects matching `criteria`.
   *
   * @param {Object} values - Property:Value pairs to set on each object.
   * @param {Object} [criteria] - The properties to match against
   */
   setAll: function(values, criteria) {

    var keys = Object.keys(values);
    var criteria = criteria || {};
    var criteriaKeys = Object.keys(criteria);

    this.store.forEach(function(item) {
      if (criteriaKeys.length == 0 || criteriaKeys.every(function(key) {
          return item[key] == criteria[key];
        })) {
        keys.forEach(function(key) {
          item[key] = values[key];
        });
      }
    });
   },

  /**
   * Call a method on all of the objects matching `criteria`.
   *
   * @param {String} method - The name of the method to call
   * @param {Array} [args] - Arguments to pass to the method
   * @param {Object} [criteria] - The properties to match against
   */
   callAll: function(method, args, criteria) {

    var args = args || [];
    var criteria = criteria || {};
    var keys = Object.keys(criteria);

    this.store.forEach(function(item) {
      if (keys.length == 0 || keys.every(function(key) {
          return item[key] == criteria[key];
        })) {
        item[method].apply(item, args);
      }
    });
   },

  /**
   * Apply a function to all of the objects matching `criteria`.
   *
   * @param {Function} fn - The function to apply to each object
   * @param {Array} [args] - Arguments to pass to the function
   * @param {Object} [criteria] - The properties to match against
   */
   applyAll: function(fn, args, criteria) {

    var args = args || [];
    var criteria = criteria || {};
    var keys = Object.keys(criteria);

    this.store.forEach(function(item) {
      if (keys.length == 0 || keys.every(function(key) {
          return item[key] == criteria[key];
        })) {
        fn.apply(item, args);
      }
    });
   }
};

module.exports = Pool;