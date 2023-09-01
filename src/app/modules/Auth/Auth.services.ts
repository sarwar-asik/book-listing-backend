import { User } from "@prisma/client"


const insertDb = async (data:User):Promise<User>=>{
console.log(data);

}


export const AUthService = {insertDb}