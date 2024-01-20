import { ChromaClient, GoogleGenerativeAiEmbeddingFunction } from "chromadb";

const embedder = new GoogleGenerativeAiEmbeddingFunction({
  googleApiKey: "api_key",
});



// Define an async function to use the await keyword
async function main() {
  const client = new ChromaClient({path: "http://localhost:8000"});
  
  let collection = await client.createCollection({
    name: "Ayush16",
    embeddingFunction: embedder,
  });

  await collection.add({
    ids: ["doc1", "docs"],
    documents: [
        "doc1",
        "doc2",
    ]
  })

  let count = collection.count();
  console.log("Count: ", count);


  // Retrieve the contents of the collection
  const collectionGet = await client.getCollection({ name: "Ayush16", embeddingFunction: embedder });
  const collectionData = await collectionGet.peek();

  // Log the data to the console
  console.log("Collection Data:", collectionData);

  const query = await collection.query({
    queryTexts: ["doc1"],
    nResults: 1
  })

  console.log("query", query);

  const collections = await client.listCollections()
  console.log("Collections", collections);
}

// Call the async function
main();
