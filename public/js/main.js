$(document).ready(function () {
	$(".contentDiv").hide();
 	$("#accountDiv").show();
 	$(".nav li").hide();

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
	getUserQuizzes();
});

$("#viewQuizzesNav").click(function(){
	$(".contentDiv").hide();
	$(".nav li").removeClass("active");

	$("#viewQuizzesNav").addClass("active");
	$("#viewQuizzesDiv").show();
	getAllQuizzes();
});

$("#signIn").click(function(){
	signIn();
});

$("#createQuiz").click(function(){
	createQuiz();
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
		$(".nav li").show();

		$("#signinForm").hide();
		$("#welcomeDiv").show();
		$("#welcomeDiv").html("Welcome " + response.userName);
	}
}

function addQuestion(){
	var quizName = $("#quizSelect").val();
	// var question = $("#question").val();
	// var answers = [
	// 	$("#answer1").val(),
	// 	$("#answer2").val(),
	// 	$("#answer3").val(),
	// 	$("#answer4").val()
	// ];

	var question = "Yay a question";
	var answers = [
		"abdfafe",
		"efefefe",
		"efefefqwq",
		"eeieieieiieie"
	];

	var data = {question: {quizName: quizName, question: question, answers: answers}};
	
	$.ajax({
		type: "POST",
		url: "/addQuestion",
		data: data
	});
}

function createQuiz(){
	var quizName = $("#quizName").val();
	var data = {quizName: quizName};

	$.ajax({
		type: "POST",
		url: "/createQuiz",
		data: data
	}).then(function(response){
		getUserQuizzes();
	});
}

function getUserQuizzes(){
	$.ajax({
		type: "GET",
		url: "/getUserQuizzes",
		dataType: 'json'
	}).then(function(response){
		$("#quizSelect").empty();

		$.each(response, function(i, quiz){
			var option = $("<option/>", {html: quiz.quizName, value: quiz.quizName});
			$("#quizSelect").append(option);
		})
	});
}

function getAllQuizzes(){
	$.ajax({
		type: "GET",
		url: "/getAllQuizzes",
		dataType: 'json'
	}).then(function(response){
		var quizTable = $("#quizTable");
		$('#quizTable tbody > tr').remove();

		$.each(response, function(i, quiz){
			var tableRow = $("<tr/>", {});
			var userName = $("<td/>", {html: quiz.userName});
			var quizName = $("<td/>", {html: quiz.quizName});

			userName.appendTo(tableRow);
			quizName.appendTo(tableRow);
			tableRow.appendTo(quizTable)
		})
	});
}
