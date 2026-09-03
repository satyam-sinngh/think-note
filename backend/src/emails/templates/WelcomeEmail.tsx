import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Link,
    Preview,
    Section,
    Text,
} from "@react-email/components";

interface WelcomeEmailProps {
    name: string;
    loginUrl: string;
}

export default function WelcomeEmail({
                                         name,
                                         loginUrl,
                                     }: WelcomeEmailProps) {
    return (
        <Html>
            <Head/>

            <Preview>
                Welcome to Think Note, {name}!
            </Preview>

            <Body
                style={{
                    backgroundColor: "#f6f9fc",
                    fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
                    margin: 0,
                    padding: "40px 0",
                }}
            >
                <Container
                    style={{
                        backgroundColor: "#ffffff",
                        borderRadius: "8px",
                        margin: "0 auto",
                        padding: "40px",
                        maxWidth: "560px",
                    }}
                >
                    <Heading
                        style={{
                            color: "#111827",
                            fontSize: "28px",
                            fontWeight: "700",
                            marginBottom: "24px",
                        }}
                    >
                        Welcome to Think Note, {name}! 👋
                    </Heading>

                    <Text
                        style={{
                            color: "#374151",
                            fontSize: "16px",
                            lineHeight: "24px",
                        }}
                    >
                        Your account has been successfully verified.
                    </Text>

                    <Text
                        style={{
                            color: "#374151",
                            fontSize: "16px",
                            lineHeight: "24px",
                        }}
                    >
                        You can now start using Think Note to capture your
                        thoughts, organize your ideas, and keep everything
                        important in one place.
                    </Text>

                    <Section style={{margin: "32px 0"}}>
                        <Link
                            href={loginUrl}
                            style={{
                                backgroundColor: "#111827",
                                borderRadius: "6px",
                                color: "#ffffff",
                                display: "inline-block",
                                fontSize: "16px",
                                fontWeight: "600",
                                padding: "12px 24px",
                                textDecoration: "none",
                            }}
                        >
                            Go to Think Note
                        </Link>
                    </Section>

                    <Hr
                        style={{
                            borderColor: "#e5e7eb",
                            margin: "32px 0",
                        }}
                    />

                    <Text
                        style={{
                            color: "#6b7280",
                            fontSize: "14px",
                            lineHeight: "20px",
                        }}
                    >
                        Thanks for joining Think Note. We're glad to have you
                        here.
                    </Text>

                    <Text
                        style={{
                            color: "#9ca3af",
                            fontSize: "12px",
                            marginTop: "32px",
                        }}
                    >
                        © {new Date().getFullYear()} Think Note
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}