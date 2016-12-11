export interface IAccountModel {
    email: string;
    password: string;
}

export class AccountModel implements IAccountModel {
    email: string;
    password: string;
}