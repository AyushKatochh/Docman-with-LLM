const { ChromaClient } = require("chromadb");
require('dotenv').config();

const client = new ChromaClient();

const { OpenAIEmbeddingFunction } = require("chromadb");

const embedder = new OpenAIEmbeddingFunction({
    openai_api_key: process.env.OPENAI_KEY
})

const initializeCollection = async () => {
    try {
        // Creating Collection
        const collection = await client.createCollection({
            name: "tika-collection",
            embeddingFunction: embedder
        })

        // Add some text documents to the collection
        await collection.add({
            ids: ["id1", "id2"],
            metadatas: [{ source: "my_source" }, { source: "my_source" }],
            documents: ["This is a document", "This is another document"]
        })

        const results = await collection.query({
            nResults: 2,
            queryTexts: ["This is a query document"]
        })

        console.log(results);
    } catch (error) {
        console.error("Error:", error.message);
    }
};

module.exports = {
    initializeCollection
};
