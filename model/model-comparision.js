import * as use from "@tensorflow-models/universal-sentence-encoder"; // Import Universal Sentence Encoder
import '@tensorflow/tfjs-node'; 
import { cleaningingInput, loadHeadlines } from "../userInput/handelingUserInput.js";

export async function classifyUserStatement(userInput) {
    // Load the Universal Sentence Encoder model
    const model = await use.load();

    // Load and preprocess the headlines
    const headlines = loadHeadlines();

    // Preprocess the user input
    const cleanedInput = cleaningingInput(userInput);

    // Generate embeddings for the user input and headlines
    const embeddingsTensor = await model.embed([cleanedInput, ...headlines]); // Returns a Tensor
    const embeddingsArray = embeddingsTensor.arraySync(); // Extract embeddings as a JavaScript array
    const [inputEmbedding, ...headlineEmbeddings] = embeddingsArray;

    // Compute cosine similarity between user input and each headline
    const similarities = headlineEmbeddings.map(headlineEmbedding => {
        const dotProduct = inputEmbedding.reduce((sum, a, idx) => sum + a * headlineEmbedding[idx], 0);
        const magnitudeA = Math.sqrt(inputEmbedding.reduce((sum, a) => sum + a * a, 0));
        const magnitudeB = Math.sqrt(headlineEmbedding.reduce((sum, b) => sum + b * b, 0));
        return dotProduct / (magnitudeA * magnitudeB); // Cosine similarity
    });

    // Find the maximum similarity score
    const maxSimilarity = Math.max(...similarities);

    // Define a threshold for classification
    const threshold = 0.8; // Adjust this value based on your data
    const isTrue = maxSimilarity >= threshold;

    console.log(`User Statement: "${userInput}"`);
    console.log(`Maximum Similarity: ${maxSimilarity}`);
    console.log(`Classification: ${isTrue ? "True" : "False"}`);
}

// Test the function with a user input
const userInput = "India is not called in G7 meeting";
classifyUserStatement(userInput);