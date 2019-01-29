const { makeExtendSchemaPlugin, gql } = require("graphile-utils")
const AuthService = require("./services/auth")

const PassportLoginPlugin = makeExtendSchemaPlugin(build => ({
  typeDefs: gql`
    type currentUserPayload {
      email: String!
      id: Int!
      firstName: String
      lastName: String
    }
    input RegisterInput {
      email: String!
      password: String!
    }
    type RegisterPayload {
      email: String!
      id: Int!
    }
    input LoginInput {
      email: String!
      password: String!
    }
    type LoginPayload {
      email: String!
      id: Int!
      firstName: String
      lastName: String
    }
    extend type Query {
      currentUser: currentUserPayload
    }
    extend type Mutation {
      signup(input: RegisterInput!): RegisterPayload
      login(input: LoginInput!): LoginPayload
      logout: currentUserPayload
    }
  `,
  resolvers: {
    Query: {
      async currentUser(_query, args, context) {
        try {
          return context.user
        } catch (e) {
          throw new Error("Error")
        }
      }
    },
    Mutation: {
      async signup(
        mutation,
        args,
        context,
        resolveInfo,
        { selectGraphQLResultFromTable }
      ) {
        const { password, email } = args.input
        try {
          return AuthService.signup({
            email,
            password,
            context
          })
        } catch (e) {
          // TODO: check that this is indeed why it failed
          throw new Error("Login failed: incorrect email/password")
        }
      },
      async login(
        mutation,
        args,
        context,
        resolveInfo,
        { selectGraphQLResultFromTable }
      ) {
        const { email, password } = args.input
        try {
          return AuthService.login({ email, password, context })
        } catch (e) {
          console.error(e)
          // TODO: check that this is indeed why it failed
          throw new Error("Login failed: incorrect email/password")
        }
      },
      async logout(mutation, args, context, resolveInfo) {
        try {
          const { user } = context
          context.logout()
          return user
        } catch (e) {
          throw new Error("Logout failed")
        }
      }
    }
  }
}))
module.exports = PassportLoginPlugin
