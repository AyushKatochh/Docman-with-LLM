import { ChromaClient, GoogleGenerativeAiEmbeddingFunction } from "chromadb";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Retrieve Google API key from environment variable
const googleApiKey = process.env.GOOGLE_API_KEY;

// Check if the API key is defined
if (!googleApiKey) {
  console.error("Google API key is not defined. Make sure to set it in the .env file.");
  process.exit(1); // Exit the process with an error code
}

const embedder = new GoogleGenerativeAiEmbeddingFunction({
  googleApiKey: googleApiKey,
});

// Define an async function to use the await keyword
export async function initializeEmbedding() {
  const client = new ChromaClient({ path: "http://localhost:8000" });
  let collection = await client.createCollection({
    name: "Ayush21",
    embeddingFunction: embedder,
  });

  await collection.add({
    ids: ["doc1", "docs"],
    embeddings: [[1.1, 2.3, 3.2], [4.5, 6.9, 4.4]],
    documents: ["doc1", "doc2"],
    metadatas: [{"chapter": "3", "verse": "12"}, {"chapter": "4", "verse": "5"},]
  });

  let count = collection.count();
  console.log("Count: ", count);

  // Retrieve the contents of the collection
  const collectionGet = await client.getCollection({
    name: "Ayush21",
    embeddingFunction: embedder,
  });
  const collectionData = await collectionGet.peek();

  // Log the data to the console
  console.log("Collection Data:", collectionData);

  const query = await collection.query({
    queryTexts: ["doc1"],
    nResults: 1,
  });

  console.log("query", query);

  const collections = await client.listCollections();
  console.log("Collections", collections);


}
