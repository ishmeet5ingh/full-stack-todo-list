import { Client, Databases, ID} from "appwrite";
import conf from "../conf/conf";


export class TodoService{
    client = new Client()
    Databases

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
    }

    async createTodo({todo, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    todo,
                    userId
                }

                )
        } catch (error) {
            console.log("appwrite service :: createTodo :: error", error)
        }
    }

    async updataTodo(id,{ todo}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id,
                {
                    todo
                }
            )
        } catch (error) {
            console.log("appwrite service :: updataTodo :: error", error)
        }
    }

    async getTodos(){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId)
        } catch (error) {
            console.log("appwrite service :: getTodos :: error", error)
            
        }
    }

    async deleteTodo(id){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                id
            )
            return true
        } catch (error) {
            console.log("appwrite service :: deleteTodo :: error", error)
            return false
        }
    }


}

const todoService = new TodoService()

export default todoService