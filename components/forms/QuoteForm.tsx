"use client";

import { FormEvent, useState } from "react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { FileUpload } from "@/components/ui/FileUpload";
import { Button } from "@/components/ui/Button";
import { validateQuote, type QuoteErrors } from "@/lib/validation";
import { services } from "@/data/services";
import type { Locale } from "@/lib/i18n";

type Status = "idle" | "submitting" | "success" | "error";

const projectTypes = {
  en: ["New Construction", "Renovation", "Supply / Trading", "Maintenance", "Other"],
  ar: ["إنشاء جديد", "تجديد", "توريد / تجارة", "صيانة", "أخرى"]
};

export function QuoteForm({ locale }: { locale: Locale }) {
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [file, setFile] = useState<File | null>(null);

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
          country: "Country",
          service: "Service",
          projectType: "Project Type",
          estimatedBudget: "Estimated Budget (optional)",
          projectLocation: "Project Location",
          requiredDate: "Required Date",
          projectDescription: "Project Description",
          attachment: "Attachment (optional)",
          attachmentHelp: "PDF, JPG or PNG, up to 10MB",
          selectService: "Select a service",
          selectType: "Select project type",
          submit: "Submit Quote Request",
          submitting: "Submitting...",
          successTitle: "Thank you",
          successMessage: "Your quote request has been received. Our team typically responds within one to two business days.",
          errorTitle: "Something went wrong",
          errorMessage: "We couldn't submit your request. Please try again or contact us directly."
        }
      : {
          fullName: "الاسم الكامل",
          companyName: "اسم الشركة",
          email: "البريد الإلكتروني",
          phone: "رقم الهاتف",
          country: "الدولة",
          service: "الخدمة",
          projectType: "نوع المشروع",
          estimatedBudget: "الميزانية التقديرية (اختياري)",
          projectLocation: "موقع المشروع",
          requiredDate: "التاريخ المطلوب",
          projectDescription: "وصف المشروع",
          attachment: "مرفق (اختياري)",
          attachmentHelp: "PDF أو JPG أو PNG، بحد أقصى 10 ميجابايت",
          selectService: "اختر خدمة",
          selectType: "اختر نوع المشروع",
          submit: "إرسال طلب عرض السعر",
          submitting: "جارٍ الإرسال...",
          successTitle: "شكراً لكم",
          successMessage: "تم استلام طلبكم بنجاح. عادةً ما يستجيب فريقنا خلال يوم إلى يومي عمل.",
          errorTitle: "حدث خطأ ما",
          errorMessage: "تعذر إرسال طلبكم. يرجى المحاولة مرة أخرى أو التواصل معنا مباشرة."
        };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const data = {
      fullName: String(form.get("fullName") || ""),
      companyName: String(form.get("companyName") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      country: String(form.get("country") || ""),
      service: String(form.get("service") || ""),
      projectType: String(form.get("projectType") || ""),
      estimatedBudget: String(form.get("estimatedBudget") || ""),
      projectLocation: String(form.get("projectLocation") || ""),
      requiredDate: String(form.get("requiredDate") || ""),
      projectDescription: String(form.get("projectDescription") || "")
    };
    const validation = validateQuote(data, t);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setStatus("submitting");
    try {
      const payload = new FormData();
      Object.entries(data).forEach(([k, v]) => payload.append(k, v));
      if (file) payload.append("attachment", file);

      const res = await fetch("/api/quote", {
        method: "POST",
        body: payload
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      (e.target as HTMLFormElement).reset();
      setFile(null);
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
        <Input name="companyName" label={labels.companyName} />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input name="email" type="email" label={labels.email} error={errors.email} required />
        <Input name="phone" type="tel" label={labels.phone} error={errors.phone} required />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input name="country" label={labels.country} />
        <Select
          name="service"
          label={labels.service}
          placeholder={labels.selectService}
          options={services.map((s) => ({
            value: s.slug,
            label: locale === "en" ? s.title.en : s.title.ar
          }))}
        />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Select
          name="projectType"
          label={labels.projectType}
          placeholder={labels.selectType}
          options={projectTypes[locale].map((p) => ({ value: p, label: p }))}
        />
        <Input name="estimatedBudget" label={labels.estimatedBudget} />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Input name="projectLocation" label={labels.projectLocation} />
        <Input name="requiredDate" type="date" label={labels.requiredDate} />
      </div>
      <Textarea
        name="projectDescription"
        label={labels.projectDescription}
        error={errors.projectDescription}
        required
        rows={6}
      />
      <FileUpload
        name="attachment"
        label={labels.attachment}
        helpText={labels.attachmentHelp}
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={setFile}
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
