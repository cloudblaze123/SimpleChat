class Contact {
    id:string;
    group:string;

    constructor(
        id:string = '',
        group:string = ''
        ) {
        this.id = id;
        this.group = group;
    }
}

export { Contact };