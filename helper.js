var start = process.hrtime();

var _startTime = function(note){
	start = process.hrtime();
	console.log("\nResetting time - " + note);
}

var _endTime = function(note){
    var precision = 3; // 3 decimal places
    var elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
    console.log(process.hrtime(start)[0] + " s, " + elapsed.toFixed(precision) + " ms - " + note + "\n"); // print message + time
}

var _generateUser = function(){
	var user = {};
	user.name = getRandomString(7, 15);
	user.amount = Math.floor(Math.random() * 10000);
	return user;
}

function getRandomString(minLen, maxLen){
	var textLen = Math.floor(Math.random() * maxLen) + minLen;
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < textLen; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function _shuffleArray(o){ 
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

module.exports = {
	startTime: _startTime,
	endTime: _endTime,
	generateUser: _generateUser,
	shuffleArray: _shuffleArray
};
