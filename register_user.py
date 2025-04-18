import sqlite3
import hashlib

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def register_user(first_name, last_name, email, password):
    password_hash = hash_password(password)

    try:
        conn = sqlite3.connect('users.db')
        cursor = conn.cursor()

        cursor.execute('''
        INSERT INTO users (first_name, last_name, email, password_hash)
        VALUES (?, ?, ?, ?)
        ''', (first_name, last_name, email, password_hash))

        conn.commit()
        print("Пользователь успешно зарегистрирован.")

    except sqlite3.IntegrityError:
        print("Ошибка: пользователь с такой почтой уже существует.")
    finally:
        conn.close()

if __name__ == "__main__":
    register_user("Иван", "Иванов", "ivan@example.com", "my_secure_password")
