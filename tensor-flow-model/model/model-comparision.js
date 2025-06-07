import * as use from "@tensorflow-models/universal-sentence-encoder"; // Import Universal Sentence Encoder
import '@tensorflow/tfjs-node'; 
import { cleaningingInput } from "../userInput/handelingUserInput.js";

export async function classifyUserStatement(userInput, headlines) {
   if(userInput && headlines.length > 0) {
     // Load the Universal Sentence Encoder model
    const model = await use.load();

    // Preprocess the user input
    const cleanedInput = cleaningingInput(userInput);

    // Generate embeddings for the user input and headlines
    const embeddingsTensor = await model.embed([cleanedInput, ...headlines]);
    const embeddingsArray = embeddingsTensor.arraySync();
    const [inputEmbedding, ...headlineEmbeddings] = embeddingsArray;

    // Compute cosine similarity between user input and each headline
    const similarities = headlineEmbeddings.map(headlineEmbedding => {
        const dotProduct = inputEmbedding.reduce((sum, a, idx) => sum + a * headlineEmbedding[idx], 0);
        const magnitudeA = Math.sqrt(inputEmbedding.reduce((sum, a) => sum + a * a, 0));
        const magnitudeB = Math.sqrt(headlineEmbedding.reduce((sum, b) => sum + b * b, 0));
        return dotProduct / (magnitudeA * magnitudeB);
    });

    // Find the maximum similarity score
    const maxSimilarity = Math.max(...similarities);

    // Define a threshold for classification
    const threshold = 0.8;
    const isTrue = maxSimilarity >= threshold;

    console.log(`\nUser Statement: "${userInput}"`);
    console.log(`Maximum Similarity: ${maxSimilarity}`);
    console.log(`Classification: ${isTrue ? "True" : "False"}`);
   } else {
    console.log(headlines);
   }
}

/* const hl = loadHeadlines();
// Test the function with a user input
const userInput = "lee jae myung is not elect south korea’ new presid";
classifyUserStatement(userInput, hl); */