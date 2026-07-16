"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function update(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Demo only: no message is actually transmitted.
    setSent(true);
  }

  if (sent) {
    return (
      <div className="card p-6 text-center">
        <div className="text-3xl">🌻</div>
        <h3 className="mt-2 text-lg font-bold text-soil-900">Thanks — message received</h3>
        <p className="mt-1 text-sm text-soil-600">
          This is a demo form, so nothing was actually sent. In production this
          would land in our inbox and we&apos;d get back to you within two
          business days.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card space-y-4 p-6">
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-soil-800">Name</label>
        <input
          id="name"
          value={form.name}
          onChange={update("name")}
          required
          className="w-full rounded-xl border border-soil-200 px-4 py-2.5 text-sm outline-none focus:border-sprout-400 focus:ring-2 focus:ring-sprout-200"
        />
      </div>
      <div>
        <label htmlFor="cemail" className="mb-1 block text-sm font-medium text-soil-800">Email</label>
        <input
          id="cemail"
          type="email"
          value={form.email}
          onChange={update("email")}
          required
          className="w-full rounded-xl border border-soil-200 px-4 py-2.5 text-sm outline-none focus:border-sprout-400 focus:ring-2 focus:ring-sprout-200"
        />
      </div>
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-soil-800">Message</label>
        <textarea
          id="message"
          rows={4}
          value={form.message}
          onChange={update("message")}
          required
          className="w-full resize-none rounded-xl border border-soil-200 px-4 py-2.5 text-sm outline-none focus:border-sprout-400 focus:ring-2 focus:ring-sprout-200"
        />
      </div>
      <button type="submit" className="btn-primary w-full">Send message</button>
    </form>
  );
}
