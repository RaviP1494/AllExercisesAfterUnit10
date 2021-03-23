//Quick question #1
//What does the following return
//new Set([1,1,2,2,3,4]

//it returns a set of the values: 1,2,3,4




//Quick question #2
//What does the following return
//[...new Set("referee")].join("")

//it returns the string 'ref'




//Quick question #3
//What does the map m look like after running the following code
//let m = new Map();
//m.set([1,2,3], true);
//m.set([1,2,3], false);

//m now has two key value pairs, each of the keys being separate arrays of [1,2,3] and the first value being true and the second being false




const hasDuplicates = (arr) => arr.length !== [...new Set(arr)].length;

const vowelCount = (str) => {
    //initialize vowelMap
    const vowelMap = new Map();
    //split and filter string into array of vowels
    const vowelArr = str.split('').filter((char) => 'aeiou'.includes(char));
    //add vowels into map
    vowelArr.forEach((char) => {
        if (vowelMap[char]) {
            vowelMap[char]++;
        }
        else {
            vowelMap[char] = 1;
        }
    })
    return vowelMap;
}