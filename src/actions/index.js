"use server";
import { signIn } from "../auth";

export async function authenticate(
   _prevState,
    formData 
  ) {
    try {
      await signIn("credentials", Object.fromEntries(formData));
    } catch (error) {
      if ((error).message.includes("CredentialsSignin")) {
        return "CredentialSignin";
      }
      throw error;
    }
  }