import { Resend } from "resend";
import { renderAsync } from "@react-email/render";
import EmailBiolerPlate from "../components/EmailBiolerPlate.jsx";

class EmailService {
  constructor() {
    this.resend = new Resend(import.meta.env.VITE_APP_RESEND);
  }

  async sendWelcomeEmail(email, name = "there") {
    try {
      const html = await renderAsync(EmailBiolerPlate({ name }));

      const { data, error } = await this.resend.emails.send({
        from: "himanshuKhairnar@resend.dev",
        to: email,
        subject: "Welcome to Bloggers - Thanks for subscribing!",
        html: html,
      });

      if (error) {
        console.error("Failed to send email:", error);
        return { success: false, error };
      }

      console.log("Email sent successfully:", data);
      return { success: true, data };
    } catch (err) {
      console.error("Exception during email sending:", err);
      return { success: false, error: err.message };
    }
  }
}

export default new EmailService();
