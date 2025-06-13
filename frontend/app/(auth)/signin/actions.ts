"use server"
import { type SignInFormState, SignInFormSchema } from "@/lib/definitions"
// import { cookies } from "next/headers";

export async function signin(state: SignInFormState, formData: FormData) {
    // const cookie = await cookies();
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const validatedFields = SignInFormSchema.safeParse({
        email,
        password
    })


    console.log('valDat', validatedFields);


    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            values: {
                email,
                password
            }
        }
    }


    // const res = await fetch(`${process.env.API_URL}/auth/register`, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(validatedFields.data),
    // });

    // if (!res.ok) {
    //     return { error: 'Invalid credentials' };
    // }

    // const data = await res.json();

    // cookie.set('token', data.token, {
    //     httpOnly: true,
    //     secure: process.env.NODE_ENV === 'production',
    //     sameSite: 'lax',
    //     path: '/',
    //     maxAge: 60 * 60 * 24 * 7, // 7 days
    // });

    return { success: true } as const;
}