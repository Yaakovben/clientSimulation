export interface IAmmuntion{
    name:string, 
    amount:number
}

export interface IUser{
    ammuntion: [IAmmuntion]
    _id:string
    username:string
    password:string
    organition:string
    location?:string
}


export interface IMissileList  {
    name:string
    location:string
    time:number
    status?:string
}