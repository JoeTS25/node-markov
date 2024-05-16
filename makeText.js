const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

function genText(text) {
    let newText = new markov.MarkovMachine(text);
    console.log(newText.makeText());
}

// read file to generate text

function makeText(path) {
    fs.readFile(path, "utf8", function cb(err, data) {
        if (err) {
            console.error(`Cannot read file: ${path}: ${err}`);
            process.exit(1);
        } else {
            genText(data);
        }
    });
}

// read url to generate text

async function getURL(url) {
    let response;
    try {
        response = await axios.get(url);
    } catch (err) {
        console.error(`Cannot read URL: ${url}: ${err}`);
    }
    genText(response.data)
}

// see which function to use based on method

let [method, path] = process.argv.slice(2);

if (method === "file") {
    makeText(path);
}
else if (method === "url") {
    getURL(path);
}
else {
    console.error(`Error. Please check your method: ${method}`);
    process.exit(1);
}




