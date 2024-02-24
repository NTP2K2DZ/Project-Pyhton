from flask import Blueprint, request, jsonify
from firebase_admin import firestore
import uuid

db = firestore.client()

product_Ref = db.collection('products')

productsAPI = Blueprint('productsAPI', __name__) 

@productsAPI.route('/add', methods=['POST'])
def add_product():
    try:
        id = str(uuid.uuid4())
        product_Ref.document(id).set(request.json)
        return jsonify({"success": True, "id": id}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"
    
    
@productsAPI.route('/list', methods=['GET']) 
def list_products():
    try:
        all_products = []
        docs = product_Ref.stream()
        for doc in docs:
            product_data = doc.to_dict()
            product_data['id'] = doc.id
            all_products.append(product_data)
        return jsonify(all_products), 200
    except Exception as e:
        return f"An Error Occurred: {e}"
    
@productsAPI.route('/update/<string:id>', methods=['PUT'])
def update_product(id):
    try:
        product_Ref.document(id).update(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@productsAPI.route('/delete/<string:id>', methods=['DELETE'])
def delete_product(id):
    try:
        product_Ref.document(id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    
@productsAPI.route('/search', methods=['GET'])
def search_products():
    try:
        search_query = request.args.get('title') # Lấy giá trị tên từ query string nếu có
        if search_query:
            search_results = []
            # Thực hiện truy vấn để tìm kiếm các sản phẩm có tên chứa từ khóa tìm kiếm
            docs = product_Ref.where('title', '>=', search_query).where('title', '<=', search_query + u'\uf8ff').stream()
            for doc in docs:
                product_data = doc.to_dict()
                product_data['id'] = doc.id
                search_results.append(product_data)
            return jsonify(search_results), 200
        else:
            return jsonify({"success": False, "error": "No search query provided"}), 400
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


# from flask import Blueprint, request, jsonify
# from firebase_admin import firestore
# import uuid

# db = firestore.client()

# product_Ref = db.collection('products')

# productsAPI = Blueprint('productsAPI', __name__) 

# @productsAPI.route('/add', methods=['POST'])
# def add_product():
#     try:
#         id = str(uuid.uuid4())
#         product_Ref.document(id).set(request.json)
#         return jsonify({"success": True, "id": id}), 200
#     except Exception as e:
#         return jsonify({"success": False, "error": str(e)}), 500

# @productsAPI.route('/list', methods=['GET']) 
# def list_products():
#     try:
#         all_products = []
#         for idx, doc in enumerate(product_Ref.stream()):
#             product_data = doc.to_dict()
#             product_data['id'] = doc.id
#             all_products.append(product_data)
#         return jsonify(all_products), 200
#     except Exception as e:
#         return jsonify({"success": False, "error": str(e)}), 500

