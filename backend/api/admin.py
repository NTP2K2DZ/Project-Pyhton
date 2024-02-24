from flask import Blueprint, request, jsonify
from firebase_admin import firestore, auth
import uuid

db = firestore.client()

user_Ref = db.collection('user')

userAPI = Blueprint('userAPI', __name__)


def verify_admin_token(token):
    try:
        decoded_token = auth.verify_id_token(token)
        if decoded_token['admin'] == True:
            return True
        else:
            return False
    except Exception as e:
        return False


@userAPI.route('/add', methods=['POST'])
def add_user():
    try:
        token = request.headers.get('Authorization')
        if not verify_admin_token(token):
            return jsonify({"error": "Unauthorized"}), 401
        
        id = str(uuid.uuid4())
        user_Ref.document(id).set(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


@userAPI.route('/list', methods=['GET'])
def list_users():
    try:
        token = request.headers.get('Authorization')
        if not verify_admin_token(token):
            return jsonify({"error": "Unauthorized"}), 401

        all_users = [doc.to_dict() for doc in user_Ref.stream()]
        return jsonify(all_users), 200
    except Exception as e:
        return f"An Error Occurred: {e}"
