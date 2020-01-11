$(document).ready(function(){
  
    $("#time-remaining").hide();
     $("#begin").on('click', trivia.startGame);
     $(document).on('click' , '.option', trivia.guessChecker);
     
   })
   
   var trivia = {
     
     correct: 0,
     incorrect: 0,
     unanswered: 0,
     current: 0,
     timer: 20,
     timerOn: false,
     timerId : '',
     
     questions: {
       q1: "What is the name of Jon's direwolf?",
       answers: {
         q1: ['Ghost', 'Grey Wind', 'Lady', 'Nymeria'],
       },
       correctAnswer: "Ghost",
     
       q2: "How many fingertips did Stannis Baratheon chop off of Davos hand?",
       answers: {
         q2: ['1', '2', '3', '4'],
       },
       correctAnswer: "4",
       q3: "Who is the king of Westeros when the show begins?",
       answers: {
         q3: ['Rhaegar Targaryen', 'Robert Baratheon', 'Aerys Targaryen', 'Ned Stark'],
       },
       correctAnswer: "Robert Baratheon",
       q4: "What is Ollenna's relationship to Mace Tyrell?",
       answers: {
         q4: ['Sister', 'Aunt', 'Mother', 'Lover'],
       },
       correctAnswer: "Mother",
       q5: "Which of the following characters DOES appear in season 1?",
       answers: {
         q5: ['Beric Dondarrion','Stanis Baratheon','Craster','Roose Bolton'],
       },
       correctAnswer: "Beric Dondarrion",
  
     startGame: function(){
   
       trivia.current = 0;
       trivia.correctAnswer = 0;
       trivia.incorrect = 0;
       trivia.unanswered = 0;
       clearInterval(trivia.timerId);
       
       $('.game').show();
       $('.results').html('');
       $('#timer').text(trivia.timer);
       $('.begin').hide()
       $('#time-remaining').show();
       trivia.nextQuestion();
       
     },
 
     nextQuestion : function(){
       
       trivia.timer = 10;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);
       
       if(trivia.timerOn){
         trivia.timerId = setInterval(trivia.timerRunning, 1000);
       }
       
       var questionContent = Object.values(trivia.questions)[trivia.current];
       $('#question').text(questionContent);
 
       var questionOptions = Object.values(trivia.options)[trivia.current];
       
       $.each(questionOptions, function(key){
         $('.options').append($('<"btn Begin>'+key+'</button>'));
       })
       
     },
 
     timer : function(){
       
       if(trivia.timer > -1 && trivia.current < Object.keys(trivia.questions).length){
         $('#timer').text(trivia.timer);
         trivia.timer--;
           if(trivia.timer === 4){
             $('#timer').addClass('last-seconds');
           }
       }
    
       else if(trivia.timer === -1){
         trivia.unanswered++;
         trivia.result = false;
         clearInterval(trivia.timerId);
         resultId = setTimeout(trivia.guessResult, 1000);
         $('.results').html('<h3>Out of time! The answer is '+ Object.values(trivia.answers)[trivia.current] +'</h3>');
       }
   
       else if(trivia.current === Object.keys(trivia.questions).length){
         
       
         $('.results')
           .html('<h3>The North thanks you for your time!</h3>'+
           '<p>Correct: '+ trivia.correctAnswer +'</p>'+
           '<p>Incorrect: '+ trivia.incorrect +'</p>'+
           '<p>Unaswered: '+ trivia.unanswered +'</p>'+
           '<p>Try again, if you dare...</p>');
         
        $('.game').hide();
        $('#begin').show();
       }
       
     },
 
     guessCheck : function() {
   
       var currentAnswer = Object.values(trivia.answers)[trivia.current];
       
       if($(this).text() === currentAnswer){
         
         $(this).addClass('btn-success').removeClass('btn-info');
         
         trivia.correct++;
         clearInterval(trivia.timerId);
         resultId = setTimeout(trivia.guessResult, 1000);
         $('.results').html('<h3>Correct! Tyrion would be proud!</h3>');
       }
    
       else{
      
         $(this).addClass('btn-danger').removeClass('btn-info');
         
         trivia.incorrect++;
         clearInterval(trivia.timerId);
         resultId = setTimeout(trivia.guessResult, 1000);
         $('.results').html('<h3>Wrong! King Joffrey will have your head! '+ currentAnswer +'</h3>');
       }
       
     },
     guessResult : function(){
    
       trivia.current++;
       $('.options').remove();
       $('.results h3').remove();
         trivia.nextQuestion();
        
     }
   
   }}