import * as yup from "yup";

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .matches(/a-zA-Z0-9/, "letters and numbers only")
    .required()
    .min(3)
    .max(30),
  email: yup
    .string()
    .required()
    .email()
    .min(3)
    .max(500),
  password: yup
    .string()
    .email()
    .min(5)
    .max(1000)
    .required()
});
