"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
async function authMiddleware(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
        return res.status(401).json({
            message: "Access Denied, please log in to have access",
        });
    }
    const idToken = authorizationHeader.split("Bearer ")[1];
    try {
        const decodedToken = await firebase_admin_1.default.auth().verifyIdToken(idToken);
        req.user = {
            uid: decodedToken.uid,
            email: decodedToken.email,
        };
        next();
    }
    catch {
        return res.status(401).json({
            message: "Invalid or expired Token",
        });
    }
}
