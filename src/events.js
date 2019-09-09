/**
  * Emit event after entity insertion/creation
  *
  * @param {JSON} jsonEntity The updated entity JSON serialized
  *
  * @param {Object} context Request context
  *
  * @returns {Promise} Event
  */
const entityCreated = function (jsonEntity, context) {
  const eventName = `${this.name}.entity.created`
  this.broker.emit(eventName, { meta: context.meta, entity: jsonEntity })
  // Save data manipulation for later inspection
  this.addLogInfo(context, jsonEntity.id)
}

/**
* Emit event after entity update/edition
*
* @param {JSON} jsonEntity The updated entity JSON serialized
*
* @param {Object} context Request context
*
* @returns {Promise} Event
*/
const entityUpdated = function (jsonEntity, context) {
  const eventName = `${this.name}.entity.updated`
  this.broker.emit(eventName, { meta: context.meta, entity: jsonEntity })
  // Save data manipulation for later inspection
  this.addLogInfo(context, jsonEntity.id)
}

/**
* Emit event after entity deletion
*
* @param {JSON} jsonEntity The deleted entity JSON serialized
*
* @param {Object} context Request context
*
* @returns {Promise} Event
*/
const entityDeleted = function (jsonEntity, context) {
  const eventName = `${this.name}.entity.deleted`
  this.broker.emit(eventName, { meta: context.meta, entity: jsonEntity })
  // Save data manipulation for later inspection
  this.addLogInfo(context, jsonEntity.id)
}

module.exports = {
  entityCreated,
  entityDeleted,
  entityUpdated

}
