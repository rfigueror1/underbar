(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);//if the parameter n is undefined, then return the first element
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if(n==0){//if n is equal to 0 return an empty array
      return [];
    }
    if(n>array.length){//if n is larger than the array'length, then return the complete array
      return array.slice(0);
    }
    else{
      return n === undefined ? array[array.length-1] : array.slice(n-1);//else return the slice of the array from n-1
    }

  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.

  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {//chech if collection is array
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);//execute the iterator function for each of the array's elements
      }
    } else {//if collection is an object (not an array)
      for (var key in collection) {
        iterator(collection[key], key, collection);//execute the iterator function for each of the object's elements
      }
}
  };


  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(array, test) {
    var filter = [];
    _.each(array, function(item) {//test if the iterator function is valid for each element
      if (test(item) == true) {
        filter.push(item);
      }
    });
    return filter;
};

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var filter = [];
    _.each(collection, function(item) {//test if the iterator function is not valid for each element
      if (test(item) == false) {
        filter.push(item);
      }
    });
    return filter;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    var filter = [];
    _.each(array, function(item, index) {
      //if(iterator(isSorted) == true){
      if(!isSorted){//test if the the array is sorted
        if(_.indexOf(filter, item) == -1){//check if index of item is -1
          if(Math.max.apply(null, filter)<item){//check if max element of filter is less than item
              filter.push(item);
          }
        }
      }else{
      if(_.indexOf(filter, item) == -1){
        if(Math.max.apply(null, filter)<item && (index <= iterator(index))){
            filter.push(item);
        }
      }
    }
    });

    return filter;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
      var mapArray = [];//declaration of empty array
      if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {//for each element in the collection apply the iterator function
          mapArray.push(iterator(collection[i], i, collection));
        }
      } else {
        for (var key in collection) {//the same but for objects
          mapArray.push(iterator(collection[key], key, collection));
        }
      }
      return mapArray;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.

  _.reduce = function(collection, iterator, accumulator) {
    var first = true;
    _.each(collection, function(item) {
    if (first && accumulator === undefined) {
      accumulator = item;
    } else {
      accumulator = iterator(accumulator, item);//apply the iterator function on accumulated result
    }
    first = false;
  });
  return accumulator;
};

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };

  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    if(iterator == undefined){
      return _.reduce(collection, function(startValue, item) {
        return !!item && startValue;
      }, true);
    }
    return _.reduce(collection, function(startValue, item) {
      return !!iterator(item) && startValue;//appply a binary operator "and" on the iterator function and the start value
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    if(iterator == undefined){
      return _.reduce(collection, function(startValue, item){//apply a reduction function
        return !!item || startValue;//appply a binary operator "or" on each item and the start value
      },false)
    }else{
      return _.reduce(collection, function(startValue, item){
        return !!iterator(item) || startValue;//appply a binary operator "or" on the iterator function and the start value
      },false)
    }
  };

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    _.each(arguments, function(args) {//apply on each argument the following function
      _.each(args, function(value, key) {
        obj[key] = value;//add the desired property
      });
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(arguments, function(args) {
      _.each(args, function(value, key) {
        if(!_.contains(Object.keys(obj),key)){//chech if the object already contains the key parameter
          obj[key] = args[key];
        }
      });
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var funcReturns = {};//new object
    return function() {
      var arg = JSON.stringify(arguments);//turn arguments into strings to be used as keys for the funcReturns object
      if (!funcReturns[arg]) {//Check if the value exists for the 'args' key
        funcReturns[arg] = func.apply(this, arguments);//if the value does not exist, apply the function and store the result
      }
      return funcReturns[arg];
    };
};

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);//get the arguments from position '2'
    setTimeout(function() {
      func.apply(this, args);//execute the function with the prevoisuly obtained arguments
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
  var changed = [];//empty array to store the shuffled elements
  var copies = array.slice(0, array.length);//copy of the paramater array
  for (var i = 0; i < array.length; i++) {
    var random = Math.floor(Math.random() * copies.length);//to obtain random index
    changed.push(copies[random]);//push into the empty array defined previously the element from 'copies' resulting from the random index
    copies.splice(random, 1)//delete element from random index from copies array
  }
  return changed;
};


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
