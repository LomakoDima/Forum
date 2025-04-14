from flask import Flask, request, render_template, redirect, url_for, flash, jsonify
import sqlite3
import hashlib

app = Flask(__name__)
app.secret_key = 'supersecretkey'  # Нужен для flash-сообщений

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def connect_db():
    return sqlite3.connect('users.db')

@app.route('/')
def home():
    return render_template('index.html')  # Убедись, что HTML лежит в папке "templates"

@app.route('/register', methods=['POST'])
def register():
    data = request.form
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    email = data.get('email')
    password = data.get('password')
    confirm = data.get('confirm')

    if password != confirm:
        flash('Пароли не совпадают')
        return redirect(url_for('home'))

    conn = connect_db()
    cursor = conn.cursor()

    try:
        cursor.execute('''
            INSERT INTO users (first_name, last_name, email, password_hash)
            VALUES (?, ?, ?, ?)
        ''', (first_name, last_name, email, hash_password(password)))
        conn.commit()
        flash('Регистрация прошла успешно')
    except sqlite3.IntegrityError:
        flash('Пользователь с такой почтой уже существует')
    finally:
        conn.close()

    return redirect(url_for('home'))

@app.route('/login', methods=['POST'])
def login():
    data = request.form
    email = data.get('email')
    password = data.get('password')

    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM users WHERE email = ? AND password_hash = ?', (email, hash_password(password)))
    user = cursor.fetchone()
    conn.close()

    if user:
        flash(f'Добро пожаловать, {user[1]}!')
    else:
        flash('Неверная почта или пароль')

    return redirect(url_for('home'))

if __name__ == '__main__':
    app.run(debug=True)
