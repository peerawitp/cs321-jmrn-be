import { t } from "elysia";

export const LoginDTO = t.Object({
  email: t.String({
    format: "email",
  }),
  password: t.String({
    minLength: 8,
  }),
});

export const LoginResponseDTO = t.Object({
  token: t.String(),
});

export const RegisterDTO = t.Object({
  email: t.String({
    format: "email",
  }),
  password: t.String({
    minLength: 8,
    maxLength: 20,
  }),
  phone: t.String({
    minLength: 10,
    maxLength: 10,
  }),
  firstName: t.String({
    pattern: "^[a-zA-Z]+$",
    error: "Firstname must be characters",
  }),
  lastName: t.String({
    pattern: "^[a-zA-Z]+$",
    error: "Lastname must be characters",
  }),
});

export const RegisterResponseDTO = t.Object({
  id: t.String(),
  email: t.String({
    format: "email",
  }),
  token: t.String(),
});
