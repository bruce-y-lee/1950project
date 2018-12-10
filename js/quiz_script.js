// Author: Yong Lee
$(document).ready(function(){
    $("#quiz").hide();

    //set quiz time to 1200 secs
    var timer, counter = 1200;

        $("#start").click(function(){
          $("#start").hide();
          //timer count down
            $('#hideMsg').delay(counter * 1000);
            timer = setInterval(function() {
                counter--;
                $("#hideMsg span").html(parseInt((counter / 60)) +":"+ parseInt((counter%60)));
                if (counter == 0) { clearInterval(timer)
                    $("#quiz").hide();
                };
            }, 1000);

          if(counter != 0){$("#quiz").show();}
          else{
              $("#hideMsg").text("Sorry the quiz is over")
          }

        })
        //answer variable
        var answers = [
                          "The World Wide Web Consortium", "C",
                          "<h1>", "B",
                          "<a href='http://www.w3schools.com'>W3Schools</a>", "D",
                          " <body style='background-color:yellow;'>", "A",
                          "<script>", "C",
                          "False", "B",
                          "alert('Hello World');", "D",
                          "True", "A",
                          "$('p').manipulate('background-color','red');", "D",
                          "$(document).ready()", "B"
                      ];

          function calcScore() {
                  var results = {right: 0, wrong: 0, answered: [], unanswered: [], missed: []};
                  $("form .sel").each(function(index) {
                    //find checked answer
                      var chosen = $(this).find("input:checked");

                      if (chosen.length) {
                          results.answered.push(index);
                          //if anser is correct change background color and count right
                          if (chosen.val() == answers[(index * 2) + 1]) {
                            $(chosen).parent().css("background-color","#6BE874");
                              results.right++;
                              results.answered.push(index);
                          } else { //if not correct change color and count wrong
                            $(chosen).parent().css("background-color","red");
                            var correct = $(this).find("input[value="+answers[index*2+1]+"]");
                            $(correct).parent().css("background-color","#6BE874");
                            results.wrong++;
                            results.missed.push(index);
                          }
                      } else {//if no checked, add unanswered
                          results.unanswered.push(index);
                      }
                  });

                  return(results);
              }

        $("#submit").click(function(){
          //confirm submit
          if(confirm("Do you really want to submit this quiz?")){
            clearInterval(timer);

            //show total time for the quiz
            var take_time = 1200 - counter;
            $("#hideMsg").html("It took "+parseInt((take_time / 60)) +" mins "+ parseInt((take_time%60))+" secs")
            $("#submit").hide();
            //show the quiz score
            var results = calcScore();
            var score = "Correct: " + results.right + ", Wrong: " + results.wrong + ", Unanswered: " + results.unanswered.length;
            $(".result_quiz").html(score);

            }
          });




})
