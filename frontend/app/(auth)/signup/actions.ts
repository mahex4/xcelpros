"use server"
import { type SignUpFormState, SignupFormSchema } from "@/lib/definitions"
import { cookies } from "next/headers";

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
      

    console.log('valDat', validatedFields);


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

    console.log('called 1');

    const res = await fetch(`http://localhost:5001/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validatedFields.data),
    });

    console.log('called 2');

    if (!res.ok) {
        return { error: 'Invalid credentials' };
    }
    console.log('called 3');
    const data = await res.json();

    console.log('signup reg', data);

    cookie.set('token', data.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return { success: true } as const;   
}