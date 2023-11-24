import { Pet } from "./pet.ts"
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import { typeDefs } from "./graphql.ts";
import PetModel from "./pet.ts";




export const Query = { 
    pets: async (_parent: unknown, args: { breed?: string }) => { //recibe un argumento opcional para hacer un filtrado y si no se mete nada devuelve todos las mascotas
        try {
            if (args.breed) {
              return await PetModel.find({ breed: args.breed });
            }
            return await PetModel.find();
        } catch (error) {
            throw new GraphQLError('Error fetching pets');
        }
        },

    pet: async (_parent: unknown, args: { id: string }) => { // tiene un argumento de entrada -> el id
        try {
            const pet = await PetModel.findById(args.id);
            if (!pet) {
              throw new GraphQLError(`No pet found with id ${args.id}`);
            }

            return pet;
        } catch (error) {
            throw new GraphQLError('Error fetching pet');
        }
    }
}
    /*
    petByBreed:(_parent: unknown, args: { breed: string }): Pet []  => {
      const p = pets.filter((pet) => pet.breed === args.breed); // se filtar para que solo se quede con los pet que tiene ese breed
      return p;    
    },
    */
