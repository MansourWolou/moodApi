/**
 * @brief
 * In TypeScript, classes or interfaces can be used to create models to represent 
 * what our documents will look like. Classes can define what properties an object should have, 
 * as well as what data type those properties should be. This is like an application-level schema. 
 * Classes also provide the ability to create instances of that class and take advantage of 
 * the benefits of object-orientated programming.
 */
import { ObjectId } from "mongodb";


export class User{
    private userName : string; // MIN et max de carract
    private password : string; // MIN et max de carract
    private email : string; // verifier si c bon
    private createAt : Date; // *?
    private updateAt : Date; // *?
    private id? : ObjectId;

    constructor(name : string , pwd : string , mail : string , id? : ObjectId){
       // assert()
        this.userName = name;
        this.password = pwd;
        this.email = mail;
        this.createAt = new Date();
        this.updateAt = new Date();
    }
    /**
     * 
     * We now have a model of our data represented in code so that developers can take advantage 
     * of autocomplete and type checking.
     */
    getUserName() : string{ return this.userName}
    getEmail() : string { return this.email}
    // postUser retourne l'objet user qui va etre envoyer dans la bd pour la création de compte
    getUser():object {
        return {
            name : this.userName,
            email : this.email,
        }
    }
    getLiked():void{}
    createUser():void{}
    addContent():void{}
    deleteContent():void{}
//----------------------------------------------------------------------------------------------
    /*dbCall(req : Request , datab : mongoDB.MongoClient): object{
        
        return  datab.getDbRequest("findOne", "user", req.body.mail).then(
            (val: object) => {
                return val;
            }
        );
        
    }
    // spécifier mes types pour répondre a mes besoins
        // ainsi je vérifier les données donné par le client
        // il faut un messager d'erreur qui explique quand c'est pas valide
     validation(call : object ): Boolean{
    
        return (this.userName.length < 6 ||  this.userName.length == 6 ) && call == {} ;
        // verifier si le nom a le bon nombre de caractère
        
        // verifier si le mail existe deja 
    }
    */
    
}