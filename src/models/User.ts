class User {
    id:string;
    name:string;
    email:string;
    signature:string;
    gender:string;
    age:number;
    birthday:string;
    location:string;

    constructor(
        id:string = '',
        name:string = '',
        email:string = '',
        signature:string='',
        gender:string='',
        age:number=0,
        birthday:string='',
        location:string='',
        ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.signature = signature;
        this.gender = gender;
        this.age = age;
        this.birthday = birthday;
        this.location = location;
    }

    loadFromUser(other:User) {
        this.id = other.id;
        this.name = other.name;
        this.email = other.email;
        this.signature = other.signature;
        this.gender = other.gender;
        this.age = other.age;
        this.birthday = other.birthday;
        this.location = other.location;
    }

    static loadFromJSON(json:any) {
        const user = new User('', '', '');
        user.id = json.id;
        user.name = json.name;
        user.email = json.email;
        user.signature = json.signature;
        user.gender = json.gender;
        user.age = json.age;
        user.birthday = json.birthday;
        user.location = json.location;
        return user;
    }
}

export { User };