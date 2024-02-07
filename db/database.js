import { ChromaClient, GoogleGenerativeAiEmbeddingFunction } from "chromadb";
import dotenv from "dotenv";
import { retrieveTikaInformation } from "../axiosRequest.js";

const filePath = "C:/Users/katoc/Downloads/important.docx";

dotenv.config();

const googleApiKey = process.env.GOOGLE_API_KEY;

if (!googleApiKey) {
  console.error("Google API key is not defined. Make sure to set it in the .env file.");
  process.exit(1);
}

const embedder = new GoogleGenerativeAiEmbeddingFunction({
  googleApiKey: googleApiKey,
});

export async function initializeEmbedding(filePath, collectionName = "Ayushk") {
  const client = new ChromaClient({ path: "http://localhost:8000" });

  try {
    // Retrieve Tika information and save it as an embedding
    const tikaResponseData = await retrieveTikaInformation(filePath);
    console.log(typeof(tikaResponseData));
    // const embeddings = await embedder.generate([tikaResponseData]);
    // let embeddingsList = Array.isArray(embeddings) ? embeddings : [embeddings];

    // // Convert embeddingsList to a flat array
    // const flatArray = embeddingsList.reduce((acc, curr) => acc.concat(curr), []);
    // console.log(typeof flatArray, flatArray);

    // // Check if the collection already exists
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
      documents: filePath,
      metadatas: [{ "chapter": "3", "verse": "12" }],
    });

    // Retrieve the contents of the collection
    const collectionData = await collection.peek();

    // Log the data to the console
    console.log("Collection Data:", collectionData);

    const query = await collection.query({
      queryTexts: embeddingsList,
      nResults: 1,
    });

    console.log("Query:", query);

  } catch (error) {
    console.error("Error initializing embedding:", error.message);
  }
}
