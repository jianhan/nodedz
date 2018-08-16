import { Document, Model, Schema } from "mongoose";
import IUser from "./user.interface";
export interface IUserModel extends IUser, Document {
    fullName(): string;
}
export declare let UserSchema: Schema;
export declare const User: Model<IUserModel>;
//# sourceMappingURL=user.model.d.ts.map