
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_pymongo import PyMongo
import os
import pandas as pd
import re
from io import StringIO
import contextlib

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# MongoDB Configuration
app.config["MONGO_URI"] = "mongodb://localhost:27017/sustainable_products"
mongo = PyMongo(app)

# Initialize database with sample data if empty
@app.before_first_request
def initialize_db():
    if mongo.db.products.count_documents({}) == 0:
        # Load the pickle file data for initialization
        current_dir = os.path.dirname(os.path.abspath(__file__))
        pickle_path = os.path.join(os.path.dirname(current_dir), 'sustainable_products_tool.pkl')
        
        try:
            import cloudpickle as pickle
            with open(pickle_path, 'rb') as f:
                data = pickle.load(f)
            
            df = data["df"]
            
            # Convert DataFrame rows to documents and insert into MongoDB
            for index, row in df.iterrows():
                product = {
                    "name": row["Product Name"],
                    "brand": row["Brand"],
                    "price": float(row["Price"].replace("$", "")),
                    "ecoScore": row["EcoScore (1-5)"],
                    "carbonFootprint": row["Carbon Footprint (kg CO2e)"],
                    "organicLabel": bool(row["Organic Label"]),
                    "recyclableMaterial": bool(row["Recyclable Material"]),
                    "imageUrl": row["Image URL"] if pd.notna(row["Image URL"]) else "/placeholder.svg",
                    "type": row["Type of the Product"],
                    "sustainabilityScore": None  # Will be calculated on retrieval
                }
                mongo.db.products.insert_one(product)
            
            print(f"Initialized database with {df.shape[0]} products")
        except Exception as e:
            print(f"Error initializing database: {e}")

@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        # Get search query from request parameters
        search_query = request.args.get('query', '')
        print(f"Search query: {search_query}")  # Debug print
        
        if not search_query:
            # If no query, return all products
            products = list(mongo.db.products.find({}, {'_id': 0}))
        else:
            # Parse search terms
            search_terms = search_query.lower().split()
            
            # Create regex query that matches all terms
            regex_queries = []
            for term in search_terms:
                regex_pattern = re.compile(f".*{re.escape(term)}.*", re.IGNORECASE)
                regex_queries.append({
                    "$or": [
                        {"name": regex_pattern},
                        {"brand": regex_pattern},
                        {"type": regex_pattern}
                    ]
                })
            
            # Find products matching all terms
            query = {"$and": regex_queries} if regex_queries else {}
            products = list(mongo.db.products.find(query, {'_id': 0}))
            
            # Calculate sustainability score for each product
            for product in products:
                product['sustainabilityScore'] = (
                    product['ecoScore'] * 2
                    - product['carbonFootprint']
                    + (1 if product['organicLabel'] else 0)
                    + (1 if product['recyclableMaterial'] else 0)
                )
            
            # Sort by sustainability score
            products = sorted(products, key=lambda x: x.get('sustainabilityScore', 0), reverse=True)
        
        print(f"Found {len(products)} products")  # Debug print
        
        return jsonify({
            'success': True,
            'data': products
        })
    except Exception as e:
        print(f"Error: {str(e)}")  # Debug print
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/add-product', methods=['POST'])
def add_product():
    try:
        data = request.json
        
        # Ensure required fields are present
        required_fields = ['name', 'brand', 'price', 'ecoScore', 'carbonFootprint', 'type']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'error': f"Missing required field: {field}"
                }), 400
        
        # Calculate sustainability score
        sustainability_score = (
            data['ecoScore'] * 2
            - data['carbonFootprint']
            + (1 if data.get('organicLabel', False) else 0)
            + (1 if data.get('recyclableMaterial', False) else 0)
        )
        
        # Add sustainability score to data
        data['sustainabilityScore'] = sustainability_score
        
        # Insert into MongoDB
        mongo.db.products.insert_one(data)
        
        return jsonify({
            'success': True,
            'message': "Product added successfully!"
        })
    except Exception as e:
        print(f"Error adding product: {str(e)}")
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5003)
