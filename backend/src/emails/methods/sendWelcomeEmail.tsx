import {SendMailOptions} from "nodemailer";
import {transporter} from "../transporter.js";
import WelcomeEmail from "../templates/WelcomeEmail.js";
import {render, pretty} from "react-email";
import {AppError} from "../../errors/AppError.js";

interface SendWelcomeEmailProps {
    email: string;
    name: string;
}

export const sendWelcomeEmail = async ({name, email}: SendWelcomeEmailProps) => {
    try {
        const html = await pretty(
            await render(
                <WelcomeEmail name={name} loginUrl={`${process.env.APP_URL}/login`}/>
            )
        );

        const options: SendMailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Welcome to Think Note",
            html
        }
        await transporter.sendMail(options);
    } catch (err) {
        console.error(err);
        throw new AppError("Failed to send WelcomeEmail", 500);
    }
}
