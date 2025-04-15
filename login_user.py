import sqlite3
import hashlib

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def login_user(email, password):
    password_hash = hash_password(password)

    conn = sqlite3.connect('users.db')
    cursor = conn.cursor()

    cursor.execute('''
    SELECT * FROM users WHERE email = ? AND password_hash = ?
    ''', (email, password_hash))

    user = cursor.fetchone()
    conn.close()

    if user:
        print(f"Успешный вход. Добро пожаловать, {user[1]} {user[2]}!")
        return True
    else:
        print("Ошибка входа: неверная почта или пароль.")
        return False

if __name__ == "__main__":
    login_user("ivan@example.com", "my_secure_password")
