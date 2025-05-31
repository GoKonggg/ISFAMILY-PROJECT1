import os
import sys
from flask import Flask, request, jsonify, send_from_directory
import requests
from dotenv import load_dotenv

load_dotenv()  # load .env file

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    # Tidak ketemu di environment → langsung hentikan program
    sys.exit("❌  OPENAI_API_KEY belum ter-set. Pastikan ada di file .env dan namanya tepat.")
else:
    print("✅  OPENAI_API_KEY terdeteksi panjang:", len(OPENAI_API_KEY))

app = Flask(__name__, static_folder="public")

@app.route('/')
def index():
    # Default route, bisa redirect ke file HTML utama
    return send_from_directory(app.static_folder, 'ai-check.html')

@app.route('/<path:filename>')
def serve_static(filename):
    # Untuk serve file statis lain
    return send_from_directory(app.static_folder, filename)

@app.route('/cek-fakta', methods=['POST'])
def cek_fakta():
    data = request.json
    claim = data.get('claim', '')

    prompt = f'''Klaim: "{claim}"

Tolong verifikasi kebenaran klaim ini secara medis dan parenting. Jawablah dengan format berikut (dan hanya dalam format ini):

✅ Status Klaim: (Benar / Salah / Tidak Diketahui)
🧠 Penjelasan: (jelaskan dengan bahasa sederhana)
📚 Sumber: (sebutkan nama artikel dan link, atau tulis "Tidak ditemukan referensi yang disebutkan")
'''

    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": "gpt-4o",
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.2,
        "max_tokens": 600
    }
    try:
        response = requests.post(
            "https://api.openai.com/v1/chat/completions",
            headers=headers,
            json=payload,
            timeout=60
        )
        response.raise_for_status()
        hasil = response.json()['choices'][0]['message']['content']
        return jsonify({"hasil": hasil})
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": "Gagal memproses klaim."}), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)

