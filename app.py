from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
import MySQLdb.cursors
import hashlib

app = Flask(__name__)

#Configuração do Banco de dados
app.config['MYSQL_HOST'] = 'localhost'