from supabase import create_client, Client
from dotenv import load_dotenv
import os
from flask import request, Flask, render_template


# Vinculando ao supabase
load_dotenv()

app = Flask(__name__)

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

supabase: Client = create_client(url, key)

@app.route("/")
def home():
    return render_template("index.html")

@app.route('/feedback', methods=["POST"])
def salvar_feedback():
    dados = request.get_json()

    local = dados.get("local")
    mensagem = dados.get("feedback")
    nota = dados.get("nota")

    response = supabase.table("feedbackBrownies").insert({
        "local": local,
        "feedback": mensagem,
        "nota": nota
    }).execute()

    if response.data is None:
        return {"erro": "Erro ao salvar"}, 500
    return {"mensagem": "Salvo com sucesso!"}, 201
