import {UserInput} from "../types/user.type.js";
import {createUser, userExists} from "../repository/user.repo.js";
import {AppError} from "../errors/AppError.js";
import {generateToken, hashToken} from "../utils/token.js";
import {createVerificationToken} from "../repository/verification.repo.js";
import {VERIFICATION_TYPE} from "../generatated/enums.js";
import {hashPassword} from "../utils/password.js";
import {sendActivationEmail} from "../emails/methods/sendActivationEmail.js";

export const registerUser = async (payload: UserInput) => {
    const exists = await userExists(payload.email);
    if (exists) {
        throw new AppError("Email Already in use", 400);
    }

    const passwordHash = await hashPassword(payload.password);

    const user = await createUser({
        ...payload,
        password: passwordHash,
    });

    const rawToken = generateToken();
    const tokenHash = hashToken(rawToken);

    await createVerificationToken({
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
