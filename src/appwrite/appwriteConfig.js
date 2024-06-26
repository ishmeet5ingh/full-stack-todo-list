import {Client, Account, ID} from 'appwrite'
import conf from '../conf/conf'


export class Services{
    client = new Client()
    account
    databases

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)
    }

    async createAccount({ email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }


    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)

        } catch (error) {
            console.log("appwrite service :: login :: error", error)
            
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite service :: getCurrentUser :: error", error);
            
        }
    }

    async logout(){
        try {
            return await this.account.deleteSession("current")
        } catch (error) {
            
        }
    }


}

const service = new Services();

export default service
