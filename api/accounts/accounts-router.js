const router = require('express').Router()
const Accounts = require('./accounts-model');

router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(accounts => {
      res.json(accounts);
    })
    .catch(err => {
      console.log(err);
    })
})

router.get('/:id', (req, res, next) => {
  Accounts.getById(req.params.id)
    .then(account => {
      res.json(account);
    })
    .catch(err => {
      console.log(err);
    })
})

router.post('/', (req, res, next) => {
  Accounts.create(req.body)
    .then(account => {
      res.json(account);
    })
    .catch(err => {
      console.log(err)
    })
})

router.put('/:id', (req, res, next) => {
  // DO YOUR MAGIC
});

router.delete('/:id', (req, res, next) => {
  // DO YOUR MAGIC
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
})

module.exports = router;
