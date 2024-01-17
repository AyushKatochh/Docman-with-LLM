const { ChromaClient } = require('chromadb');

const initializeCollection = async () => {
    try {
        const client = new ChromaClient();
        
        // Creating Collection
        const collection = await client.createCollection({ name: "documents" });

        // Add some text documents to the collection
        await collection.add({
            ids: ["document_1", "document_2", "document_3"],
            metadatas: [{ user: "Carl" }, { user: "Karen" }, { user: "Carl" }],
            documents: ["Lorem Ipsum", "Dolurum Sanctorum", "Noctum Markum"],
        });

        // Query the collection
        const results = await collection.query({
            nResults: 1,
            where: { "user": "Carl" },
            queryTexts: ["Nactum"],
        });

        console.log(results);
    } catch (error) {
        console.error("Error:", error.message);
    }
};



// Export the function for use in other files
module.exports = {
    initializeCollection,
};
