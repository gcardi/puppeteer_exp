const puppeteer = require('puppeteer-core');

const scrapeProducts = async ( ISBN ) => {
    console.log(ISBN);
  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
  // `headless: true` (default) enables old Headless;
  // `headless: 'new'` enables new Headless;
  // `headless: false` enables “headful” mode.
});
  const page = await browser.newPage();
 // await page.goto("https://www.amazon.it/dp/8891905445");
 // await page.goto("https://www.amazon.com/");
  await page.goto("https://www.amazon.it/advanced-search/books/");
  //await page.type("#field-isbn", "8891905445\r");
  await page.type("#field-isbn", ISBN + "\r");
  
  
  //await page.click(elem);
  await page.waitForNavigation();

  
  const products = await page.evaluate(() => {
    let results = [];
    const items = document.querySelectorAll(".s-result-item .sg-col-inner");
    for (let i = items.length; i--; ) {
      const item = items[i];
//  console.log(item.innerText);
      //const title = item.querySelector("h2 > a > span");
      const title = item.querySelector(".a-text-normal");
      //const lnk = item.querySelector(".s-underline-link-text");
      const price = item.querySelector(".a-price-whole");
      const cents = item.querySelector(".a-price-fraction");
      const image = item.querySelector("img");
      if (!title || !price || !image) continue;
      results = [...results, {
        title: title.innerText,
        price: parseFloat(`${parseInt(price.innerText)}.${parseInt(cents.innerText)}`),
        image: image.getAttribute("src"),
        //link: lnk.link
      }]
    }
    return results;
  });
  console.log(products);
  await browser.close();
}

if ( process.argv.length < 3 ) {
    throw new Error("missing ISBN")
}

scrapeProducts( process.argv[2] );

