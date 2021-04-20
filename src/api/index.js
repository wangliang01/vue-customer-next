const apiModule = {}
const apiContext = require.context('@/api', true, /index.js/)
apiContext.keys().forEach(apiPath => {
  const matches = apiPath.match(/\/.*\//)
  const apiName = matches && matches.pop().replace(/\//g, '')
  const api = apiContext(apiPath)
  if (apiName) {
    apiModule[apiName] = api
  }
})

export default apiModule

