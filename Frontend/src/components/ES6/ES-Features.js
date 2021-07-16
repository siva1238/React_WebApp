const Features = () => {
  var x = 1;
  let y = 2;
  const z = 3;
  {
    var x = 100;
    let y = 200;
    const z = 300;
    console.log("x in block scope is", x);
    console.log("y in block scope is", y);
    console.log("z in block scope is", z);
  }
  console.log("x outside of block scope is", x); //var x value will override with new value
  console.log("y outside of block scope is", y); //let is block scope
  console.log("z outside of block scope is", z); //const is block scope

  var colors = ["red", "green", "blue"];

  function print(val) {
    console.log(val);
  }

  colors.forEach(print); //Executes each element of array

  function capitalize(val) {
    return val.toUpperCase();
  }

  var capitalizedColors = colors.map(capitalize); // creates new aray with provide functionality

  console.log(capitalizedColors);

  var values = [1, 60, 34, 30, 20, 5];

  function lessThan20(val) {
    return val < 20;
  }

  var valuesLessThan20 = values.filter(lessThan20); //filter array values based on condition

  console.log(valuesLessThan20);

  const arr = ["one", "two", "three"];
  for (const a of arr) {
    // for...of will get values of array
    console.log(a);
  }

  function test(a, b, c = 0) {
    //Default parameters
    console.log("a:", a);
    console.log("b:", b);
    console.log("c:", c);
  }
  test(2, 3);
  test(2, 3, 1);

  // Spread operator is used to merge arrays and make a shallow copy
  const arr1 = [1, 2, 3];
  const arr2 = [4, 5];
  const arr3 = [...arr1, ...arr2];
  console.log(arr3);

  //Rest Operator is used to handle function parameters without any limit

  function test1(a, ...b) {
    console.log("a :" + a + " b: " + b);
  }
  test1(1, 2, 3, 4, 5);

  // Object/Array destructing :extract elements from array/obj

  const arr5 = [1, 2, 3];
  const [x1, y1] = arr5;
  console.log(x1 + ":" + y1);

  //Template Literals:``
  let a = 1;
  let b = 2;
  let c = 3;
  console.log(`a:${a} b:${b} c:${c}`);

  // Exponentiation operator
  console.log(3 ** 2); //ES7

  // returns true if array includes given value
  var animal = ["cat", "rat", "bat"];
  console.log(animal.includes("cat")); //ES7

  // This method pads a string with another string at the beginning.

  let str = "a3";
  console.log(str.padStart(3, "#")); //ES8

  //This method pads a string with another string and makes the resulting string reach a given length.
  // It adds spaces at the end of the string.
  let str1 = "Bat";
  console.log(str.padEnd(7, ".")); //ES8

  const colors1 = {
    BL: "blue",
    OR: "Orange",
    GR: "Green",
    PI: "Pink",
    YL: "Yellow",
  };
  console.log(Object.entries(colors1)); //It returns array with key-value pairs //ES8
  console.log(Object.keys(colors1)); // It returns keys of obj
  console.log(Object.values(colors1)); // It returns keys of obj

  return (
    <>
      <h2>ES6 Features</h2>
      <h4>Check console for results</h4>;
    </>
  );
};

export default Features;
