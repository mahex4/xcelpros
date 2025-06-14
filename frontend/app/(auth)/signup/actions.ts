"use server"
import { type SignUpFormState, SignupFormSchema } from "@/lib/definitions"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signup(state: SignUpFormState, formData: FormData) {
    const cookie = await cookies();
    const firstName = String(formData.get("firstName") ?? "");
    const lastName = String(formData.get("lastName") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const validatedFields = SignupFormSchema.safeParse({
        firstName,
        lastName,
        email,
        password
    })
      
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            values: {
                firstName,
                lastName,
                email,
                password
            }
        }
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedFields.data),
    });


    if (!res.ok) {
        return { error: 'Invalid credentials' };
    }

    const data = await res.json();

    cookie.set('token', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    redirect("/dashboard");
    
    return { 
        success: true,
        values: { firstName, lastName, email, password },
    } as const;   
}