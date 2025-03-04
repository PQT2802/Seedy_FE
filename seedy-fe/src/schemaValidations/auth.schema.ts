import z from "zod";

// Schema cho form (bao gồm confirmPassword để validate trên client)
export const RegisterFormSchema = z
  .object({
    UserName: z
      .string()
      .trim()
      .min(2, "Username must be at least 2 characters")
      .max(256),
    FullName: z
      .string()
      .trim()
      .min(2, "Full name must be at least 2 characters")
      .max(256),
    Email: z.string().email("Invalid email address"),
    Password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters")
      .max(100),
    PhoneNumber: z.string().regex(/^(\+?0?\d{9,14})$/, "Invalid phone number"),
    Address: z.string().optional(),
    DateOfBirth: z.string().refine(
      (dateStr) => {
        const birthDate = new Date(dateStr);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (
          monthDiff < 0 ||
          (monthDiff === 0 && today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        return age >= 18;
      },
      { message: "Must be at least 18 years old" }
    ),
  })
  .refine((data) => data.Password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Schema cho request body (không bao gồm confirmPassword)
export const RegisterBody = z
  .object({
    UserName: z.string().trim().min(2).max(256),
    FullName: z.string().trim().min(2).max(256),
    Email: z.string().email(),
    Password: z.string().min(6).max(100),
    PhoneNumber: z.string().regex(/^(\+?0?\d{9,14})$/, "Invalid phone number"),
    Address: z.string().optional(),
    DateOfBirth: z.string(),
  })
  .strict();

export type RegisterBodyType = z.infer<typeof RegisterBody>;

// Các định nghĩa khác giữ nguyên
export const RegisterRes = z.object({
  data: z.object({
    token: z.string(),
    expiresAt: z.string(),
    account: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
    }),
  }),
  message: z.string(),
});

export type RegisterResType = z.infer<typeof RegisterRes>;

export const LoginBody = z
  .object({
    Email: z.string().email(),
    Password: z.string().min(6).max(100),
  })
  .strict();

export type LoginBodyType = z.infer<typeof LoginBody>;

export const LoginRes = RegisterRes;
export type LoginResType = z.infer<typeof LoginRes>;

export const SlideSessionBody = z.object({}).strict();
export type SlideSessionBodyType = z.infer<typeof SlideSessionBody>;

export const SlideSessionRes = RegisterRes;
export type SlideSessionResType = z.infer<typeof SlideSessionRes>;
