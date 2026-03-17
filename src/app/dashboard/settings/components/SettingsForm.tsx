'use client'
import AlertError from '@/shared/components/molecules/AlertError'
import AlertSuccess from '@/shared/components/molecules/AlertSuccess'
import DateRangeSelect from '@/shared/components/atoms/DateRangeSelect'
import Input1 from '@/shared/components/atoms/Input1'
import Label1 from '@/shared/components/atoms/Label1'
import SubmitButton from '@/shared/components/molecules/SubmitButton'
import { updateSettings } from '@/lib/actions'
import { useActionState } from 'react'

const initialState = {
  message: '',
  error: false,
}

export default function SettingsForm({ defaults }: { defaults?: Record<string, string> }) {
  const [state, formAction] = useActionState(updateSettings, initialState)
  return (
    <form className="space-y-4" action={formAction}>
      {state?.error && (
        <AlertError>{state?.message}</AlertError>
      )}
      {!state?.error && state?.message.length > 0 && (
        <AlertSuccess>{state?.message}</AlertSuccess>
      )}

      <Label1 htmlFor="fullName">User full name</Label1>
      <Input1 type="text" name="fullName" id="fullName" placeholder="User full name" defaultValue={defaults?.fullName} />

      <Label1 htmlFor="defaultView">Default transactions view</Label1>
      <DateRangeSelect name="defaultView" id="defaultView" defaultValue={defaults?.defaultView} />

      <SubmitButton>Update Settings</SubmitButton>
    </form>
  )
}
