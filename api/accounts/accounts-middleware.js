const { getById } = require('./accounts-model');
const db = require('../../data/db-config');

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;

  if(name === undefined || budget ===undefined ) {
    next({ status:400, message: "name and budget are required" });
  } else if(name.trim().length < 3 || name.trim().length > 100) {
    next({ status:400, message: "name of account must be between 3 and 100" });
  } else if(typeof budget !== 'number' || isNaN(budget)) {
    next({ status:400, message: "budget of account must be a number" });
  } else if(budget < 0 || budget > 1000000) {
    next({ status:400, message: "budget of account is too large or too small" });
  } else {
    req.body.name = name.trim();
    next();
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const checkName = await db('accounts').where('name', req.body.name).first();
  
  if (checkName) {
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
