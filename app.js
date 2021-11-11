const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// location for handlebars partials:

hbs.registerPartials(path.join(__dirname, '/views/partials'));

// route handlers:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      console.log('beersFromApi :>> ', beersFromApi);
      const data = { beersKey: beersFromApi };
      res.render('beers', data);
    })
    .catch(error => console.log(error));
});

app.get('/random-beer', (req, res) => {
  punkAPI
    .getRandom()
    .then(randomBeerArray => {
      console.log('randomBeerArray :>> ', randomBeerArray);
      const randomBeerObj = { randomBeer: randomBeerArray };
      res.render('random-beer', randomBeerObj);
    })
    .catch(error => console.log(error));
});

// route with link

// app.get('/beers/beer-:beerId', (req, res) => {
//   // when we say colon : we specify that this part is dynamic and we want to have it available
//   console.log('req.params.beerId :>> ', req.params.beerId);
//   const beerId = req.params.beerId;
//   console.log('beersId :>> ', beerId);
//   punkAPI.getBeer(beerId).then(oneBeerArray => {
//     const oneBeer = oneBeerArray[0];
//     res.render('random-beer', { oneBeer: oneBeer });
//   });
// });

app.listen(3000, () => console.log('🏃‍ on port 3000'));
