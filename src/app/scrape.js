const request = require("request");
const cheerio = require("cheerio");
const schedule = require("node-schedule");
const fs = require("fs");

function scrapeSite(url) {
    let kanjiFurigana = [];
    request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(html);

           const japanese = $(".text").last().text().replace(/\s+/g,'');
        //   const furigana = $(".furigana").first().text().replace(/\s+/g,'');


        
            const furigana = $(".kanji-1-up").each(function(index) {
                kanjiFurigana.push($(this).text());
            });
            const furigana2 = $(".kanji-2-up").each(function(index) {
                kanjiFurigana.push($(this).text());
            });
            const furigana3 = $(".kanji-3-up").each(function(index) {
                kanjiFurigana.push($(this).text());
            });
            
           const definition = $(".meaning-meaning").html();

            const japaneseInfo = {
                word: japanese,
                furigana: kanjiFurigana,
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


           console.log(japanese, kanjiFurigana, definition);
        }
        
    
    });
}

function getRandomWord(callback) {
    let randomWord = Math.floor( (Math.random() * 21073) + 1);
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

//let temp = schedule.scheduleJob("*/5 * * * *", () => {
  //  getRandomWord(scrapeSite);
//}); 


scrapeSite("https://jisho.org/word/%E4%BC%9A%E7%A4%BE");


