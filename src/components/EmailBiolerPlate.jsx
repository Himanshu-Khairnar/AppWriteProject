import React from "react";
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export const EmailBiolerPlate = ({ name = "there" }) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Bloggers - Thanks for subscribing!</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section style={styles.header}>
            <Heading style={styles.heading}>
              Welcome to <span style={styles.highlight}>Bloggers</span>!
            </Heading>
          </Section>
          <Section style={styles.content}>
            <Text style={styles.text}>Hey {name} 👋,</Text>
            <Text style={styles.text}>
              Thank you for subscribing to <strong>Bloggers</strong>! We're
              excited to have you on board.
            </Text>
            <Text style={styles.text}>
              You'll now get the latest blog posts, tutorials, and project
              updates right in your inbox.
            </Text>
            <Text style={styles.text}>Stay tuned and keep learning ✨</Text>
            <Hr style={styles.hr} />
            <Text style={styles.text}>
              Happy blogging,
              <br />— The Bloggers Team
            </Text>
          </Section>
          <Section style={styles.footer}>
            <Text style={styles.footerText}>
              © {new Date().getFullYear()} Bloggers. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

const styles = {
  body: {
    backgroundColor: "#f7f7f7",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  header: {
    backgroundColor: "#111827",
    padding: "20px",
    textAlign: "center",
  },
  heading: {
    color: "#ffffff",
    fontSize: "24px",
    margin: "0",
  },
  highlight: {
    color: "#3b82f6",
  },
  content: {
    padding: "20px",
    color: "#333333",
  },
  text: {
    fontSize: "16px",
    lineHeight: "1.5",
    margin: "16px 0",
  },
  hr: {
    borderColor: "#eaeaea",
    margin: "20px 0",
  },
  footer: {
    backgroundColor: "#f3f4f6",
    padding: "15px",
    textAlign: "center",
  },
  footerText: {
    fontSize: "12px",
    color: "#6b7280",
    margin: "0",
  },
};

export default EmailBiolerPlate;
