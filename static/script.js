var dis_date = new Date()
let date = "Date: " + date.toLocaleDateString()

$(document).ready(function(){
    $('#date').html(date)
})

let predicted_review

$(function(){
    //  write an event, when Submit button is clicked
    $('#button').click(function(){

        //  get the text value from the textarea using the 'val()' method
        let input_text = { 
            'text' : $('#text').val()
        }

        //  ajax request
        $.ajax({

            //  type of web request
            type : 'POST',  

            //  url of the emoticon
            url : '/predict-review',

            //  Data to be sent in JSON format
            data : JSON.stringify(input_text),

            //  type of response expected is json
            dataType : 'json',

            //  contentType
            contentType : 'application/json',

            //  if everything is successful, run this function
            success : function(result){

                // extract prediction and emoticon url from result
                predicted_review = result.data.predict_review
                review_url = result.data.predict_sentiment_url

                //  update the DOM elements
                $('#sentiment').html(predicted_review)
                $('#emoji').css('display', 'block')

                //  show them
                $('#emoji').attr('src', review_url)
                $('#emoji').css('display', 'block')
            },

            //  if any error, run this function
            error : function(result){
                alert(result.responseJSON.message)
            }
        })
    })
})