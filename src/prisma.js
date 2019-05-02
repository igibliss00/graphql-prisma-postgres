import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://192.168.99.100:4466/'
})

// prisma.query prisma.mutation prisma.subscription prisma.exists

// prisma.query.users(null, '{ id name email }').then(data => {
//     console.log(JSON.stringify(data, undefined, 2)) 
// })

prisma.mutation.createPost({
    data: {
        title: "Promise chains",
        body: "This goes on forever",
        published: false,
        author: {
            connect: {
                email: "donjuan@email.com"
            }
        }
    }
}, '{ id title body }').then(data => {
    console.log("createPost return",JSON.stringify(data, undefined, 2))
    return prisma.query.users(null, "{ id email name posts { title body }}")
}).then(data => {
    console.log("user query", JSON.stringify(data, undefined, 2))
})