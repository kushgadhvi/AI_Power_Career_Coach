from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import analyze_text

app = Flask(__name__)

CORS(app)

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ALLOWED_EXTENSIONS = {'pdf'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/analyze', methods=['POST'])
def upload_file():
    if 'file' not in request.files or 'job_post' not in request.form:
        return jsonify({"error": "File and text are required"}), 400
    
    file = request.files['file']
    job_post = request.form['job_post'] 

    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400
    if file and allowed_file(file.filename):
        filename = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filename)

        json_openai_response = analyze_text.analyze_text_with_openai(file, job_post)
        json_openai_response = json_openai_response[8:]
        json_openai_response = json_openai_response[:-4]

        return json_openai_response, 200
    else:
        return jsonify({"error": "Invalid file type. Only PDF files are allowed."}), 400

if __name__ == '__main__':
    app.run(debug=True)


