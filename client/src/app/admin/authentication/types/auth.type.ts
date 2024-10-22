import { z } from "zod";

export const formSchemaAuth = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export interface IAuthToken {
  access_token: string;
  expires: number; // assuming this is in milliseconds or a similar numeric value
  refresh_token: string;
}

export type IAuthenticationRequest = z.infer<typeof formSchemaAuth>;
