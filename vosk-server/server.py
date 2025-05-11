from flask import Flask, request, jsonify
from flask_cors import CORS
from vosk import Model, KaldiRecognizer
import wave
import json
import traceback  # Import traceback for detailed error info

app = Flask(__name__)
CORS(app)

# Specify the correct path to the model
model = Model(r"C:\Users\User\Mobile Computing\LinguaLift\vosk-server\model")

@app.route("/transcribe", methods=["POST"])
def transcribe():
    try:
        print("Received /transcribe request")  # Debugging log
        if "file" not in request.files:
            print("Error: No file part in request")
            return jsonify({"error": "No file part"}), 400

        file = request.files["file"]
        print(f"Received file: {file.filename}")  # Debugging log

        if not file.filename.endswith(".wav"):
            print("Error: File is not a .wav file")
            return jsonify({"error": "File must be a .wav file"}), 400

        try:
            wf = wave.open(file, "rb")
        except wave.Error as e:
            print(f"Error opening WAV file: {e}")
            return jsonify({"error": f"Error opening WAV file: {e}"}), 400

        rec = KaldiRecognizer(model, wf.getframerate())
        results = []
        while True:
            data = wf.readframes(4000)
            if len(data) == 0:
                break
            if rec.AcceptWaveform(data):
                result = json.loads(rec.Result())
                results.append(result)
                print(f"Partial result: {result}")  # Debug
        final_result = json.loads(rec.FinalResult())
        results.append(final_result)
        print(f"Final result: {final_result}")  # Debug

        text = " ".join(r.get("text", "") for r in results)
        print(f"Transcription: {text}")  # Debugging log
        return jsonify({"text": text})

    except Exception as e:
        error_message = f"An error occurred: {e}"
        print(f"Exception in /transcribe: {error_message}")
        traceback.print_exc()  # Print the full traceback
        return jsonify({"error": error_message}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8082)