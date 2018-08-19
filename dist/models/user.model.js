"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
exports.UserSchema = new mongoose_1.Schema({
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
        }
    }
}, {
    timestamps: true
});
exports.UserSchema.plugin(mongoose_unique_validator_1.default);
// generating a hash
exports.UserSchema.methods.generateHash = function (password) {
    return bcrypt_nodejs_1.default.hashSync(password, bcrypt_nodejs_1.default.genSaltSync(8));
};
// checking if password is valid
exports.UserSchema.methods.validPassword = function (password) {
    return bcrypt_nodejs_1.default.compareSync(password, this.local.password);
};
exports.User = mongoose_1.model('user', exports.UserSchema);
//# sourceMappingURL=user.model.js.map