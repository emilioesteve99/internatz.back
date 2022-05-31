import * as bcrypt from 'bcrypt';

export class User {
    public _id: string;
    public companyId: string;
    public email: string;
    public password: string;
    public name: string;
    public permissions: {
        [permissionKey: string]: boolean;
    };
    public dateAdd: Date;

    public encriptPassword () {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    public isValidPassword (plainTextPassword: string) {
        return bcrypt.compareSync(this.password, plainTextPassword);
    }
}