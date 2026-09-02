import {UserInput} from "../types/user.type.js";
import {createUser, userExists} from "../repository/user.repo.js";
import {AppError} from "../errors/AppError.js";
import {generateToken, hashToken} from "../utils/token.js";
import {createVerificationToken} from "../repository/verification.repo.js";
import {VERIFICATION_TYPE} from "../generatated/enums.js";

export const registerUser = async (payload: UserInput) => {
    const exists = await userExists(payload.email);
    if (exists) {
        throw new AppError("Email Already in use", 400);
    }

    const user = await createUser(payload);

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
        expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    })

    const verificationUrl = `${process.env.APP_URL}/verify?token=${rawToken}`;

    // TODO: SEND Email

    return {id: user.id, email: user.email}

}
