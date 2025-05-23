import callingScaper from "../scraping/callingNewsPortals.js";

const userInput = "Trump says he resorted the India Pakistan war";

function cleaningingInput(input) {
    //Removing articles and ? ! etc 
    let cleanInput = input.replace(/\b(to|is|a|an|the|about)\b/gi, "")
    .replace(/[?.,!]/g, "").replace(/\s+/g, " ").trim();
    //Converting the whole text to lower case so that it is easy to compare
    let lowercase = cleanInput.toLowerCase().split(" ");
    //Removing repeated words
    let uniqueWords = [...new Set(lowercase)];
    //collecting the clean text
    cleanInput = uniqueWords.join(" ")
    return cleanInput;
}

function comparingWithScapredData(text) {
    console.log(text.includes(cleanText));
    if(text.includes(cleanText)) {
        return text;
    } else {
        return 'There is no information on the provided data';
    }
}

const cleanText = cleaningingInput(userInput);
callingScaper().then(data => {
    const hindu = data[0].data;
    const factChecking = data[1].data;
    factChecking.forEach(h => {
        console.log(comparingWithScapredData(h.title));
    })
}).catch(error => {
    console.log(error);
})
