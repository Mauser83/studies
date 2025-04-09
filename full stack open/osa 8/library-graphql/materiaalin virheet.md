https://fullstackopen.com/osa8/fragmentit_ja_subskriptiot#subscriptiot-eli-tilaukset
const { useServer } = require('graphql-ws/lib/use/ws') ==> const { useServer } = require('graphql-ws/use/ws')

https://fullstackopen.com/osa8/fragmentit_ja_subskriptiot#tilaukset-palvelimella
subscribe: () => pubsub.asyncIterator('PERSON_ADDED') ==> subscribe: () => pubsub.asyncIterableIterator('PERSON_ADDED')

https://fullstackopen.com/osa8/fragmentit_ja_subskriptiot#tilaukset-clientissa
client.cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => { ==> updateQuery doesn't work anymore with Apollo Client V3 or above. Fixed by using cache.modify