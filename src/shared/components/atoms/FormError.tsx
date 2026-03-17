type FormErrorProps = {
  error?: { message?: string } | null
}

export default function FormError({ error }: FormErrorProps) {
  return error && <p className="mt-1 text-red-500">{error.message}</p>
}
