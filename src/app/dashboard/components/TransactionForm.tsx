'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'  //per redirect dopo submit
import { useState } from 'react'
import { transactionSchema } from '@/lib/validation'
import { createTransaction, updateTransaction } from '@/lib/actions'
import Button1 from '@/shared/components/atoms/Button1'
import Input1 from '@/shared/components/atoms/Input1'
import Label1 from '@/shared/components/atoms/Label1'
import Select1 from '@/shared/components/atoms/Select1'
import FormError from '@/shared/components/atoms/FormError'
import { categories, types } from '@/lib/consts'
import type { z } from 'zod'

type TransactionFormInput = z.input<typeof transactionSchema>
type TransactionFormOutput = z.output<typeof transactionSchema>

type TransactionInitialData = TransactionFormOutput & { id: number }  //serve per editing

export default function TransactionForm({ initialData }: { initialData?: TransactionInitialData }) {
  const {
    register,  //collega input al form
    handleSubmit,
    watch,  //osserva valori in tempo reale
    setValue,  //cambia valore manualmente
    formState: { errors },
  } = useForm<TransactionFormInput, unknown, TransactionFormOutput>({
    mode: 'onTouched',  //valida solo quando il campo viene toccato
    resolver: zodResolver(transactionSchema),  //USA ZOD X VALIDARE
    defaultValues: initialData ?? {
      created_at: new Date().toISOString().split('T')[0]  //data attuale e.g. "2024-01-01T10:30:00" diventa "2024-01-01"
    }
  })

  const router = useRouter()
  const [isSaving, setSaving] = useState(false)  //loading submit
  const [lastError, setLastError] = useState<{ message: string } | null>(null)  //errore server
  const type = watch('type')  //osservi il campo type
  const editing = Boolean(initialData)

  const onSubmit = async (data: TransactionFormOutput) => {
    setSaving(true)
    setLastError(null)
    try {
      if (editing && initialData) {
        await updateTransaction(initialData.id, data)
      } else {
        await createTransaction(data)
      }
      router.push('/dashboard')   //redirect dopo successo
    } catch (error) {
      setLastError(error as { message: string })
    } finally {
      setSaving(false)
    }
  }

  return <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      
      <div>
        <Label1 className="mb-1">Type</Label1>
        <Select1 {...register('type', {
          onChange: (e) => {
            if (e.target.value !== 'Expense') {
              setValue('category', '')   
            }  //reset category se non è Expense
          }
        })}>  {/*collega input -> form*/}
          {types.map(t => <option key={t}>{t}</option>)}
        </Select1>
        <FormError error={errors.type} />
      </div>

      <div>
        <Label1 className="mb-1">Category</Label1>
        <Select1 {...register('category')} disabled={type !== 'Expense'}>
          <option value="">Select a category</option>
          {categories.map(category => <option key={category}>{category}</option>)}
        </Select1>
        <FormError error={errors.category} />
      </div>

      <div>
        <Label1 className="mb-1">Date</Label1>
        <Input1 {...register('created_at')} disabled={editing} />
        <FormError error={errors.created_at} />
      </div>

      <div>
        <Label1 className="mb-1">Amount</Label1>
        <Input1 type="number" {...register('amount')} />
        <FormError error={errors.amount} />
      </div>

      <div className="col-span-1 md:col-span-2">
        <Label1 className="mb-1">Description</Label1>
        <Input1 {...register('description')} />
        <FormError error={errors.description} />
      </div>
    </div>

    <div className="flex justify-between items-center">
      <div>
        {lastError && <FormError error={lastError} />}
      </div>
      <Button1 type="submit" disabled={isSaving}>Save</Button1>
    </div>
  </form>
}
