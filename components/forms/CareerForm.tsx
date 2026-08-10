"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { FileUpload } from "@/components/ui/FileUpload";
import { Button } from "@/components/ui/Button";
import { validateCareer, type CareerErrors } from "@/lib/validation";
import type { Locale } from "@/lib/i18n";

type Status = "idle" | "submitting" | "success" | "error";

export function CareerForm({ locale }: { locale: Locale }) {
  const [errors, setErrors] = useState<CareerErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [cv, setCv] = useState<File | null>(null);

  const t = {
    required: locale === "en" ? "This field is required" : "هذا الحقل مطلوب",
    email: locale === "en" ? "Please enter a valid email address" : "يرجى إدخال بريد إلكتروني صحيح",
    phone: locale === "en" ? "Please enter a valid phone number" : "يرجى إدخال رقم هاتف صحيح"
  };

  const labels =
    locale === "en"
      ? {
          fullName: "Full Name",
          email: "Email Address",
          phone: "Phone Number",
          position: "Position Applying For",
          coverNote: "Cover Note",
          cvUpload: "Upload CV / Resume",
          cvHelp: "PDF or Word document, up to 10MB",
          submit: "Submit Application",
          submitting: "Submitting...",
          successTitle: "Application Received",
          successMessage: "Thank you for your interest in Al Maha National Company. Our HR team will review your application and reach out if there is a match.",
          errorTitle: "Something went wrong",
          errorMessage: "We couldn't submit your application. Please try again or contact us directly."
        }
      : {
          fullName: "الاسم الكامل",
          email: "البريد الإلكتروني",
          phone: "رقم الهاتف",
          position: "الوظيفة المتقدم لها",
          coverNote: "رسالة تعريفية",
          cvUpload: "رفع السيرة الذاتية",
          cvHelp: "ملف PDF أو Word، بحد أقصى 10 ميجابايت",
          submit: "إرسال الطلب",
          submitting: "جارٍ الإرسال...",
          successTitle: "تم استلام الطلب",
          successMessage: "شكراً لاهتمامكم بشركة المها الوطنية. سيقوم فريق الموارد البشرية بمراجعة طلبكم والتواصل معكم في حال وجود تطابق.",
          errorTitle: "حدث خطأ ما",
          errorMessage: "تعذر إرسال طلبكم. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة."
        };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      fullName: String(form.get("fullName") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      position: String(form.get("position") || ""),
      coverNote: String(form.get("coverNote") || "")
    };
    const validation = validateCareer(data, t);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus("submitting");
    try {
      const payload = new FormData();
      Object.entries(data).forEach(([k, v]) => payload.append(k, v));
      if (cv) payload.append("cv", cv);

      const res = await fetch("/api/careers", { method: "POST", body: payload });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      (e.target as HTMLFormElement).reset();
      setCv(null);
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
        <Input name="position" label={labels.position} />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input name="email" type="email" label={labels.email} error={errors.email} required />
        <Input name="phone" type="tel" label={labels.phone} error={errors.phone} required />
      </div>
      <Textarea name="coverNote" label={labels.coverNote} rows={5} />
      <FileUpload
        name="cv"
        label={labels.cvUpload}
        helpText={labels.cvHelp}
        accept=".pdf,.doc,.docx"
        onChange={setCv}
      />

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
