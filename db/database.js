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

export async function initializeEmbedding(filePath, collectionName = "AyushKatoch") {
  const client = new ChromaClient({ path: "http://localhost:8000" });

  try {
    // Retrieve Tika information and save it as an embedding
    const tikaResponseData = await retrieveTikaInformation(filePath);

    const embeddingsPromise = embedder.generate([tikaResponseData])
   
    const embeddings = await embeddingsPromise;

    console.log(embeddings);
    // Check if the collection already exists
    let collection;

    try {
      const existingCollection = await client.getCollection({
        name: collectionName,
        embeddingFunction: embedder,
      });

      console.log(`Collection '${collectionName}' already exists. Using the existing collection.`);
      collection = existingCollection;
    } catch (error) {
      if (error.message.includes("does not exist")) {
        // Collection doesn't exist, create a new one
        console.log(`Collection '${collectionName}' does not exist. Creating a new collection.`);

        collection = await client.createCollection({
          name: collectionName,
          embeddingFunction: embedder,
        });
      } else {
        // Other errors, rethrow
        throw error;
      }
    }

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
