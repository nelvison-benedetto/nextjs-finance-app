'use client'
import Input1 from '@/shared/components/atoms/Input1'
import SubmitButton from '@/shared/components/molecules/SubmitButton'
import { login } from '@/lib/actions'
import { useActionState } from 'react'

const initialState = {
  message: '',
  error: false
}

export default function LoginForm() {
  const [state, formAction] = useActionState(login, initialState)
  return <form action={formAction} className="space-y-2">
    <Input1 type="email" placeholder="name@example.com"
      name="email" required />
    <SubmitButton type="submit" size="sm" className="w-full">
      Sign in with email
    </SubmitButton>
    <p className={`${state?.error ? 'text-red-500' : 'text-green-500'} text-sm text-center`}>
      {state?.message}
    </p>
  </form>
}
