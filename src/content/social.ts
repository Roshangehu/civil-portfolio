export const contact = {
  email: "ravirajjoshi91@gmail.com",
  phone: "6398283036",
  phoneDisplay: "+91 63982 83036",
} as const;

export const social = [
  { url: `mailto:${contact.email}`, name: "mail" },
  { url: "https://www.instagram.com/mayadar_ravi?igsh=MWIzNDJ1MjdkajRyMw==", name: "instagram" },
  { url: "https://www.facebook.com/share/1JHMM1qGZ3/", name: "facebook" },
  { url: `tel:+91${contact.phone}`, name: "phone" },
] as const satisfies { url: string; name: "mail" | "instagram" | "facebook" | "phone" }[];
