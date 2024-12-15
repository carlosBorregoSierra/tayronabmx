#Codigo para insertar datos a la bdd

import psycopg2
from flask import Flask, request, jsonify, render_template

app = Flask(__name__, template_folder='../templates')

@app.route('/inscripcion')
def inscripcion():
    return render_template('inscripcion.html')

@app.route('/')
def home():            
    return render_template('index.html')

@app.route('/mensualidad')
def mensualidad():            
    return render_template('mensualidad.html')

# Configuración de la base de datos
DB_CONFIG = {
    'dbname': 'bmx_database',
    'user': 'bmx_user',
    'password': 'password123',
    'host': 'localhost', #IP del servidor local
    'port': 5432 # Puerto por defecto de PostgreSQL
}

def connect_db():
    return psycopg2.connect(**DB_CONFIG)

# Ruta para probar la conexión a la base de datos
@app.route('/test_db', methods=['GET'])
def test_db():
    try:
        conn = connect_db()
        cursor = conn.cursor()
        cursor.execute("SELECT 1;")  # Comando básico para verificar conexión
        result = cursor.fetchone()
        return jsonify({"message": "¡Conexión exitosa con PostgreSQL!", "result": result}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if conn:
            cursor.close()
            conn.close()

@app.route('/register', methods=['POST'])
def register():
    data = request.json

    # Extraer datos del formulario
    rider_data = data.get('rider')
    acudiente_data = data.get('acudiente')

    try:
        conn = connect_db()
        cursor = conn.cursor()

        # Insertar datos del rider
        cursor.execute(
            """ 
            INSERT INTO riders (nombre, apellido1, apellido2, fecha_nacimiento, foto)
            VALUES (%s, %s, %s, %s, %s) RETURNING id;
            """,
            (rider_data['nombre'], rider_data['apellido1'], rider_data['apellido2'], 
            rider_data['fecha_nacimiento'], rider_data['foto'])
        )
        rider_id = cursor.fetchone()[0]

        # Insertar datos del acudiente
        cursor.execute(
            """
            INSERT INTO acudientes (rider_id, nombre, apellido1, apellido2, email, celular)
            VALUES (%s, %s, %s, %s, %s, %s);
            """,
            (rider_id, acudiente_data['nombre'], acudiente_data['apellido1'], 
             acudiente_data['apellido2'], acudiente_data['email'], 
             acudiente_data['celular'])
        )

        conn.commit()
        return jsonify({"message": "Registro exitoso"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 400

    finally:
        if conn:
            cursor.close()
            conn.close()

if __name__ == '__main__':
    app.run(debug=True)