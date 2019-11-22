class DeepEqual {
  static deepEqual(obj1, obj2, compareFunction) {
    const diffs = {};
    for (const [key1, value1] of Object.entries(obj1)) {
      const value2 = obj2[key1];
      const res = DeepEqual.compare(value1, value2, compareFunction);
      if (DeepEqual.isObject(res) && !DeepEqual.isEmpty(res)) {
        diffs[key1] = res;
      } else if (res === true) {
        diffs[key1] = value1;
      }
    }
    return diffs;
  }


  /**
   * Check if
   * @param el
   * @returns {boolean}
   */
  static isObject(el) {
    return !!el && el.constructor === Object;
  }


  static isEmpty(el) {
    return Object.entries(el).length === 0;
  }

  static compareArray(arr1, arr2, compareFunction) {
    if (arr1.length !== arr2.length) {
      return true;
    }
    for (let i = 0; i < arr1.length; i += 1) {
      if (Array.isArray(arr1[i]) && Array.isArray(arr2[i])) {
        const res = DeepEqual.compareArray(arr1[i], arr2[i], compareFunction);
        if (res) {
          return true;
        }
      }
      if (DeepEqual.isObject(arr1[i]) && DeepEqual.isObject(arr2[i])) {
        const res = DeepEqual.compare(arr1[i], arr2[i], compareFunction);
        if (!DeepEqual.isEmpty(res)) {
          return true;
        }
      } else if (compareFunction) {
        const res = compareFunction(arr1[i], arr2[i]);
        if (!res) {
          return true;
        }
      } else if (arr1[i] !== arr2[i]) {
        return true;
      }
    }
    return false;
  }

  static compare(value1, value2, compareFunction) {
    if (typeof value2 === 'undefined') {
      return true;
    }
    if (DeepEqual.isObject(value1) && DeepEqual.isObject(value2)) {
      return DeepEqual.deepEqual(value1, value2, compareFunction);
    }
    if (Array.isArray(value1) && Array.isArray(value2)) {
      return DeepEqual.compareArray(value1, value2, compareFunction);
    }
    if (compareFunction) {
      return !compareFunction(value1, value2);
    }
    return value1 !== value2;
  }
}

module.exports = DeepEqual;
