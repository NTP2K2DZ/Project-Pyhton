from flask import Blueprint, request, jsonify
from firebase_admin import firestore, auth
import uuid

db = firestore.client()

user_Ref = db.collection('user')

userAPI = Blueprint('userAPI', __name__)


# def verify_admin_token(token):
#     try:
#         decoded_token = auth.verify_id_token(token)
#         if decoded_token['admin'] == True:
#             return True
#         else:
#             return False
#     except Exception as e:
#         return False


@userAPI.route('/register', methods=['POST'])
def register_user():
    try:
        data = request.json
        email = data.get('email')
        password = data.get('password')
        username = data.get('username') 

        user = auth.create_user(email=email, password=password, display_name=username)
        
        user_data = {
            'email': email,
            'password':password,
            'username': username,
        }
        user_Ref.document(user.uid).set(user_data)

        return jsonify({"success": True}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400


# @userAPI.route('/login', methods=['POST'])
# def login_user():
#     try:
#         email = request.json['email']
#         password = request.json['password']
#         user = auth.sign_in_with_email_and_password(email, password)
        
#         return jsonify({"user_id": "Đăng nhập thành công"}), 200
#     except Exception as e:
#         return jsonify({"error": "Invalid credentials"}), 401
    
@userAPI.route('/login', methods=['POST'])
def login_user():
    try:
        email = request.json['email']
        password = request.json['password']

        # Tìm kiếm tài khoản trong collection 'user'
        user_query = user_Ref.where('email', '==', email).where('password', '==', password).limit(1).get()
        user_data = user_query[0].to_dict() if user_query else None
        if user_data:
            # Đăng nhập thành công
            return jsonify({"user_id": "Đăng nhập thành công"}), 200
        else:
            return jsonify({"error": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"error": "Invalid credentials"}), 401

@userAPI.route('/login_admin', methods=['POST'])
def login_admin():
    try:
        username = request.json['username']
        password = request.json['password']

        # Tìm kiếm tài khoản trong collection 'user' với username và password
        user_query = user_Ref.where('username', '==', username).where('password', '==', password).limit(1).get()
        user_data = user_query[0].to_dict() if user_query else None
        
        if user_data:
            # Kiểm tra vai trò của người dùng
            if 'role' in user_data and user_data['role'] == 'isAdmin':
                # Đăng nhập thành công
                return jsonify({"user_id": "Đăng nhập thành công"}), 200
            else:
                return jsonify({"error": "Unauthorized access"}), 403  # 403: Forbidden
        else:
            return jsonify({"error": "Invalid credentials"}), 401  # 401: Unauthorized
    except Exception as e:
        return jsonify({"error": "Invalid credentials"}), 401
