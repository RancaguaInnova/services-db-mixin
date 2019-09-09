const MongoAdapter = require('moleculer-db-adapter-mongo')
const DbService = require('moleculer-db')
const { entityCreated, entityDeleted, entityUpdated } = require('./events')
const LogInfo = require('./loginfo.mixin')
/**
 * Creates a DB interface for Moleculer Services
 *
 * @param {String} mongoUrl Url of the mongoDB service
 * @param {String} collection Name of the collection to connect to
 * @param {Object} logger Description of a service to use for logging
 * @param {Int} logger.version Version of the logging service
 * @param {String} logger.name Name of the service to use for logging
 * @param {Object} logger.action Action to call on the logger service
 * @returns
 */
module.exports = function (mongoUrl, collection, logger) {
  const dbUrl = mongoUrl || process.env.MONGO_URI
  if (dbUrl) {
    return {
      mixins: [DbService, LogInfo(logger)],
      adapter: new MongoAdapter(dbUrl),
      collection,
      entityCreated,
      entityUpdated,
      entityDeleted
    }
  } else {
    throw new Error('MONGO_URI error')
  }
}
