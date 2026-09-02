import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
} from "@react-email/components";

interface AccountActivationEmailProps {
    name?: string;
    verificationUrl: string;
    expiresInMinutes?: number;
}

const AccountActivationEmail = ({
                                    name,
                                    verificationUrl,
                                    expiresInMinutes = 30,
                                }: AccountActivationEmailProps) => {
    return (
        <Html>
            <Head/>

            <Preview>Activate your account</Preview>

            <Body style={main}>
                <Container style={container}>
                    <Heading style={heading}>
                        Activate your account
                    </Heading>

                    <Text style={text}>
                        Hi {name || "there"},
                    </Text>

                    <Text style={text}>
                        Thanks for creating an account. Click the button
                        below to verify your email address and activate
                        your account.
                    </Text>

                    <Section style={buttonContainer}>
                        <Button
                            href={verificationUrl}
                            style={button}
                        >
                            Activate Account
                        </Button>
                    </Section>

                    <Text style={text}>
                        This link will expire in{" "}
                        <strong>{expiresInMinutes} minutes</strong>.
                    </Text>

                    <Text style={secondaryText}>
                        If you didn't create this account, you can safely
                        ignore this email.
                    </Text>

                    <Hr style={hr}/>

                    <Text style={footer}>
                        If the button doesn't work, copy and paste this
                        link into your browser:
                    </Text>

                    <Text style={link}>
                        {verificationUrl}
                    </Text>
                </Container>
            </Body>
        </Html>
    );
};

const main = {
    backgroundColor: "#f6f9fc",
    fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    padding: "40px 0",
};

const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "40px",
    maxWidth: "520px",
    borderRadius: "8px",
};

const heading = {
    fontSize: "28px",
    lineHeight: "36px",
    fontWeight: "700",
    margin: "0 0 24px",
};

const text = {
    fontSize: "16px",
    lineHeight: "26px",
    color: "#374151",
    margin: "0 0 16px",
};

const secondaryText = {
    ...text,
    color: "#6b7280",
};

const buttonContainer = {
    textAlign: "center" as const,
    margin: "32px 0",
};

const button = {
    backgroundColor: "#111827",
    color: "#ffffff",
    padding: "12px 24px",
    borderRadius: "6px",
    fontSize: "16px",
    fontWeight: "600",
    textDecoration: "none",
};

const hr = {
    borderColor: "#e5e7eb",
    margin: "32px 0 20px",
};

const footer = {
    fontSize: "13px",
    lineHeight: "20px",
    color: "#6b7280",
    margin: "0 0 8px",
};

const link = {
    fontSize: "12px",
    lineHeight: "18px",
    color: "#6b7280",
    wordBreak: "break-all" as const,
};

export default AccountActivationEmail;