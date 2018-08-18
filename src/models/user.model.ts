import {Document, Model, model, Schema} from "mongoose";
import IUser from "./user.interface";
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt-nodejs'

export interface IUserModel extends IUser, Document {
    generateHash(password: string): string

    validPassword(password: string): string
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

// generating a hash
UserSchema.methods.generateHash = function (password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

// checking if password is valid
UserSchema.methods.validPassword = function (password: string): string {
    return bcrypt.compareSync(password, this.local.password);
}

export const User: Model<IUserModel> = model<IUserModel>('user', UserSchema);