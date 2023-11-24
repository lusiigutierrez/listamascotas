import mongoose from "npm:mongoose@8.0.1"

export type Pet = {
    id: string;
    name: string;
    breed: string;
};


const Schema = mongoose.Schema; 

const PetSchema = new Schema ({
        name: { type: String, required: true },
        breed: { type: String, required: true},
      },
      { timestamps: true }
);


export type PetModelType = mongoose.Document & Omit<Pet, "id">;  
export const PetModel = mongoose.model<PetModelType>("Pet", PetSchema); 
export default PetModel; 