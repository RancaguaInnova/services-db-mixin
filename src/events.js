/**
 * Emit event after entity insertion/creation
 *
 * @param {JSON} jsonEntity The updated entity JSON serialized
 *
 * @param {Object} context Request context
 *
 * @returns {Promise} Event
 */
const entityCreated = async function(jsonEntity, context) {
  const eventName = `${this.name}.entity.created`
  try {
    await this.broker.emit(eventName, { meta: context.meta, entity: jsonEntity })
    // Save data manipulation for later inspection
    await this.addLogInfo(context, jsonEntity.id)
  } catch (error) {
    console.error("Error on entity created event:", error)
  }
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
const entityUpdated = async function(jsonEntity, context) {
  const eventName = `${this.name}.entity.updated`
  try {
    await this.broker.emit(eventName, { meta: context.meta, entity: jsonEntity })
    // Save data manipulation for later inspection
    await this.addLogInfo(context, jsonEntity.id)
  } catch (error) {
    console.error("Error on entity updated event:", error)
  }
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
const entityDeleted = async function(jsonEntity, context) {
  const eventName = `${this.name}.entity.deleted`
  try {
    await this.broker.emit(eventName, { meta: context.meta, entity: jsonEntity })
    // Save data manipulation for later inspection
    await this.addLogInfo(context, jsonEntity.id)
  } catch (error) {
    console.error("Error on entity deleted event:", error)
  }
}

module.exports = {
  entityCreated,
  entityDeleted,
  entityUpdated
}
