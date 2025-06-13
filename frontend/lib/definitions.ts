import { z } from 'zod'

export const SignupFormSchema = z.object({
    firstName: z
        .coerce
        .string()
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .trim(),
    lastName: z
        .coerce
        .string()
        .min(2, { message: 'Name must be at least 2 characters long.' })
        .trim(),
    email: z.coerce.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .coerce
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
})

export const SignInFormSchema = z.object({
    email: z.coerce.string().email({ message: 'Please enter a valid email.' }).trim(),
    password: z
        .coerce
        .string()
        .min(8, { message: 'Be at least 8 characters long' })
        .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
        .regex(/[0-9]/, { message: 'Contain at least one number.' })
        .regex(/[^a-zA-Z0-9]/, {
            message: 'Contain at least one special character.',
        })
        .trim(),
})

export type SignUpFormState =
    | {
        errors: {
            firstName?: string[];
            lastName?: string[];
            email?: string[];
            password?: string[];
        };
        values: {
            firstName: string;
            lastName: string;
            email: string;
        };
        success?: undefined;
    }
    | {
        success: true;
        errors?: undefined;
        values?: undefined;
      };


export type SignInFormState =
    | {
        errors: {
            email?: string[];
            password?: string[];
        };
        values: {
            email: string;
        };
        success?: undefined;
    }
    | {
        success: true;
        errors?: undefined;
        values?: undefined;
    };
  