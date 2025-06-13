'use client'
import { useActionState } from 'react'
import { signin } from './actions'
import { Input } from '@/components/ui/input'
import { SignInFormState } from '@/lib/definitions'
import { Button } from '@/components/ui/button'


const initialState: SignInFormState = {
    errors: {},
    values: {
        email: ""
    },
    success: undefined,
}

export default function SignupForm() {
    const [state, action, pending] = useActionState(signin, initialState)

    return (
        <section className=" w-full h-screen flex flex-col gap-8 justify-center items-center px-5">
            <div className="flex flex-col gap-2 justify-center items-center">
                <h1 className=' text-2xl font-semibold'>Sign In</h1>
                <p className='text-center text-sm'>Sign in to access your dashboard and <br/>continue tracking your progress</p>
            </div>
            <form action={action} noValidate className='flex flex-col w-full md:w-1/4'>
                <div className='flex flex-col justify-center items-center'>
                    <label htmlFor="email" className='sr-only'>Email</label>
                    <Input id="email" name="email" placeholder="Email" defaultValue={state?.values?.email?.toString()} />
                    <div className="self-start min-h-6 flex justify-center items-center">
                        {state?.errors?.email && <p className='text-xs text-red-500'>{state.errors.email}</p>}
                    </div>
                </div>

                <div className='flex flex-col justify-center items-center'>
                    <label htmlFor="password" className='sr-only'>Password</label>
                    <Input id="password" name="password" type="password" placeholder='Enter Password' />
                    <div className="my-4 w-full">
                        {state?.errors?.password && (
                            <div className='self-start p-4 min-h-6 rounded-md border w-full flex flex-col justify-start items-start'>
                                <p className='text-xs text-red-500 mb-1'>Password must:</p>
                                <ul className='pl-4'>
                                    {state.errors.password.map((error) => (
                                        <li className='text-xs text-red-500' key={error}>◦ {error}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
                
                <Button disabled={pending} type="submit">
                    Sign Up
                </Button>
            </form>
        </section>
    )
}