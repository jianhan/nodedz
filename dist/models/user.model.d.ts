import { Document, Model, Schema } from "mongoose";
import IUser from "./user.interface";
export interface IUserModel extends IUser, Document {
    generateHash(password: string): string;
    validPassword(password: string): boolean;
}
export declare let UserSchema: Schema;
export declare const User: Model<IUserModel>;
//# sourceMappingURL=user.model.d.ts.map