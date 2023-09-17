 # It gives the accuracy level two ryming word 
```python
import speech_recognition as sr
import difflib

# Function to transcribe audio
def transcribe_audio(audio_file, language):
    recognizer = sr.Recognizer()
    try:
        with sr.AudioFile(audio_file) as source:
            audio_data = recognizer.record(source)
            return recognizer.recognize_google(audio_data, language=language)
    except sr.UnknownValueError:
        print(f"Speech recognition could not understand the audio in {audio_file}.")
        return ""
    except sr.RequestError as e:
        print(f"Could not request results from Google Web Speech API; {e}")
        return ""

# Audio file paths (Replace with your Hindi audio file paths)
audio_file1 = "नमस्ते-.wav"
audio_file2 = "आते-.wav"

# Specify the language for transcription
language = "hi-IN"

# Transcribe the audio files
transcription1 = transcribe_audio(audio_file1, language)
transcription2 = transcribe_audio(audio_file2, language)

# Check for empty transcriptions
if not transcription1 or not transcription2:
    print("Error: Transcription failed for one or more audio files.")
else:
    # Calculate the Levenshtein distance between the two transcriptions
    levenshtein_distance = difflib.SequenceMatcher(None, transcription1, transcription2).ratio() * 100

    # Calculate the accuracy
    accuracy = 100 - levenshtein_distance

    # Print the accuracy
    print(f"Accuracy: {accuracy:.2f}%")

    ``````

# Om Tanmaya pati Accuracy is good 
import os
import speech_recognition as sr
import difflib
from flask import Flask, request, render_template

app = Flask(__name__)

# Function to transcribe audio
def transcribe_audio(audio_file, language):
    recognizer = sr.Recognizer()
    try:
        with sr.AudioFile(audio_file) as source:
            audio_data = recognizer.record(source)
            return recognizer.recognize_google(audio_data, language=language)
    except sr.UnknownValueError:
        print(f"Speech recognition could not understand the audio in {audio_file}.")
        return ""
    except sr.RequestError as e:
        print(f"Could not request results from Google Web Speech API; {e}")
        return ""

def calculate_accuracy(transcription1, transcription2):
    total_characters = max(len(transcription1), len(transcription2))
    correct_characters = sum(a == b for a, b in zip(transcription1, transcription2))
    accuracy = (correct_characters / total_characters) * 100
    return accuracy

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        # Check if audio file and language are provided
        if 'audio_file' not in request.files or 'language' not in request.form:
            return "Please provide both an audio file and the language."

        audio_file = request.files['audio_file']
        language = request.form['language']

        if audio_file.filename == '':
            return "Please select an audio file."

        # Save the uploaded audio file to a temporary location
        temp_audio_file = 'temp.wav'
        audio_file.save(temp_audio_file)

        # Transcribe the uploaded audio file
        transcription2 = transcribe_audio(temp_audio_file, language)

        # Check for empty transcription
        if not transcription2:
            return "Error: Transcription failed for the uploaded audio file."

        # Transcribe the existing audio file
        audio_file1 = "bhabhi.wav"  # Replace with your existing audio file path
        transcription1 = transcribe_audio(audio_file1, language)

        # Calculate the accuracy
        accuracy = calculate_accuracy(transcription1, transcription2)

        return f"Accuracy: {accuracy:.2f}%"

    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True, port=8080)  # Use a different port (e.g., 8080)

#Om tanmaya pati Accuracy  index.html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Audio Comparison</title>
    <!-- Add Tailwind CSS -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">
    <!-- Add Swiper CSS and JavaScript -->
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
    <link rel="stylesheet" href="style.css">
 <style>
   #word-container {
    position: absolute;
    top: 70px;  
    right: 20px; 
    background: rgb(22,18,89);
    background: linear-gradient(90deg, rgba(22,18,89,1) 0%, rgba(63,63,187,1) 43%, rgba(0,212,255,1) 91%);  
    border: 1px solid #ccc;
    padding: 10px;
}

.word-box {
    margin-bottom: 10px;
    border: black solid transparent;
    font-weight: bold;
}

.relative:hover .absolute {
    display: block;
    z-index: 10;
}

.hidden {
    display: none;
}

.word {
    padding: 10px;
    border: 5px solid #000000;
    margin: 5px;
    display: inline-block;
}
  
 
 
 </style>
   
</head>
<body class="bg-cover bg-center bg-fixed" style="background-image: url('background.jpg');">
    <nav class="bg-gray-800 text-white p-4">
        <div class="container mx-auto flex justify-between items-center">
            <a class="text-2xl font-bold flex items-center" href="#">
                <img src="https://cdn-icons-png.flaticon.com/128/1903/1903256.png" alt="Logo" class="w-8 mr-2"> Audio Comparison
            </a>
            <ul class="flex space-x-4">
                <li><a href="#" class="hover:text-gray-400">Home</a></li>
                <li><a href="#" class="hover:text-gray-400">About</a></li>
                <li><a href="#" class="hover:text-gray-400">Contact</a></li>
                <li class="relative group">
                    <a href="#" class="hover:text-gray-400" id="show-words">Available Words (Hindi)</a>
                </li>
                 
            </ul>
        </div>
    </nav>
    <div id="word-container" class="hidden">
        <div class="word-box">
            <div class="word">Word 1</div>
            <div class="word">Word 2</div>
            <div class="word">Word 3</div>
        </div>
        <div class="word-box">
            <div class="word">Word 4</div>
            <div class="word">Word 5</div>
            <div class="word">Word 6</div>
        </div>
        <div class="word-box">
            <div class="word">Word 7</div>
            <div class="word">Word 8</div>
            <div class="word">Word 9</div>
        </div>
    </div>
    
    <!-- Audio Compaision part  -->
    <div class="container mx-auto p-8">
        <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 class="text-3xl font-semibold text-center mb-6">Audio Comparison</h1>
            <form method="POST" enctype="multipart/form-data">
                <div class="mb-4">
                    <label for="audio_file" class="block text-gray-700 text-sm font-bold mb-2">Upload an Audio File:</label>
                    <input type="file" name="audio_file" accept=".wav" class="border rounded-lg py-2 px-3 w-full">
                </div>
                <div class="mb-4">
                    <label for="language" class="block text-gray-700 text-sm font-bold mb-2">Language (e.g., hi-IN):</label>
                    <input type="text" name="language" required class="border rounded-lg py-2 px-3 w-full">
                </div>
                <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full">Compare</button>
            </form>
        </div>
    </div>

   
    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-4">
        <div class="container mx-auto text-center">
            &copy; 2023 Audio Comparison. All rights reserved.
        </div>
    </footer>

    <!-- Add Tailwind CSS JavaScript (optional) -->
    <script src="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.js"></script>
    <script>
       const showWordsLink = document.getElementById('show-words');
    const wordContainer = document.getElementById('word-container');

    showWordsLink.addEventListener('click', () => {
        wordContainer.classList.toggle('hidden');
    });
    </script>
     
</body>
</html>

# ----------------------------------------------------------------------------------------

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Audio Comparison</title>
    <!-- Add Tailwind CSS -->
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.16/dist/tailwind.min.css" rel="stylesheet">
    <!-- Add Swiper CSS and JavaScript -->
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
    <link rel="stylesheet" href="style.css">
    <style>
        .category-box {
            margin-bottom: 20px;
            padding: 20px;
        }
        .category-title {
            font-size: 1.5rem;
            font-weight: bold;
        }
        .word-list {
            list-style-type: disc;
            padding-left: 20px;
        }
        .word-list-item {
            margin: 5px 0;
        }
    </style>
</head>
<body class="bg-cover bg-center bg-fixed" style="background-image: url('background.jpg');">
<nav class="bg-gray-800 text-white p-4">
    <div class="container mx-auto flex justify-between items-center">
        <a class="text-2xl font-bold flex items-center" href="#">
            <img src="https://cdn-icons-png.flaticon.com/128/1903/1903256.png" alt="Logo" class="w-8 mr-2"> Audio Comparison
        </a>
        <ul class="flex space-x-4">
            <li><a href="#" class="hover:text-gray-400">Home</a></li>
            <li><a href="#" class="hover:text-gray-400">About</a></li>
            <li><a href="#" class="hover:text-gray-400">Contact</a></li>
            <li class="relative group">
                <a href="#" class="hover:text-gray-400" id="show-words">Available Words (Hindi)</a>
            </li>
        </ul>
    </div>
</nav>

<!-- Suggested Word box -->
<div class="container mx-auto p-8">
    <div class="max-w-md mx-auto bg-white p-4 rounded-lg shadow-lg mb-4">
        <h2 class="text-2xl font-semibold text-center mb-2">Suggested Words for Upload:</h2>
        <div class="flex flex-wrap justify-center" id="suggested-words-list">
            <!-- Suggested words will be dynamically added here -->
        </div>
    </div>
</div>

<!-- Audio Comparison part -->
<div class="container mx-auto p-8">
    <div class="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 class="text-3xl font-semibold text-center mb-6">Audio Comparison</h1>
        <form method="POST" enctype="multipart/form-data" id="audio-form">
            <!-- Language selection -->
            <div class="mb-4">
                <label for="language" class="block text-gray-700 text-sm font-bold mb-2">Language (e.g., hi-IN):</label>
                <input type="text" name="language" required class="border rounded-lg py-2 px-3 w-full">
            </div>
            <!-- File upload fields (up to 30) -->
            <div class="mb-4" id="file-uploads">
                <!-- Initially, you have 2 file input fields. You can add more if needed. -->
                <label for="audio_file" class="block text-gray-700 text-sm font-bold mb-2">Upload Audio Files:</label>
                <input type="file" name="audio_file_1" accept=".wav" class="border rounded-lg py-2 px-3 w-full mb-2">
                <input type="file" name="audio_file_2" accept=".wav" class="border rounded-lg py-2 px-3 w-full mb-2">
            </div>
            <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full">Compare</button>
        </form>
        <!-- Button to add more file upload fields -->
        <button type="button" class="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full w-full" id="add-file-upload">Add More Audio Files</button>
    </div>
</div>

<script>
    // Your JSON database containing word data
    const wordDatabase = {
        "क": {
            "कागज": "कागज",
            "कंगन": "कंगन",
            "कमल": "कमल"
        },
        "ख": {
            "खटखटाना": "खटखटाना",
            "खून": "खून",
            "खाना": "खाना"
        },
        "ग": {
            "गंगा": "गंगा",
            "गणेश": "गणेश",
            "घोड़ा": "घोड़ा"
        },
        "घ": {
            "घड़ी": "घड़ी",
            "घना": "घना",
            "घूमना": "घूमना"
        },
        "च": {
            "चश्मा": "चश्मा",
            "चाँद": "चाँद",
            "चीज़": "चीज़"
        },
        "छ": {
            "छत": "छत",
            "छिपना": "छिपना",
            "छड़ी": "छड़ी"
        },
        "ज": {
            "जमीन": "जमीन",
            "जाँघ": "जाँघ",
            "जंगल": "जंगल"
        },
        "झ": {
            "झरना": "झरना",
            "झूठ": "झूठ",
            "झपकी": "झपकी"
        },
        "ट": {
            "ताला": "ताला",
            "टेबल": "टेबल",
            "तकिया": "तकिया"
        },
        "ठ": {
            "ठंडा": "ठंडा",
            "ठोकर": "ठोकर",
            "ठहरना": "ठहरना"
        },
        "ड": {
            "दादा": "दादा",
            "दर्द": "दर्द",
            "दीवार": "दीवार"
        },
        "ढ": {
            "ढक्कन": "ढक्कन",
            "ढेर": "ढेर",
            "ढोना": "ढोना"
        },
        "त": {
            "ताली": "ताली",
            "ताजा": "ताजा",
            "तितली": "तितली"
        },
        "थ": {
            "थकान": "थकान",
            "थूकना": "थूकना",
            "थाली": "थाली"
        },
        "द": {
            "दादा": "दादा",
            "दर्द": "दर्द",
            "दीवार": "दीवार"
        },
        "ध": {
            "धोना": "धोना",
            "धूप": "धूप",
            "ढोल": "ढोल"
        },
        "न": {
            "नदी": "नदी",
            "नाखून": "नाखून",
            "नाम": "नाम"
        },
        "प": {
            "पेड़": "पेड़",
            "पैसा": "पैसा",
            "पानी": "पानी"
        },
        "फ": {
            "फूल": "फूल",
            "फसल": "फसल",
            "फ़ोन": "फ़ोन"
        },
        "ब": {
            "बाँस": "बाँस",
            "बादल": "बादल",
            "बच्चा": "बच्चा"
        },
        "भ": {
            "भगवत": "भगवत",
            "भात": "भात",
            "भ्रम": "भ्रम"
        },
        "म": {
            "माँ": "माँ",
            "मतलब": "मतलब",
            "मकान": "मकान"
        },
        "य": {
            "यार": "यार",
            "यातायात": "यातायात",
            "योग": "योग"
        },
        "र": {
            "राम": "राम",
            "रोटी": "रोटी",
            "रस": "रस"
        },
        "ल": {
            "लाख": "लाख",
            "लहसुन": "लहसुन",
            "लाल": "लाल"
        },
        "व": {
            "वायु": "वायु",
            "वृक्ष": "वृक्ष",
            "वन": "वन"
        },
        "श": {
            "शांति": "शांति",
            "शाम": "शाम",
            "शुद्ध": "शुद्ध"
        },
        "ष": {
            "षड़यंत्र": "षड़यंत्र",
            "षट्कोण": "षट्कोण",
            "षट्पद": "षट्पद"
        },
        "स": {
            "साँस": "साँस",
            "साग": "साग",
            "सड़क": "सड़क"
        },
        "ह": {
            "हाथ": "हाथ",
            "हँसना": "हँसना",
            "हवा": "हवा"
        }
    };

    // Get 10 random categories
    const categories = Object.keys(wordDatabase).sort(() => Math.random() - 0.5).slice(0, 10);

    const suggestedWordsList = document.getElementById('suggested-words-list');

    categories.forEach(category => {
        const words = Object.keys(wordDatabase[category]);
        const categoryBox = document.createElement('div');
        categoryBox.classList.add('category-box');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.textContent = `${category}`;

        const wordList = document.createElement('ul');
        wordList.classList.add('word-list');

        words.forEach(word => {
            const listItem = document.createElement('li');
            listItem.classList.add('word-list-item');
            listItem.textContent = word;
            wordList.appendChild(listItem);
        });

        categoryBox.appendChild(categoryTitle);
        categoryBox.appendChild(wordList);
        suggestedWordsList.appendChild(categoryBox);
    });

    // Add more file upload fields dynamically
    const addFileUploadButton = document.getElementById('add-file-upload');
    const fileUploadContainer = document.getElementById('file-uploads');
    let fileUploadCount = 2; // Initial count

    addFileUploadButton.addEventListener('click', () => {
        if (fileUploadCount < 30) {
            fileUploadCount++;
            const newInput = document.createElement('input');
            newInput.type = 'file';
            newInput.name = `audio_file_${fileUploadCount}`;
            newInput.accept = '.wav';
            newInput.classList.add('border', 'rounded-lg', 'py-2', 'px-3', 'w-full', 'mb-2');
            fileUploadContainer.appendChild(newInput);
        } else {
            addFileUploadButton.disabled = true; // Disable button after reaching the maximum
        }
    });
</script>
</body>
</html>
# -------------------------------------------------------------
import os
import speech_recognition as sr
from flask import Flask, request, render_template, jsonify

app = Flask(__name__)

# Your JSON database containing word data
word_database = {
    "क": {
        "कागज": {
            "hindi": "कागज",
            "english": "paper",
            "meaning": "a thin material used for writing, printing, or drawing on",
            "audio_file_path": "audio/क/कागज.wav"
        },
        "कंगन": {
            "hindi": "कंगन",
            "english": "bangle",
            "meaning": "a rigid bracelet or anklet, typically made of metal, wood, or glass",
            "audio_file_path": "audio/क/कंगन.wav"
        },
        "कमल": {
            "hindi": "कमल",
            "english": "lotus",
            "meaning": "a type of aquatic plant with large, beautiful flowers",
            "audio_file_path": "audio/क/कमल.wav"
        }
    },
    "ख": {
        "खटखटाना": {
            "hindi": "खटखटाना",
            "english": "knock",
            "meaning": "to strike a surface with force, typically to get someone's attention",
            "audio_file_path": "audio/ख/खटखटाना.wav"
        },
        "खून": {
            "hindi": "खून",
            "english": "blood",
            "meaning": "the red liquid that circulates in the arteries and veins of humans and other animals, carrying oxygen to and from the tissues",
            "audio_file_path": "audio/ख/खून.wav"
        },
        "खाना": {
            "hindi": "खाना",
            "english": "food",
            "meaning": "any substance that can be consumed by living organisms to provide energy and nutrients",
            "audio_file_path": "audio/ख/खाना.wav"
        }
    }
}

# Function to transcribe audio
def transcribe_audio(audio_file, language):
    recognizer = sr.Recognizer()
    try:
        with sr.AudioFile(audio_file) as source:
            audio_data = recognizer.record(source)
            return recognizer.recognize_google(audio_data, language=language)
    except sr.UnknownValueError:
        print(f"Speech recognition could not understand the audio in {audio_file}.")
        return ""
    except sr.RequestError as e:
        print(f"Could not request results from Google Web Speech API; {e}")
        return ""

# Function to check if the selected word exists in the database
def word_exists_in_database(selected_word, category):
    if category in word_database and selected_word in word_database[category]:
        return True
    return False

@app.route('/', methods=['GET', 'POST'])
def index():
    categories = list(word_database.keys())

    if request.method == 'POST':
        # Check if language and selected word are provided
        if 'language' not in request.form or 'selected_word' not in request.form or 'selected_category' not in request.form:
            return "Please provide a language, category, and selected word."

        language = request.form['language']
        selected_word = request.form['selected_word']
        selected_category = request.form['selected_category']

        # Check if the selected word exists in the database for the selected category
        if not word_exists_in_database(selected_word, selected_category):
            return f"Error: '{selected_word}' does not exist in the database for category '{selected_category}'."

        # Perform audio transcription and accuracy calculation as needed
        # (You can modify this part based on your requirements)

    return render_template('index.html', categories=categories)

if __name__ == '__main__':
    app.run(debug=True, port=8080)  # Use a different port (e.g., 8080)

