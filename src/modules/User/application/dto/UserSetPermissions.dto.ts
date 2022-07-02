import { UserPermissionsType } from '@Shared/entity/User.entity';
import { IsObject, IsString } from 'class-validator';

export class UserSetPermissionsDto {
    @IsString()
    userId: string;
    @IsObject()
    permissions: UserPermissionsType;
}
