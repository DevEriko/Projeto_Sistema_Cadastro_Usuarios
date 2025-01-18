from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
import MySQLdb.cursors
import hashlib
import os
from dotenv import load_dotenv

# Aqui ele irá carregar as variáveis de ambiente do arquivo .env
load_dotenv()

app = Flask(__name__)

#Configuração do Banco de dados
app.config['MYSQL_HOST'] = os.getenv('MYSQL_HOST')
app.config['MYSQL_USER'] = os.getenv('MYSQL_USER')
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD')
app.config['MYSQL_DB'] = os.getenv('MYSQL_DB')

mysql = MySQL(app)

# Rora para cadastrar usuários
@app.route('/cadastrar', methods=['POST'])
def cadastrar_usuario():
    dados = request.json
    nome = dados.get('nome')
    email = dados.get('email')
    senha = dados.get('senha')
    
    if not nome or not email or not senha:
        return jsonify({"erro": "Todos os campos são obrigatórios!"}), 400
    
    # Hash da senha para segurança 
    senha_hash = hashlib.sha256(senha.encode()).hexdigest()
    
    try:
        cursor = mysql.connection.cursor()
        cursor.execute("INSERT INTO usuarios (nome, email, senha) VALUES (%s, %s, %s, %s)", (nome, email, senha))
        mysql.connection.commit()
        cursor.close()
        return jsonify({mensagem: "Usuário cadastrado com sucesso!"}), 201
    except MySQLdb.IntegrityError:
        return jsonify({"erro": "E-mail já cadastrado!"}), 404
    except Exception as e:
        return jsonify({"erro": str(e)}), 500

# Rota para listar usuários
@app.route('/usuarios', methods=['GET'])
def listar_usuarios():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)    
    cursor.execute("SELECT id, nome, email, FROM usuarios")
    usuarios = cursor.fetchall()
    cursor.close()
    return jsonify(usuarios)

if __name__ == '__main__':
    app.run(debug=True)
    