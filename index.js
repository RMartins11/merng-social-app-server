const { ApolloServer } = require("apollo-server")
const mongoose = require("mongoose")
require("dotenv").config()

const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")

const PORT = process.env.port || 5000



const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});


 mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("MongoDB Connected")
    return server.listen({ port: PORT})
}).then(res => {
    console.log(`Server running at ${res.url}`)
}) 
.catch (error => {
    console.error(error)
})

