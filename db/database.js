import { ChromaClient, GoogleGenerativeAiEmbeddingFunction } from "chromadb";
import dotenv from "dotenv";
import { retrieveTikaInformation } from "../axiosRequest.js";

dotenv.config();

const googleApiKey = process.env.GOOGLE_API_KEY;

if (!googleApiKey) {
  console.error("Google API key is not defined. Make sure to set it in the .env file.");
  process.exit(1);
}

const embedder = new GoogleGenerativeAiEmbeddingFunction({
  googleApiKey: googleApiKey,
});

export async function initializeEmbedding(filePath) {
  const client = new ChromaClient({ path: "http://localhost:8000" });

  try {
    // Retrieve Tika information
    const tikaResponseData = await retrieveTikaInformation(filePath);

    // Generate embeddings
    const embeddings = await embedder.generate(tikaResponseData);
    
    // Log the generated embeddings to the console
    console.log("Generated Embeddings:", embeddings);

    // Create a new collection
    console.log("Creating a new collection named 'ak47'.");
    const collection = await client.createCollection({
      name: "ak47",
      embeddingFunction: embedder,
    });

    //DD
    // Add data to the collection
    await collection.add({
      ids: ["doc1"],
      embeddings: [embeddings], // Wrap embeddings in an array
      documents: ["doc1"],
      metadatas: [{ "chapter": "3", "verse": "12" }],
    });

    // Retrieve the contents of the collection
    const collectionData = await collection.peek();

    // Log the data to the console
    console.log("Collection Data:", collectionData);

    const query = await collection.query({
      queryTexts: ["doc1"],
      nResults: 1,
    });

    console.log("Query:", query);
  } catch (error) {
    console.error("Error initializing embedding:", error.message);
  }
}
