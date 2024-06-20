import { ContactFormType } from "../constants/ContactFormTypes";
import http from "../utils/http";

export const sendContactForm = (data: ContactFormType) => {
  return http.post("/contact-us", data);
};
