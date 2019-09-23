const capitalize = require('lodash/capitalize')
const includes = require('lodash/includes')
/**
 * Logs Event
 *
 * @param {Object} logger Logger object
 * @param {String} logger.version Version of the logger
 * @param {String} logger.name Resource/endpoint/table
 * @param {String} logger.action Action performed
 * @param {String} origin Origin header. Where this request was made from
 * @param {String} resource Resource/endpoint/table
 * @param {String} action Action performed
 * @param {String} userId Id of the logged in user who performed the action
 * @param {String} entityId Id of the document created or modified
 */
const logEvent = function(logger, origin, resource, action, userId, entityId) {
  const logDoc = {
    origin: origin || '',
    date: new Date(),
    resource: capitalize(resource),
    action,
    entityId,
    userId: userId
  }

  this.logger.info(logDoc)
  if (logger) {
    if (resource !== logger.name) {
      context.call(
        `v${logger.version}.${logger.name}.${logger.action}`,
        logDoc
      )
    }
  }
}

/**
 * Logs DB operations to broker logger or a personalized logger service
 *
 * @param {Object?} logger
 * @param {Int} logger.version Service version
 * @param {String} logger.name Service/resource name
 * @param {String} logger.action Service action to call
 * @returns
 */
module.exports = function (logger) {
  return {
    methods: {
      /**
     * Log operations to passed logger
     *
     * @param {Object} context Moleculer Service Context
     * @param {String} entityId Id of the entity/document
     *
     * @returns {Void}
     */
      addLogInfo: function (context, entityId) {
        const [resource, action] = context.action.name.split('.').slice(1)
        const { user, origin } = context.meta
        const userId = user && user.id ? user.id : ''

        if (includes(['create', 'update', 'remove'], action)) {
          logEvent(logger, origin, resource, action, userId, entityId)
        }
      }
    }
  }
}
