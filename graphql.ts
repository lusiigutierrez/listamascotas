// The GraphQL schema
export const typeDefs = `#graphql
  type Pet {
    id: ID! # es obligatorio por eso se pone el !, si no se pone nada no es obligatorio
    name: String!
    breed: String!
  }

   # devuelve los datos (funciones)
  type Query {
    pets(breed: String): [Pet!]! # esta funcion devuelve un array de mascotas. Se mete un argumento opcional para filtrar si quiere
    pet(id: ID!): Pet! # va a recibir un id obligatorio y va a devolver la mascota con ese id. 
    #petByBreed(breed: String): [Pet!] #devuelve las mascotas que tienen ese breed 
  }

  #modifica los datos 
  type Mutation {
    addPet(name: String!, breed: String!): Pet!
    deletePet(id: ID!): Pet!
    updatePet(id: ID!, name: String!, breed: String!): Pet!
  }
`;