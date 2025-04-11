from flask import Flask, jsonify, request
from flask_cors import CORS
import cloudpickle as pickle
import os
import pandas as pd
import numpy as np
import re
from io import StringIO
import contextlib

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the pickle file
current_dir = os.path.dirname(os.path.abspath(__file__))
pickle_path = os.path.join(os.path.dirname(current_dir), 'sustainable_products_tool.pkl')

print(f"Loading pickle file from: {pickle_path}")
with open(pickle_path, 'rb') as f:
    data = pickle.load(f)

df = data["df"]
original_find_sustainable_products = data["function"]

print(f"Loaded DataFrame shape: {df.shape}")
print(f"DataFrame columns: {df.columns.tolist()}")

def find_sustainable_products(user_query, df):
    # Capture printed output
    output = StringIO()
    with contextlib.redirect_stdout(output):
        original_find_sustainable_products(user_query, df)
    
    # Get the printed output
    printed_output = output.getvalue()
    
    # Get the actual DataFrame results
    # Define stopwords
    stopwords = set(["for", "is", "a", "the", "which", "and", "of", "with", "to", "in"])

    # Clean and tokenize query
    query_words = re.findall(r'\b\w+\b', user_query.lower())
    keywords = [word for word in query_words if word not in stopwords]

    # Filter rows that match all keywords in Product Name or Type
    def row_matches_all_keywords(row):
        text = f"{row['Product Name']} {row['Type of the Product']}".lower()
        return all(kw in text for kw in keywords)

    relevant_df = df[df.apply(row_matches_all_keywords, axis=1)].copy()

    if relevant_df.empty:
        return pd.DataFrame()

    # Calculate sustainability score
    relevant_df['Predicted Sustainability'] = (
        relevant_df['EcoScore (1-5)'] * 2
        - relevant_df['Carbon Footprint (kg CO2e)']
        + relevant_df['Organic Label'].astype(int)
        + relevant_df['Recyclable Material'].astype(int)
    )

    sorted_df = relevant_df.sort_values(by='Predicted Sustainability', ascending=False)
    
    columns_to_show = ['Product Name', 'Brand', 'Price', 'EcoScore (1-5)',
                      'Carbon Footprint (kg CO2e)', 'Organic Label',
                      'Recyclable Material', 'Image URL', 'Predicted Sustainability']
    
    return sorted_df[columns_to_show].head(5)

@app.route('/api/sustainable-products', methods=['GET'])
def get_sustainable_products():
    try:
        # Get search query from request parameters
        search_query = request.args.get('query', '')
        print(f"Search query: {search_query}")  # Debug print
        
        if not search_query:
            # If no query, return all products
            products = df.to_dict('records')
        else:
            # Use the search function to find relevant products
            results_df = find_sustainable_products(search_query, df)
            products = results_df.to_dict('records')
        
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

if __name__ == '__main__':
    app.run(debug=True, port=5003) 