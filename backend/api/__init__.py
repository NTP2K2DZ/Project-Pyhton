from flask import Flask
from firebase_admin import credentials, initialize_app
from flask_cors import CORS  # Import CORS

cred = credentials.Certificate("D:/Flask/myproject/backend/api/key.json")

default_app = initialize_app(cred)

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'g9b5faBMcwDelEZ37Qgg9vPY88LjPp0v8tsqaLP3'

    # Use CORS with all origins
    CORS(app)

    from .userAPI import userAPI
    from .productsAPI import productsAPI
    app.register_blueprint(userAPI, url_prefix='/user')
    app.register_blueprint(productsAPI, url_prefix='/products')
    return app
