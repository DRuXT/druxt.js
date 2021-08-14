import { resolve } from 'path'
import { DrupalJsonApiParams } from 'drupal-jsonapi-params'
import { DruxtClient } from 'druxt'

// @todo - Use component naming convention for title.
const titleFn = (parts) =>
  parts.map((part) =>
    part.charAt(0).toUpperCase() + part.slice(1).replace(/_/g, ' ')
  ).join('/')

export default async function ({ stories }) {
  const { addTemplate, options } = this

  const druxt = new DruxtClient(options.druxt.baseUrl, options.druxt)

  // Fetch and process schemas.
  const [view, form] = (await Promise.all(['view', 'form'].map(async (type) =>
    await druxt.getCollectionAll(`entity_${type}_display--entity_${type}_display`, new DrupalJsonApiParams()
      .addFilter('status', 1)
      .addFields(`entity_${type}_display--entity_${type}_display`, [
        'bundle',
        'mode',
        'targetEntityType',
      ])
    )))).map((schema) => schema.map((collection) => collection.data.map((o) => o)).flat())
  const schemas = [...view, ...form]

  // Get Entity type and bundle data.
  const entityTypes = Array.from(new Set(schemas.map((o) => o.attributes.targetEntityType)))
    .map((entity) => ({
      entity,
      bundles: Array.from(new Set(schemas.filter((o) => o.attributes.targetEntityType === entity).map((o) => o.attributes.bundle))),
    })
  )

  // Fetch Entities for UUID controls.
  const entities = await Promise.all([
    ...entityTypes.map(({ entity, bundles }) => bundles.map(async (bundle) => {
      try {
        return {
          resourceType: `${entity}--${bundle}`,
          entities: (await druxt.getCollection(`${entity}--${bundle}`, new DrupalJsonApiParams()
            .addFilter('status', 1)
            .addFields(`${entity}--${bundle}`, ['id', 'title', 'name', 'info'])
          )).data.map((o) => ({
            id: o.id,
            title: (o.attributes || {}).title || (o.attributes || {}).name || (o.attributes || {}).info || o.id,
          })),
        }
      }
      catch(e) {
        return {
          resourceType: `${entity}--${bundle}`,
          entities: [],
        }
      }
    })).flat()
  ])

  // Build Entity Stories.
  const entityStories = entityTypes.map(({ entity, bundles }) => bundles.map((bundle) => {
    return Object.entries({ view, form }).map(([type, schemas]) => {
      const displays = Array.from(new Set(schemas.filter((o) => o.attributes.targetEntityType === entity && o.attributes.bundle === bundle).map((o) => o.attributes.mode).sort((a) => (a === 'default' ? -1 : 0))))
      if (!displays) {
        return false
      }

      const resourceType = `${entity}--${bundle}`
      const component = type === 'view' ? 'druxt-entity' : 'druxt-entity-form'

      addTemplate({
        src: resolve(__dirname, `../nuxt/${component}.stories.js`),
        fileName: `stories/${component}.${resourceType}.stories.js`,
        options: {
          displays,
          entities: entities.find((o) => o.resourceType === resourceType).entities,
          resourceType,
          title: titleFn(['Druxt Entity', entity, bundle, `${type} displays`]),
        },
      })
  
      return resolve(options.buildDir, `./stories/${component}.${resourceType}.stories.js`)
    })
  })).flat(2)

  stories.push.apply(stories, entityStories)
}
