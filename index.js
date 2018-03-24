const request = require('request');

let url = 'https://www.nytimes.com/es/2018/03/24/facebook-google-zucktown-alphabet/';

request(url, (error, response, body) => {

  // instance cheerio
  const cheerio = require('cheerio');
  const $ = cheerio.load(body);

   // parse title
  let title = $('#headline').text();

  // parse images
  let images = [];
  $('div.image').each((index, item) => {
    const $$ = cheerio.load(item);
    let image = $$('img').attr('src');
    images.push(image)
  });

  // parse text
  let content = '';

  $('p[class^="story-"]').each((index, item) => {
    const $$ = cheerio.load(item);
    content = `${content}\n\n${$$.text()}`;
  });

  // final object
  let obj = {
    title: title,
    images: images,
    content: content
  }

  console.log(JSON.stringify(obj, null, 2));
});
