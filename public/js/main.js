$(document).ready(function () {
	$(".contentDiv").hide();
 	$("#addQuizDiv").show();

	sessionCheck().then(function(response){
		loginCallback(response);
	});
});

$("#accountNav").click(function(){
	$(".contentDiv").hide();
	$(".nav li").removeClass("active");

	$("#accountNav").addClass("active");
	$("#accountDiv").show();
});

$("#addQuizNav").click(function(){
	$(".contentDiv").hide();
	$(".nav li").removeClass("active");

	$("#addQuizNav").addClass("active");
	$("#addQuizDiv").show();
});

$("#signIn").click(function(){
	signIn();
});

$("#addQuestion").click(function(){
	addQuestion();
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

function addQuestion(){
	var quizName = $("#quizName").val();
	var question = $("#question").val();
	var answers = [
		$("#answer1").val(),
		$("#answer2").val(),
		$("#answer3").val(),
		$("#answer4").val()
	];

	var data = {quizName: quizName, question: question, answers: answers};
	console.log(data);

}
