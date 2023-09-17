import os
import speech_recognition as sr
from flask import Flask, request, render_template, jsonify, redirect, url_for

app = Flask(__name__)


word_database = {
    "क": {
        "कागज": {
            "hindi": "कागज",
            "english": "paper",
            "meaning": "a thin material used for writing, printing, or drawing on",
            "audio_file_path": "audio/क/kagaz.wav"
        },
        "कंगन": {
            "hindi": "कंगन",
            "english": "bangle",
            "meaning": "a rigid bracelet or anklet, typically made of metal, wood, or glass",
            "audio_file_path": "audio/क/kangan.wav"
        },
        "कमल": {
            "hindi": "कमल",
            "english": "lotus",
            "meaning": "a type of aquatic plant with large, beautiful flowers",
            "audio_file_path": "audio/क/kamal.wav"
        }
    },
    "ख": {
        "खटखटाना": {
            "hindi": "खटखटाना",
            "english": "knock",
            "meaning": "to strike a surface with force, typically to get someone's attention",
            "audio_file_path": "audio/ख/khatkhatana.wav"
        },
        "खून": {
            "hindi": "खून",
            "english": "blood",
            "meaning": "the red liquid that circulates in the arteries and veins of humans and other animals, carrying oxygen to and from the tissues",
            "audio_file_path": "audio/ख/khoon.wav"
        },
        "खाना": {
            "hindi": "खाना",
            "english": "food",
            "meaning": "any substance that can be consumed by living organisms to provide energy and nutrients",
            "audio_file_path": "audio/ख/khana.wav"
        }
    },
    # Add more categories and words here...
}


@app.route('/', methods=['GET', 'POST'])
def index():
    categories = list(word_database.keys())

    if request.method == 'POST':
        
        if 'language' not in request.form or 'selected_word' not in request.form or 'selected_category' not in request.form or 'audio' not in request.files:
            return "Please provide a language, category, selected word, and audio file."

        language = request.form['language']
        selected_word = request.form['selected_word']
        selected_category = request.form['selected_category']

        # Check if the selected word exists in the database for the selected category
        if not word_exists_in_database(selected_word, selected_category):
            return f"Error: '{selected_word}' does not exist in the database for category '{selected_category}'."

        # Get the audio file
        audio_file = request.files['audio']

        
        audio_file_path = "temp_audio.wav"
        audio_file.save(audio_file_path)

         
        recorded_text = transcribe_audio(audio_file_path, language)

        
        expected_word_text = word_database[selected_category][selected_word]['hindi']
 
        accuracy = calculate_accuracy(recorded_text, expected_word_text)

       
        os.remove(audio_file_path)

        
        return redirect(url_for('results', accuracy=accuracy,  selected_word= selected_word))
 

    return render_template('index.html', categories=categories)

@app.route('/results')
def results():
    accuracy = request.args.get('accuracy')
    selected_word= request.args.get('selected_word')
    return render_template('result.html', accuracy=accuracy, selected_word=selected_word)



def word_exists_in_database(word, category):
    return word in word_database.get(category, {})

def transcribe_audio(audio_file_path, language):
    recognizer = sr.Recognizer()

    with sr.AudioFile(audio_file_path) as source:
        audio = recognizer.record(source)

    try:
        transcribed_text = recognizer.recognize_google(audio, language=language)
        return transcribed_text
    except sr.UnknownValueError:
        return "Speech recognition could not understand the audio"
    except sr.RequestError as e:
        return f"Could not request results from Google Web Speech API; {e}"

def calculate_accuracy(recorded_text, expected_text):
    # Implement your accuracy calculation logic here
    # For example, you can compare the recorded_text and expected_text and calculate a percentage match.
    # The accuracy can be calculated in various ways, depending on your requirements.

    # Here's a simple example:
    if recorded_text == expected_text:
        return "100%"
    else:
        return "0%"

if __name__ == '__main__':
    app.run(debug=True, port=8080)

 