"use client";

import { useState } from "react";
import { buildMailtoHref } from "./ContactMailLink";

export type ContactFormApp = { value: string; label: string };

export type ContactFormContent = {
  appLabel: string;
  apps: ContactFormApp[];
  name: string;
  namePlaceholder: string;
  bodyGreetingWithName: string; // e.g. "Hello, I'm {name}."
  subject: string;
  message: string;
  submit: string;
};

type ContactFormProps = {
  toEmail: string;
  form: ContactFormContent;
};

export function ContactForm({ toEmail, form }: ContactFormProps) {
  const [app, setApp] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const messageText = message.trim();
    const nameTrimmed = name.trim();
    const body = nameTrimmed
      ? form.bodyGreetingWithName.replace(/\{name\}/g, nameTrimmed) + "\n\n" + messageText
      : messageText;
    const appLabel = form.apps.find((a) => a.value === app)?.label;
    const userSubject = subject.trim();
    const subjectLine =
      appLabel && app
        ? (userSubject ? `[${appLabel}] ${userSubject}` : `[${appLabel}]`)
        : userSubject;
    const href = buildMailtoHref(toEmail, subjectLine, body);
    window.location.href = href;
  }

  const inputClass =
    "w-full rounded-xl border border-border bg-white px-4 py-3 text-primary placeholder:text-muted/80 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors";
  const labelClass = "mb-1.5 block text-left text-sm font-medium text-primary";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-md space-y-4 rounded-2xl border border-border bg-white p-6 text-left shadow-sm"
    >
      <div>
        <label htmlFor="contact-name" className={labelClass}>
          {form.name}
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          placeholder={form.namePlaceholder}
        />
      </div>
      <div>
        <label htmlFor="contact-app" className={labelClass}>
          {form.appLabel}
        </label>
        <select
          id="contact-app"
          value={app}
          onChange={(e) => setApp(e.target.value)}
          className={inputClass}
        >
          {form.apps.map((option) => (
            <option key={option.value || "none"} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="contact-subject" className={labelClass}>
          {form.subject}
        </label>
        <input
          id="contact-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className={inputClass}
          placeholder={form.subject}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className={labelClass}>
          {form.message}
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          className={inputClass + " resize-y"}
          placeholder={form.message}
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 active:scale-[0.98]"
      >
        {form.submit}
      </button>
    </form>
  );
}
