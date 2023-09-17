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
audio_file1 = "bhabhi.wav"
audio_file2 = "नमस्ते-.wav"

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
