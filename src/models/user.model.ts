import {Document, Model, model, Schema} from "mongoose";
import IUser from "./user.interface";
import uniqueValidator from 'mongoose-unique-validator'
import bcrypt from 'bcrypt-nodejs'

export interface IUserModel extends IUser, Document {
    generateHash(password: string): string

    validPassword(password: string): boolean
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
            display_name: {
                type: String,
                trim: true
            },
            family_name: {
                type: String,
                trim: true
            },
            given_name: {
                type: String,
                trim: true
            },
            image_url: {
                type: String,
                trim: true
            },
            last_logged_in_at: {
                type: Date
            }
        }
    },
    {
        timestamps: {createdAt: 'created_at', updatedAt: 'updated_at'}
    })

UserSchema.plugin(uniqueValidator)

// generating a hash
UserSchema.methods.generateHash = function (password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

// checking if password is valid
UserSchema.methods.validPassword = function (password: string): boolean {
    return bcrypt.compareSync(password, this.local.password);
}

export const User: Model<IUserModel> = model<IUserModel>('user', UserSchema);