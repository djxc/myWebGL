class Student{
    name:string
    constructor(name: string) {
        this.name = name;
    }

    gotoSchool() {
        console.log(this.name + " is goto school!");        
    }
}

export default Student