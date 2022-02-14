const router = require('express').Router()
const Accounts = require('./accounts-model');
const { checkAccountId, checkAccountNameUnique, checkAccountPayload } = require('./accounts-middleware');

router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(accounts => {
      res.json(accounts);
    })
    .catch(err => {
      console.log(err);
      next({ status: 500, message: 'error getting accounts' });
    })
})

router.get('/:id', checkAccountId, (req, res, next) => {
  Accounts.getById(req.params.id)
    .then(account => {
      res.json(account);
    })
    .catch(err => {
      console.log(err);
      next({ status: 500, message: 'error getting account' });
    })
})

router.post('/', checkAccountPayload, checkAccountNameUnique, (req, res, next) => {
  Accounts.create(req.body)
    .then(account => {
      res.status(201).json(account);
    })
    .catch(err => {
      console.log(err)
      next({ status: 500, message: 'error posting account' });
    })
})

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  Accounts.updateById(req.params.id, req.body)
    .then(account => {
      res.json(account);
    })
    .catch(err => {
      console.log(err);
      next({ status: 500, message: 'error updating account' });
    })
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  Accounts.deleteById(req.params.id)
    .then(account => {
      res.json(account);
    })
    .catch(err => {
      console.log(err);
      next({ status: 500, message: 'error deleting account' });
    })
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({ message: err.message });
})

module.exports = router;
