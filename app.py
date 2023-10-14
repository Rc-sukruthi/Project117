# import the necessary modules
from flask import Flask , render_template , url_for , request , jsonify
import sentiment_analysis as sa

app = Flask(__name__)

# app route for index page
@app.route('/')
def home():
    return render_template('index.html')

# write a route for post request
@app.route('/predict-review' , methods = ['POST'])
def review():

    # extract the customer_review by writing the appropriate 'key' from the JSON data
    review = request.json.get('text')

    # check if the customer_review is empty, return error
    if not review:
        response = {
            'status' : 'error' , 
            'message' : 'Empty response'
            }
        return jsonify(response)

    # if review is not empty, pass it through the 'predict' function.
    # predict function returns 2 things : sentiment and path of image in static folder
    # example : Positive , ./static/assets/emoticons/positive.png

    else:
        predict_review, predict_sentiment_url = predict(review)

        response= {
            'status': 'success',
            'data': {
                'predict_review': predict_review,
                'predict_sentimnet_url': predict_sentiment_url
            }
        }
        return jsonify(response)


app.run(debug = True)