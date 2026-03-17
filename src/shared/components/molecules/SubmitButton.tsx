import Button1 from '@/shared/components/atoms/Button1'
import { useFormStatus } from 'react-dom'
import { Loader } from 'lucide-react'
import type { ComponentProps } from 'react'

type SubmitButtonProps = ComponentProps<typeof Button1>

export default function SubmitButton(props: SubmitButtonProps) {
  const { pending } = useFormStatus()
  return <Button1 {...props} className={`${props.className ?? ''} flex items-center justify-center space-x-1`} disabled={pending}>
    {pending && <Loader className="animate-spin w-4 h-4" />}
    <span>{props.children}</span>
  </Button1>
}
