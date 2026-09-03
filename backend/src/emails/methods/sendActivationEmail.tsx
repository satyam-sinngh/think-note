import {pretty, render} from "react-email";
import AccountActivationEmail from "../templates/AccountActivationEmail.js";
import {transporter} from "../transporter.js";
import {SendMailOptions} from "nodemailer";
import {AppError} from "../../errors/AppError.js";


interface SendActivationEmailProps {
    name: string;
    email: string;
    link: string;
}

export const sendActivationEmail = async ({name, email, link}: SendActivationEmailProps) => {
    try {
        const html: string = await pretty(
            await render(
                <AccountActivationEmail
                    name={name}
                    expiresInMinutes={10}
                    verificationUrl={link}
                />
            )
        );

        const options: SendMailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Activate your Think Note account",
            html,
        }

        await transporter.sendMail(options);

    } catch (err) {
        console.error(err)
        throw new AppError("Failed to send Activation Email", 500);
    }
}