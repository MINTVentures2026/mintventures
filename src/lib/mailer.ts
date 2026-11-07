// Sends enquiry mails. The transport is chosen by configuration so the page code
// stays the same in production (SMTP) and in local development or tests (log).

import nodemailer from "nodemailer";

export interface Mail {
  subject: string;
  text: string;
  replyTo: string;
}

export interface Mailer {
  send(mail: Mail): Promise<void>;
}

export interface MailConfig {
  transport: "smtp" | "log";
  to: string;
  host?: string;
  port: number;
  user?: string;
  pass?: string;
  /** false in production, so enquiries can never silently end up in logs. */
  allowLog: boolean;
}

export function createMailer(config: MailConfig): Mailer {
  if (config.transport === "log") {
    if (!config.allowLog) throw new Error("MAIL_TRANSPORT=log is not allowed in production");
    return {
      async send(mail) {
        console.info(`[mail:log] to=${config.to} subject="${mail.subject}"\n${mail.text}`);
      },
    };
  }

  const { host, port, user, pass, to } = config;
  if (!host || !user || !pass) {
    throw new Error("SMTP is not configured: set SMTP_HOST, SMTP_USER and SMTP_PASS");
  }
  const transport = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
  return {
    async send(mail) {
      await transport.sendMail({ from: user, to, replyTo: mail.replyTo, subject: mail.subject, text: mail.text });
    },
  };
}
