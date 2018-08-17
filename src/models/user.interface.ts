export default interface IUser {
    // properties
    email?: string;
    firstName?: string;
    lastName?: string;

    [propName: string]: any;
}