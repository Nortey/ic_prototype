$(document).ready(function () {
 	$("#viewUsers").hide();

	sessionCheck().then(function(response){
		loginCallback(response);
	});
});

$("#accountNav").click(function(){
	$(".contentDiv").hide();
	$("#accountDiv").show();
});

$("#viewUsersNav").click(function(){
	$(".contentDiv").hide();
	$("#viewUsers").show();
});

$("#signIn").click(function(){
	signIn();
});


function sessionCheck(){
	var def = new $.Deferred();

	$.ajax({
		type: "GET",
		url: "/sessionCheck",
	}).then(function(response){
		def.resolve(response);
	});

	return def;
}

function signIn(){
	var userName = $("#userName").val();
	var password = $("#password").val();
	var data = { userName: userName, password: password};

	$.ajax({
		type: "POST",
		url: "/signIn",
		data: data,
		dataType: 'json',
	}).then(function(response){
		loginCallback(response);
	});
}

function loginCallback(response){
	var loggedIn = response.loggedIn;
	if(!loggedIn){
		$("#signinForm").show();
	}else{
		$("#signinForm").hide();
		$("#welcomeDiv").show();
		$("#welcomeDiv").html("Welcome " + response.userName);
	}
}
