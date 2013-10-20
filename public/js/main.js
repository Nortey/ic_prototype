$(document).ready(function () {
	$(".contentDiv").hide();	
 	$("#frontpage").show();
 	//$(".nav li").hide();

	// sessionCheck().then(function(response){
	// 	loginCallback(response);
	// });

	loadFrontPage();
});

$("#accountNav").click(function(){
	$(".contentDiv").hide();
	$(".nav li").removeClass("active");

	$("#accountNav").addClass("active");
	$("#accountDiv").show();
	$("#welcomeDiv").show();
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

$("#studyGuideNav").click(function(){
	$(".contentDiv").hide();
	$(".nav li").removeClass("active");

	$("#studyGuideNav").addClass("active");
	$("#addStudyGuideDiv").show();
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

$("#addStudyGuideBtn").click(function(){
	addStudyGuide();
});

function loadFrontPage(){
	$.ajax({
		type: "GET",
		url: "/getFrontPage",
	}).then(function(response){
		var frontPageTable = $("#frontPageTable");
		$('#frontPageTable tbody > tr').remove();

		$.each(response, function(i, item){
			var tableRow = $("<tr/>", {});
			var userName = $("<td/>", {html: item.userName });
			var itemName = $("<td/>", {html: (item.name || item.quizName) });

			userName.appendTo(tableRow);
			itemName.appendTo(tableRow);
			tableRow.appendTo(frontPageTable)
		})
	});
}

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
		populateAccountPage();
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

function addStudyGuide(){
	var studyGuideName = $("#studyGuideName").val();
	var content = $("#studyGuideContent").val();

	var data = {studyGuide: { studyGuideName: studyGuideName, content: content} };

	$.ajax({
		type: "POST",
		url: "/addStudyGuide",
		data: data
	})
}

function populateAccountPage(){

	// Get quizzes
	$.ajax({
		type: "GET",
		url: "/getUserQuizzes",
		dataType: 'json'
	}).then(function(response){
		var accountQuizDiv = $("#accountQuizDiv")
		$("#accountQuizTable").remove();
		var accountQuizTable = $("<table/>", {id: "accountQuizTable", class: "table"} );

		$.each(response, function(i, quiz){
			var tableRow = $("<tr/>", {});
			var quizName = $("<td/>", {html: quiz.quizName});

			quizName.appendTo(tableRow);
			tableRow.appendTo(accountQuizTable)
		})

		accountQuizTable.appendTo(accountQuizDiv);
	});

	// Get Study Guides
	$.ajax({
		type: "GET",
		url: "/getStudyGuides",
		dataType: 'json'
	}).then(function(response){
		var studyGuideDiv = $("#accountStudyGuideDiv")
		$("#accountStudyGuideTable").remove();
		var accountStudyGuideTable = $("<table/>", {id: "accountStudyGuideTable", class: "table"} );

		$.each(response, function(i, guide){
			var tableRow = $("<tr/>", {});
			var studyGuideName = $("<td/>", {html: guide.name});

			studyGuideName.appendTo(tableRow);
			tableRow.appendTo(accountStudyGuideTable)
		})

		accountStudyGuideTable.appendTo(studyGuideDiv);
	});



	// Get Profile
	$.ajax({
		type: "POST",
		url: "/getUserByUserName",
		dataType: 'json'
	}).then(function(response){
		var userName = response.userName;
		var profile = response.profile;

		$("#profileUserName").html(userName);
		$("#profileBio").html(profile.bio);
		$("#profileEducation").html(profile.education);
		$("#profileEmailAddress").html(profile.email);
	});

}
