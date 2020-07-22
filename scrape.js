const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

function scrapeSite(url) {
    request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(html);

           const japanese = $(".text").last().text();
           const furigana = $(".furigana").first().text();
           const definition = $(".meaning-meaning").html();
            // TODO: ADD SENTENCE?

            // TODO: OUTPUT TO FILE
            const japaneseInfo = {
                word: japanese,
                furigana: furigana,
                definition: definition
            }

            const jsonString = JSON.stringify(japaneseInfo, null, 2);
            fs.writeFile("randomWord.json", jsonString, (error) => {
                if (error) {
                    console.log("Error writing file", error);
                } else {
                    console.log("Successfully wrote file")
                }
            });


           console.log(japanese, furigana, definition);
        }
        
    
    });
}

function getRandomWord(callback) {
    let randomWord = Math.floor((Math.random() * 21073) + 1);
    // 20 entries per page
    let page = randomWord / 20;
    let wordOnPage = randomWord % 20;

    let url = "https://jisho.org/search/%23common%23words?page=" + page;

    request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(html);

            let randomJapaneseLink = $(".light-details_link").eq(wordOnPage).attr("href");

            // addes https to the link so that the request can handle the link
            randomJapaneseLink = "https:" + randomJapaneseLink;
            console.log(randomJapaneseLink);
            callback(randomJapaneseLink);

        } 
    });
}

getRandomWord(scrapeSite);

//scrapeSite();