const request = require("request");
const cheerio = require("cheerio");

function scrapeSite(url) {
    request(url, (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(html);

           const japanese = $(".text").last().text();
           const furigana = $(".furigana").first().text();
           const definition = $(".meaning-meaning").html();
            // TODO: ADD SENTENCE?
           console.log(japanese, furigana, definition);
        }
        
    
    });
}

function getRandomWord() {
    let randomWord = Math.floor((Math.random() * 21073) + 1);
    // 20 entries per page
    let page = randomWord / 20;
    let wordOnPage = randomWord % 20;

    let url = "https://jisho.org/search/%23common%20%23words?page=" +page;


}



scrapeSite("https://jisho.org/word/%E5%B7%9D")