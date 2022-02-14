const db = require('../../data/db-config');

const getAll = () => {
  return db('accounts')
}

const getById = async id => {
  const account = await db('accounts').where('id', id)
  return account[0];
}

const create = async account => {
  const [ id ] = await db('accounts').insert(account)
  return { id: id, ...account }
}

const updateById = async (id, account) => {
  await db('accounts').where('id', id).update(account)
  const updatedAcc = await getById(id);
  return updatedAcc[0];
}

const deleteById = async id => {
  const deletedAcc = await getById(id);
  await db('accounts').where('id', id).delete();
  return deletedAcc[0];
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}
