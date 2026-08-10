"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { validateContact, type ContactErrors } from "@/lib/validation";
import { services } from "@/data/services";
import type { Locale } from "@/lib/i18n";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ locale }: { locale: Locale }) {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const t = {
    required: locale === "en" ? "This field is required" : "هذا الحقل مطلوب",
    email: locale === "en" ? "Please enter a valid email address" : "يرجى إدخال بريد إلكتروني صحيح",
    phone: locale === "en" ? "Please enter a valid phone number" : "يرجى إدخال رقم هاتف صحيح"
  };

  const labels =
    locale === "en"
      ? {
          fullName: "Full Name",
          companyName: "Company Name",
          email: "Email Address",
          phone: "Phone Number",
          serviceRequired: "Service Required",
          subject: "Subject",
          message: "Message",
          submit: "Send Message",
          submitting: "Submitting...",
          successTitle: "Thank you",
          successMessage: "Your message has been received. Our team will get back to you shortly.",
          errorTitle: "Something went wrong",
          errorMessage: "We couldn't submit your request. Please try again or contact us directly.",
          selectService: "Select a service"
        }
      : {
          fullName: "الاسم الكامل",
          companyName: "اسم الشركة",
          email: "البريد الإلكتروني",
          phone: "رقم الهاتف",
          serviceRequired: "الخدمة المطلوبة",
          subject: "الموضوع",
          message: "الرسالة",
          submit: "إرسال الرسالة",
          submitting: "جارٍ الإرسال...",
          successTitle: "شكراً لكم",
          successMessage: "تم استلام رسالتكم بنجاح. سيتواصل معكم فريقنا في أقرب وقت.",
          errorTitle: "حدث خطأ ما",
          errorMessage: "تعذر إرسال طلبكم. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة.",
          selectService: "اختر خدمة"
        };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      fullName: String(form.get("fullName") || ""),
      companyName: String(form.get("companyName") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      serviceRequired: String(form.get("serviceRequired") || ""),
      subject: String(form.get("subject") || ""),
      message: String(form.get("message") || "")
    };
    const validation = validateContact(data, t);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-gold/30 bg-gold/5 p-8 text-center">
        <h3 className="font-serif text-xl font-bold text-navy">{labels.successTitle}</h3>
        <p className="mt-2 text-sm text-navy-500">{labels.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input name="fullName" label={labels.fullName} error={errors.fullName} required />
        <Input name="companyName" label={labels.companyName} error={errors.companyName} />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input name="email" type="email" label={labels.email} error={errors.email} required />
        <Input name="phone" type="tel" label={labels.phone} error={errors.phone} required />
      </div>
      <Select
        name="serviceRequired"
        label={labels.serviceRequired}
        placeholder={labels.selectService}
        options={services.map((s) => ({
          value: s.slug,
          label: locale === "en" ? s.title.en : s.title.ar
        }))}
      />
      <Input name="subject" label={labels.subject} error={errors.subject} required />
      <Textarea name="message" label={labels.message} error={errors.message} required />

      {status === "error" && (
        <div className="rounded-sm border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          <p className="font-semibold">{labels.errorTitle}</p>
          <p>{labels.errorMessage}</p>
        </div>
      )}

      <Button type="submit" disabled={status === "submitting"} className="w-full sm:w-fit">
        {status === "submitting" ? labels.submitting : labels.submit}
      </Button>
    </form>
  );
}
