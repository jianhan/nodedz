import {Document, Model, model, Schema} from "mongoose";
import IUser from "./user.interface";

export interface IUserModel extends IUser, Document {
    fullName(): string;
}

export let UserSchema: Schema = new Schema({
    email: String,
    firstName: String,
    lastName: String
});

UserSchema.methods.fullName = function (): string {
    return (this.firstName.trim() + " " + this.lastName.trim());
};

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);