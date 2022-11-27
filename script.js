// 문제 객체(생성자 함수)
function Question(text, choice, answer) {
   this.text = text; // 질문 텍스트
   this.choice = choice; // 선택할 답들(배열)
   this.answer = answer; // 정답 정보
}

// 퀴즈 정보 객체
function Quiz(questions) {
   this.score = 0; // 점수
   this.questions = questions; // 문제
   this.questionIndex = 0; // 문제 번호
}

// 정답 확인 메서드
Quiz.prototype.correctAnswer = function(answer) {
   return answer == this.questions[this.questionIndex].answer;
}

var questions = [
   new Question('사람들과의 인간관계 형성에 적극적이다', ['예', '아니요'],'예'),
   new Question('사람들과 같이 있는것 보다 혼자 있는 것이 더 좋다', ['예', '아니요'],'아니요'),
   new Question('주어진 일에 대해 먼저 계획하고 실행한다', ['예', '아니요'],'예'),
   new Question('새로운 시도에 더 개방적이다', ['예', '아니요'],'아니요'),
   new Question('강한 책임감을 가지고 있는 편이다', ['예', '아니요'],'예'),
   new Question('호기심이 많은 편이다', ['예', '아니요'],'아니요'),
   new Question('집안에 있기 보다는 야외 활동을 더 즐긴다', ['예', '아니요'],'예'),
   new Question('창의적인 활동에 관심이 많다', ['예', '아니요'],'아니요'),
   new Question('긍정적이고 열정적인 편이다', ['예', '아니요'],'예'),
   new Question('예술활동을 좋아하는 편이다', ['예', '아니요'],'아니요'),
   new Question('다른 사람을 친절하고 다정하게 대한다', ['예', '아니요'],'예'),
   new Question('쉽게 스트레스를 받는 편이다', ['예', '아니요'],'아니요'),
   new Question('이타적인 성격을 가지고 있는 편이다', ['예', '아니요'],'예'),
   new Question('작은 걱정거리에도 불안해하는 편이다', ['예', '아니요'],'아니요'),
   new Question('주위 사람들에게 신뢰를 받는 편이다', ['예', '아니요'],'예'),
   new Question('사소한 것에 예민하다는 소리를 자주 듣는다', ['예', '아니요'],'아니요')
   
];

// 퀴즈 객체 생성
var quiz = new Quiz(questions);

// 문제 출력 함수
function updateQuiz() {
   var question = document.getElementById('question');
   var idx = quiz.questionIndex + 1;
   var choice = document.querySelectorAll('.btn');

   // 문제 출력
   question.innerHTML = '질문 ' + idx + ') ' + quiz.questions[quiz.questionIndex].text;

   // 선택 출력
   for (var i = 0; i < 2; i++) {
      choice[i].innerHTML = quiz.questions[quiz.questionIndex].choice[i];
   }

   progress();
}

function progress() {
   var progress = document.getElementById('progress');
   progress.innerHTML = '문제 ' + (quiz.questionIndex + 1) + '/ ' + quiz.questions.length;
}

var btn = document.querySelectorAll('.btn');

// 입력 및 정답 확인 함수

function checkAnswer(i) {
   btn[i].addEventListener('click', function() {
      var answer = btn[i].innerText;

      if (quiz.correctAnswer(answer))
         quiz.score++;

      if (quiz.questionIndex < quiz.questions.length - 1) {
         quiz.questionIndex++;
         updateQuiz();
      } else {
         result();
      }
   });
}

function result() {
   var quizDiv = document.getElementById('quiz');
   var per = parseInt((quiz.score * 100) / quiz.questions.length);
   var txt = '<h1>결과</h1>';

   quizDiv.innerHTML = txt;

   // 점수별 결과 텍스트
   if (per == 50) {
      txt += '<h2>둘 중 아무거나 골라서 키우세요!</h2>'
      txt += '<h1>🐱🐶</h1>'
      quizDiv.innerHTML = txt;
   } else if (per >= 0 && per < 11) {
      txt += '<h2>그냥 키우지 마세요!</h2>'
      txt += '<h1>😾</h1>'
      quizDiv.innerHTML = txt;
   } else if (per >= 11 && per < 50) {
      txt += '<h2>냥이를 키우세요!</h2>'
      txt += '<h1>🐈</h1>'
      quizDiv.innerHTML = txt;
   } else if (per >= 51) {
      txt += '<h2>댕댕이를 키우세요!</h2>'
      txt += '<h1>🐕</h1>'
      quizDiv.innerHTML = txt;
   }
}

for (var i = 0; i < btn.length; i++) {
   checkAnswer(i);
}

updateQuiz();
