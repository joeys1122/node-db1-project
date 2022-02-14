const { getById } = require('./accounts-model');
const yup = require('yup');
const db = require('../../data/db-config');

exports.checkAccountPayload = (req, res, next) => {
  
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const checkName = await db('accounts').where('name', req.body.name);
  
  if (checkName === []) {
    next({ status: 400, message: 'that name is taken' });
  } else {
    next();
  }
}

exports.checkAccountId = async (req, res, next) => {
  const account = await getById(req.params.id);

  if (account) {
    next();
  } else {
    next({ status: 404, message: 'account not found' });
  }
}
