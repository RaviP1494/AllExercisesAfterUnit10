// function filterOutOdds() {
//     var nums = Array.prototype.slice.call(arguments);
//     return nums.filter(function(num) {
//       return num % 2 === 0
//     });
//   }

const filterOutOdds = (...nums) => {
    return nums.filter((num) => num % 2 === 0);
};

const findMin = (...nums) => nums.reduce((min, num) => min < num ? min : num);

const mergeObjects = (obj1, obj2) => {
    return { ...obj1, ...obj2 };
}

const doubleAndReturnArgs = (arr, ...rest) => {
    return [...arr.map(n => n * 2), ...rest.map(n => n * 2)]
}

/** remove a random element in the items array
and return a new array without that item. */

const removeRandom = (items) => {
    const r = Math.floor(Math.random() * items.length);
    return items.filter((item, i) => i !== r);
}

/** Return a new array with every item in array1 and array2. */

const extend = (array1, array2) => {
    return [...array1, ...array2];
}

/** Return a new object with all the keys and values
from obj and a new key/value pair */

const addKeyVal = (obj, key, val) => {
    const o = { ...obj };
    o[key] = val;
    return o;
}


/** Return a new object with a key removed. */

const removeKey = (obj, key) => {
    const o = { ...obj };
    delete o[key];
    return o;
}


/** Combine two objects and return a new object. */

const combine = (obj1, obj2) => {
    return { ...obj1, obj2 };
}


/** Return a new object with a modified key and value. */

const update = (obj, key, val) => {
    const o = { ...obj };
    o[key] = val;
    return o;
}