import {Document, Model, model, Schema} from "mongoose";
import IUser from "./user.interface";
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt-nodejs'

export interface IUserModel extends IUser, Document {
    fullName(): string;
}

export let UserSchema: Schema = new Schema({
        local: {
            email: {
                type: String,
                trim: true,
                match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            },
            password: {
                type: String,
                trim: true,
            }
        },
        google: {
            id: {
                type: String,
                trim: true,
            },
            token: {
                type: String,
                trim: true,
            },
            email: {
                type: String,
                trim: true,
                match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            },
            name: {
                type: String,
                trim: true,
            }
        }
    },
    {
        timestamps: true
    })

UserSchema.plugin(uniqueValidator)

UserSchema.methods.fullName = function (): string {
    return (this.firstName.trim() + " " + this.lastName.trim());
};

// generating a hash
UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);