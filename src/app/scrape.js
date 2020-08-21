const request = require("request");
const cheerio = require("cheerio");
const schedule = require("node-schedule");
const fs = require("fs");

function scrapeSite(url) {
    let kanjiFurigana = [];
    let furiganaPosition = [];
    request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(html);

           const japanese = $(".text").last().text().replace(/\s+/g,'');

           
            // getting furigana and separating them by their "kanji representative"
            const furigana = $(".kanji-1-up").each(function(index) {
                kanjiFurigana[$(this).index()] = ($(this).text() + "  ");
            });
           const furigana2 = $(".kanji-2-up").each(function(index) {
                kanjiFurigana[$(this).index()] = ($(this).text() + "   ");
            });
            const furigana3 = $(".kanji-3-up").each(function(index) {
                kanjiFurigana[$(this).index()] = ($(this).text() + "");
          }); 
            
           const definition = $(".meaning-meaning").html();

           let furiganaIndex = 0;
           for (let i = 0; i < japanese.length; i++) {
               // checks if the character is kanji
               if (japanese[i] >= "\u4e00" && japanese[i] <= "\u9faf") {
                    furiganaPosition.push(kanjiFurigana[furiganaIndex]);
                    furiganaIndex++;
               } else {
                   furiganaPosition.push(" ");
               }

           }

            const japaneseInfo = {
                word: japanese,
                furigana: furiganaPosition,
                definition: definition,
                url: url
            }

            const jsonString = JSON.stringify(japaneseInfo, null, 2);
            fs.writeFile("randomWord.json", jsonString, (error) => {
                if (error) {
                    console.log("Error writing file", error);
                } else {
                    console.log("Successfully wrote file")
                }
            });


           console.log(japanese, furiganaPosition, definition);
        }
        
    
    });
}

function getRandomWord(callback) {
    let randomWord = Math.floor( (Math.random() * 21073) + 1);
    // 20 entries per page
    let page = randomWord / 20;
    let wordOnPage = randomWord % 20;

    // url of common japansese words according to jisho.org
    let url = "https://jisho.org/search/%23common%23words?page=" + page;

    request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(html);

            // gets link of the word
            let randomJapaneseLink = $(".light-details_link").eq(wordOnPage).attr("href");

            // addes https to the link so that the request can handle the link
            randomJapaneseLink = "https:" + randomJapaneseLink;
            console.log(randomJapaneseLink);
            callback(randomJapaneseLink);

        } 
    });
}

// CRON job
let temp = schedule.scheduleJob("* * /6 * * *", () => {
    getRandomWord(scrapeSite);
}); 


//scrapeSite("https://jisho.org/word/%E6%96%99%E7%90%86");


