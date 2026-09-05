import {LoginInput, UserInput, verifyUserAccountInput} from "../types/user.type.js";
import {userRepository} from "../repository/user.repo.js";
import {AppError} from "../errors/AppError.js";
import {generateToken, hashToken} from "../utils/token.js";
import {verificationRepository} from "../repository/verification.repo.js";
import {VERIFICATION_TYPE} from "../generatated/enums.js";
import {hashPassword, verifyPassword} from "../utils/password.js";
import {sendActivationEmail} from "../emails/methods/sendActivationEmail.js";
import {sendWelcomeEmail} from "../emails/methods/sendWelcomeEmail.js";
import {JwtPayload, signJwtToken} from "../utils/jwt.js";

export const registerUser = async (payload: UserInput) => {
    const exists = await userRepository.userExists(payload.email);
    if (exists) {
        throw new AppError("Email Already in use", 400);
    }

    const passwordHash = await hashPassword(payload.password);

    const user = await userRepository.createUser({
        ...payload,
        password: passwordHash,
    });

    const rawToken = generateToken();
    const tokenHash = hashToken(rawToken);

    await verificationRepository.createVerificationToken({
        tokenHash,
        type: VERIFICATION_TYPE.ACCOUNT_VERIFICATION,
        user: {
            connect: {
                id: user.id
            }
        },
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    })

    const verificationUrl = `${process.env.APP_URL}/verify?token=${rawToken}`;

    await sendActivationEmail({
        name: user.name,
        email: user.email,
        link: verificationUrl,
    });

    return {id: user.id, email: user.email}

}

export const verifyUserAccount = async ({rawToken}: verifyUserAccountInput) => {
    const hash = hashToken(rawToken);
    const verificationToken = await verificationRepository.findVerificationTokenByHash(hash, VERIFICATION_TYPE.ACCOUNT_VERIFICATION);
    if (!verificationToken) {
        throw new AppError("Link Expired", 400);
    }

    const user = await userRepository.findUserById(verificationToken.userId);
    if (!user) {
        throw new AppError("Link malformed!", 400);
    }

    // perform verification
    await userRepository.verifyUser(user.id);
    await verificationRepository.markVerificationTokenAsUsed(verificationToken.id);

    // send Welcome Email
    await sendWelcomeEmail({
        name: user.name,
        email: user.email
    })

    return {success: true, id: user.id, email: user.email};

}

export const loginUser = async (payload: LoginInput) => {
    const exists = await userRepository.userExists(payload.email);
    if (!exists) {
        throw new AppError("Invalid Credentials", 400);
    }

    const user = await userRepository.findUserByEmail(payload.email);

    if (!user) {
        throw new AppError("Invalid Credentials", 400);
    }

    const isValid = await verifyPassword(user.password, payload.password);

    if (!isValid) {
        throw new AppError("Invalid Credentials", 400);
    }

    if (!user.isVerified) {
        throw new AppError("Please verify your account to access the Portal", 400);
    }

    const data: JwtPayload = {
        userId: user.id,
        email: user.email
    }

    const {password, ...safeUser} = user;

    const token = signJwtToken(data);
    return {token, user: safeUser}
}

export const getUser = async (email: string) => {
    const user = await userRepository.findUserByEmail(email);
    if (!user) {
        throw new AppError("User not found", 404);
    }
    const {password, ...safeUser} = user;
    return safeUser;
}