"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// define the home page route
router.post('/login', (req, res) => {
    res.send('login');
});
module.exports = router;
//# sourceMappingURL=api.js.map