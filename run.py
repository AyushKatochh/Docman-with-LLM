from flask import Flask, request, jsonify
from chromadb import Client
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer

app = Flask(__name__)

# Initialize ChromaDB client and collection
client = Client(Settings(persist_directory="news"))
book_collection = client.create_collection("book_collection1111")

# Initialize SentenceTransformer model
model = SentenceTransformer('paraphrase-MiniLM-L3-v2')


@app.route('/store', methods=['POST'])
def store_data():
    try:
        # Receive parsed text data from Node.js server
        parsed_text = request.json['parsedText']

        # Process parsed text and add to ChromaDB
        embedding = model.encode(parsed_text).tolist()
        book_collection.add(
            documents=[parsed_text],
            embeddings=[embedding],
            metadatas=[{'source': 'Received from Node.js'}],
            ids=['1']
        )

        return jsonify({'message': 'Data stored successfully'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/getit')
def getdata():
    results = book_collection.query(
    query_texts=["Net Input, yin"],
    n_results=1)
    return results

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
