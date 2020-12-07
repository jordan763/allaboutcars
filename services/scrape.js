
const axios = require('axios');
const cheerio = require('cheerio');

module.exports =/*const test = */ async (req,res) => {

  const { make, model, city, mile } = req.query;
  let data;
  try {
    if (make && model) {
      data = await axios.get(`https://www.carsoup.com/for-sale/${make}/${model}/${city}?currentPage=1&r=${mile}&resultsPerPage=25&ss=active&sorting=default+asc&p=Any`);
    } else if (make && model == '') {
      data = await axios.get(`https://www.carsoup.com/for-sale/${make}/${city}?currentPage=1&r=${mile}&resultsPerPage=25&ss=active&sorting=default+asc&p=Any`);
    } else {
      data = await axios.get(`https://www.carsoup.com/for-sale/${city}?currentPage=1&r=${mile}&resultsPerPage=25&ss=active&sorting=default+asc&p=Any`);
    }
    // const data = await axios.get(`https://www.nytimes.com/search?endDate=${end}&query=${topic}&sort=best&startDate=${start}`);
    
    const cars = [];
    const $ = cheerio.load(data.data, {
      // normalizeWhitespace: true,
      // xmlMode: true,
      // lowerCaseTags: true
    });
    const orderedCars = $('.srp-card-inner');
    for (let i = 0; i < orderedCars.length; i++) {
      const title = $(orderedCars[i]).find('.tracked-srp-card-title').text();
      const price = $(orderedCars[i]).find('.srp-card-price').first().text();
      const pricepermonth = $(orderedCars[i]).find('.card-mo-payment').first().text();
      const rating = $(orderedCars[i]).find('.srp-card-rating').text();
      const neworused = $(orderedCars[i]).find('.icon-car').parent().text();
      const mile = $(orderedCars[i]).find('.srp-card-mileage').text();
      const color = $(orderedCars[i]).find('i.icon-exterior').parent().text();
      // const img = $(orderedCars[i]).find('div.image-loader-wrapper').css('background-image') ? $(orderedCars[i]).find('div.image-loader-wrapper').css('background-image').replace( /url\(|\)/g, '' ).replace(/['"]+/g, '') : '';
      const img = $(orderedCars[i]).find('div.image-loader-wrapper').data('src');
console.log(img);
      if ((title !== undefined) && (price !== undefined) && (rating !== undefined) && (neworused !== undefined) && (mile !== undefined) && (color !== undefined) && (img !== undefined)) {
        cars.push({title, price, pricepermonth, rating, make, model, city, neworused, mile, color, img });
      }
    }
// console.log(cars);
  await res.json(cars);

  } catch(err) {
    console.log(err);
  }
}

// (async () => {
//   console.log(await test())
// })();

