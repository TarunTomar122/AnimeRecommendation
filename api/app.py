# Importing Libraries
import json
# import random
import itertools


# Loading The Model in !!!
global recommendations
with open('recommendations.json') as file:
    recommendations = json.load(file)

global animeDetails
with open('main.json') as file:
    animeDetails = json.load(file)    

from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/suggest', methods=['POST'])
def predict():

    try:

        list_watched = request.json["animes"]
        
        suggestions = []

        for anime in list_watched:
            try:
                suggestion = recommendations[anime][:3]
            except:
                suggestion = []
            suggestions.append(suggested_anime for suggested_anime in suggestion if suggested_anime not in list_watched)

        suggestions = list(set(itertools.chain.from_iterable(suggestions)))

        # random.shuffle(suggestions)

        suggestedAnimes = []

        for anime in suggestions:
            try:
                suggestedAnimes.append({'name': anime, 'image': animeDetails[anime]['image'], 'video': animeDetails[anime]['video'], 'link': animeDetails[anime]['link']})
            except:
                pass

        obj = {}

        obj['error'] = None
        obj['suggestions'] = suggestedAnimes

        return jsonify(obj)
    
    except Exception as e:

        print("SomeThing Went Wrong",e)

        return jsonify({'suggestions': None,'error': 'Something Went Wrong'})                   

if __name__ == '__main__':
    
    app.run()
