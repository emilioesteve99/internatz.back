import * as bcrypt from 'bcrypt';

export type PermissionType = {[key: string]: boolean}

export type UserPermissionsType = {
    'route': PermissionType;
    'endpoint': PermissionType;
}
export class User {
    public _id: string;
    public companyId: string;
    public email: string;
    public password: string;
    public name: string;
    public permissions: UserPermissionsType;
    public isAdmin: boolean;
    public dateAdd: Date;

    public async encriptPassword () {
        this.password = bcrypt.hashSync(this.password, 10);
    }

    public async isValidPassword (plainTextPassword: string) {
        return bcrypt.compareSync(plainTextPassword, this.password);
    }

    public toPrimitive () {
        return {
            _id: this._id,
            companyId: this.companyId,
            email: this.email,
            name: this.name,
            permissions: this.permissions,
            isAdmin: this.isAdmin
        }
    }
}