import { Pet } from "./pet.ts"
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLError } from "graphql";
import { typeDefs } from "./graphql.ts";
import PetModel from "./pet.ts";

export const Mutation = {
    addPet: async(_parent: unknown, args: { name: string; breed: string }) => { // para añadir una mascota es necesario todos los parametros 
        try {
            // quito el id porque lo crea el propio moongose
            const newPet = new PetModel(args);
            await newPet.save();
      
            //Hago esto para que salga el id 
            const petObject = newPet.toObject();
            petObject.id = petObject._id;
            delete petObject._id;
      
            return petObject;
          } catch (error) {
            throw new GraphQLError('Error adding pet');
          }
    },

    deletePet: async (_parent: unknown, args: { id: string }) => { // se introduce el id del pet que se quiere eliminar 
        try {
            const pet = await PetModel.findById(args.id); // encuentro el pet por su id
            if (!pet) {
              throw new GraphQLError(`No pet found with id ${args.id}`);
            }

            await PetModel.findByIdAndDelete(args.id); // lo encuentro y lo elimino

            const petObject = pet.toObject();
            petObject.id = petObject._id;
            delete petObject._id;
            return petObject;

        } catch (error) {
            throw new GraphQLError('Error deleting pet');
        }
        
    },
    updatePet:async ( _parent: unknown, args: { id: string; name: string; breed: string }) => { 
        try {
            const pet = await PetModel.findById(args.id);
            if (!pet) {
              throw new GraphQLError(`No pet found with id ${args.id}`);
            }

            pet.name = args.name;
            pet.breed = args.breed;

            await pet.save();

            const petObject = pet.toObject();
            petObject.id = petObject._id;
            delete petObject._id;
            return petObject;
            
        } catch (error) {
            throw new GraphQLError('Error updating pet');
        }
    },
}