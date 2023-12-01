import jsonServer from 'json-server'
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use((req, res, next) => {
  console.log(
    req.url,
    req.method,
    req.statusCode,
    req.statusMessage,
    req.rawHeaders
  )
  console.log(res)
  next()
})
server.use(router)
server.listen(3001, () => {
  console.log('JSON Server is running')
})
