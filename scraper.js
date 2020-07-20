const puppeteer = require("puppeteer");

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // the japanese word
    const [eljap] = await page.$x("/html/body/div[3]/div/div/article/div[1]/div[1]/div[1]/div/span[2]")
    const txt = await eljap.getProperty("textContent")
    const rawTxt = await txt.jsonValue();

    // furigana of the word (kana of the kanji)
    const [elfurigana] = await page.$x("/html/body/div[3]/div/div/article/div/div[1]/div[1]/div/span[1]")
    const txt2 = await elfurigana.getProperty("textContent")
    const rawTxt2 = await txt2.jsonValue();

    // english definition of the word
    const [eldef] = await page.$x("/html/body/div[3]/div/div/article/div/div[2]/div/div[2]/div/span[2]")
    const txt3 = await eldef.getProperty("textContent")
    const rawTxt3 = await txt3.jsonValue();
    
    // sentence if it has one
    let rawTxt4;
    const[elsent] = await page.$x("/html/body/div[3]/div/div/article/div[1]/div[2]/div/div[2]/span/div")
    if (elsent != null) {
        const txt4 = await elsent.getProperty("textContent")
        rawTxt4 = await txt4.jsonValue();
    }

    console.log(rawTxt, rawTxt2, rawTxt3, rawTxt4);

    browser.close();
}

scrapeProduct("https://jisho.org/word/%E5%B7%9D")
