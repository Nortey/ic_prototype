$(document).ready(function () {
  $("#viewUsers").hide();
});

$("#signInNav").click(function(){
	$(".contentDiv").hide();
	$("#signInDiv").show();
});

$("#viewUsersNav").click(function(){
	$(".contentDiv").hide();
	$("#viewUsers").show();
});


function addUser(){
	var certificate = "ABCDEFG";

	var table = $("#usersTable");
	var tableRow = $("<tr/>", {});
	var subjectName = $("<td/>", {text: "Jeremy"});
	var serialNumber = $("<td/>", {text: "ABCDEFGHIJK"});
	var viewCertifiate = $("<td/>", {html: "<button onclick='alert(\""+ certificate +"\")'>View Certificate</button>"});

	subjectName.appendTo(tableRow);
	serialNumber.appendTo(tableRow);
	viewCertifiate.appendTo(tableRow);
	tableRow.appendTo(table);
}
