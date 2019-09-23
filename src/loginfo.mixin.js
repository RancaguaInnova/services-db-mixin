const capitalize = require('lodash/capitalize')
const includes = require('lodash/includes')
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

        if (includes(['create', 'update', 'remove'], action)) {
          const logDoc = {
            origin: origin || '',
            date: new Date(),
            resource: capitalize(resource),
            action,
            entityId,
            userId: user.id || ''
          }
          if (resource !== logger.name) {
            this.logger.info(logDoc)
            if (logger) {
              context.call(
                `v${logger.version}.${logger.name}.${logger.action}`,
                logDoc
              )
            }
          }
        }
      }
    }
  }
}
