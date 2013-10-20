var fs = require("fs"),
	Deferred = require("JQDeferred"),
	userHelper = require("./mongo/userHelper"),
	quizHelper = require("./mongo/quizHelper"),
	studyGuideHelper = require("./mongo/studyGuideHelper");

/**************************************************************
					MAIN PAGE
***************************************************************/

var _main = function(req, resp){
	fs.readFile(__dirname + '/public/index.html', 'utf8', function(err, text){
        resp.send(text);
    });
}

/**********************************************************************************
	Session check
	curl -i -X GET http://localhost:3000/sessionCheck
***********************************************************************************/
var _sessionCheck = function(req, resp){
	if(req.session.userName != null){
		resp.json({loggedIn: true, userName: req.session.userName});
	}else{
		resp.json({loggedIn: false});
	}
}

/**********************************************************************************
	Sign In
	curl -i -X GET http://localhost:3000/signIn
***********************************************************************************/
var _signIn = function(req, resp){
	var userName = req.body.userName;
	var password = req.body.password;

	userHelper.signInUser({userName: userName, password: password}).then(function(user){
		if(user != null){
			req.session.userName = user.userName;
			resp.json({loggedIn: true, userName: user.userName});
		}else{
			resp.json({loggedIn: false});
		}
	});
}

/**********************************************************************************
	Create quiz
	curl -i -X GET http://localhost:3000/createQuiz
***********************************************************************************/
var _createQuiz = function(req, resp){
	var quizName = req.body.quizName;
	var userName = req.session.userName;

	quizHelper.createQuiz({userName: userName, quizName: quizName}).then(function(){
		resp.send(200);
	});
}

/**********************************************************************************
	Get User quizzes
	curl -i -X GET http://localhost:3000/getQuizzes
***********************************************************************************/
var _getUserQuizzes = function(req, resp){
	var userName = req.session.userName;

	quizHelper.getQuizzesByUserName({userName: userName}).then(function(quizzes){
		resp.json(quizzes);
	});
}

/**********************************************************************************
	Get All quizzes
	curl -i -X GET http://localhost:3000/getQuizzes
***********************************************************************************/
var _getAllQuizzes = function(req, resp){
	quizHelper.getAllQuizzes().then(function(quizzes){
		resp.json(quizzes);
	});
}

/**********************************************************************************
	Add question
	curl -i -X GET http://localhost:3000/addQuestion
***********************************************************************************/
var _addQuestion = function(req, resp){
	var question = req.body.question;
	var userName = req.session.userName;

	quizHelper.addQuestion({userName: userName, question: question});
	resp.send(200);
}

/**********************************************************************************
	Add study guide
	curl -i -X GET http://localhost:3000/addStudyGuide
***********************************************************************************/
var _addStudyGuide = function(req, resp){
	var studyGuide = req.body.studyGuide;
	var userName = req.session.userName;

	studyGuideHelper.addStudyGuide({userName: userName, name: studyGuide.studyGuideName, content: studyGuide.content});
	resp.send(200);
}

/**********************************************************************************
	Get study guides
	curl -i -X GET http://localhost:3000/addStudyGuide
***********************************************************************************/
var _getStudyGuides = function(req, resp){
	var userName = req.session.userName;

	studyGuideHelper.getStudyGuidesByUserName({userName: userName}).then(function(studyGuides){
		resp.json(studyGuides);
	});
}

/**********************************************************************************
	Get user profile
	curl -i -X GET http://localhost:3000/addStudyGuide
***********************************************************************************/
var _getUserProfile = function(req, resp){
	var userName = req.session.userName;

	// studyGuideHelper.getStudyGuidesByUserName({userName: userName}).then(function(studyGuides){
	// 	resp.json(studyGuides);
	// });
}

module.exports = {
	main: _main,
	signIn: _signIn,
	sessionCheck: _sessionCheck,
	createQuiz: _createQuiz,
	getUserQuizzes: _getUserQuizzes,
	addQuestion: _addQuestion,
	getAllQuizzes: _getAllQuizzes,
	addStudyGuide: _addStudyGuide,
	getStudyGuides: _getStudyGuides
};
