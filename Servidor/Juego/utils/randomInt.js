/*
* Can give a random integer
*
*/
module.exports = function randomInt(min,max){
	return Math.floor(Math.random() * (max) + min)
}