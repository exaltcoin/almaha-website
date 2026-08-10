export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function isValidPhone(value: string): boolean {
  // Accepts international formats with optional +, spaces, dashes; 7-15 digits.
  const digits = value.replace(/[^\d]/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

export function required(value: string | undefined | null): boolean {
  return Boolean(value && value.trim().length > 0);
}

export type ContactPayload = {
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  serviceRequired?: string;
  subject: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

export function validateContact(
  data: Partial<ContactPayload>,
  t: { required: string; email: string; phone: string }
): ContactErrors {
  const errors: ContactErrors = {};
  if (!required(data.fullName)) errors.fullName = t.required;
  if (!required(data.email)) errors.email = t.required;
  else if (!isValidEmail(data.email!)) errors.email = t.email;
  if (!required(data.phone)) errors.phone = t.required;
  else if (!isValidPhone(data.phone!)) errors.phone = t.phone;
  if (!required(data.subject)) errors.subject = t.required;
  if (!required(data.message)) errors.message = t.required;
  return errors;
}

export type QuotePayload = {
  fullName: string;
  companyName?: string;
  email: string;
  phone: string;
  country?: string;
  service?: string;
  projectType?: string;
  estimatedBudget?: string;
  projectLocation?: string;
  requiredDate?: string;
  projectDescription: string;
};

export type QuoteErrors = Partial<Record<keyof QuotePayload, string>>;

export function validateQuote(
  data: Partial<QuotePayload>,
  t: { required: string; email: string; phone: string }
): QuoteErrors {
  const errors: QuoteErrors = {};
  if (!required(data.fullName)) errors.fullName = t.required;
  if (!required(data.email)) errors.email = t.required;
  else if (!isValidEmail(data.email!)) errors.email = t.email;
  if (!required(data.phone)) errors.phone = t.required;
  else if (!isValidPhone(data.phone!)) errors.phone = t.phone;
  if (!required(data.projectDescription))
    errors.projectDescription = t.required;
  return errors;
}

export type CareerPayload = {
  fullName: string;
  email: string;
  phone: string;
  position?: string;
  coverNote?: string;
};

export type CareerErrors = Partial<Record<keyof CareerPayload, string>>;

export function validateCareer(
  data: Partial<CareerPayload>,
  t: { required: string; email: string; phone: string }
): CareerErrors {
  const errors: CareerErrors = {};
  if (!required(data.fullName)) errors.fullName = t.required;
  if (!required(data.email)) errors.email = t.required;
  else if (!isValidEmail(data.email!)) errors.email = t.email;
  if (!required(data.phone)) errors.phone = t.required;
  else if (!isValidPhone(data.phone!)) errors.phone = t.phone;
  return errors;
}
