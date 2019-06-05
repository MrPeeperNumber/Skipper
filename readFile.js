//////////////////////////////////////////////////////////////
//  Title:        readFile.js                               //
//  Author:       Jake Roberts                              //
//  Date:         4/24/2019                                 //
//  Description:  Reads information from a text file into   //
//                an array of words stored in memory        //
//  Dependencies: language.txt                              //
//////////////////////////////////////////////////////////////

const fs = require('fs');

exports.readFile = function() {
  let badWords2 = [''];
  fs.readFile('language.txt', 'utf-8', (err, data) => {
    if(err) throw err;

    let a = 0;
    for(let i = 0; i < data.length; i++) {
      if(data[i] === ',') {
        a++;
        badWords2[a] = '';
      }
      else badWords2[a] += data.charAt(i);
    }

    for(var i = 0; i < badWords2.length; i++) console.log(badWords2[i]);
    return badWords2;
  });
  return badWords2;
}

//PSUEDOCODE
/* acquire the filestream library
 *
 * export readFile function with no passed parameters
 * 	initialize 'badWords2' placeholder variable as an empty array
 * 	start readFile function from 'fs' object from 'language.txt', reading in the contents into 'data' variable
 * 		if the file doesn't exist, throw an error
 *
 * 		initialize 'a' variable as 0
 * 		iterate through the data variable
 * 			if 'data' at index 'i' is equal to a ','
 * 				increment variable 'a' up by one and 
 * 				add another index to 'badWords2' and set it as empty
 * 				^^Failing to do this causes any added indices to be intialized as 'undefined' and all characters will be concatonated to it; Example: 'undefinedexample', 'example' being the concatonated word^^
 * 			otherwise concatonate the character of variable 'data' at index 'i' onto variable 'badWords2' at index 'a'
 *		iterate through the 'badWords2' variable and log each index in the console
 *		return variable 'badWords2' to main function
 *	return 'badWords2' from 'readFile' function
 */
