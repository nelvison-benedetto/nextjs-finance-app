import Trend from '@/shared/components/organisms/Trend'
import AppHeader from '@/shared/components/layout/AppHeader'
import TransactionItem from '@/shared/components/organisms/TransactionItem'
import TransactionSummaryItem from '@/shared/components/organisms/TransactionSummaryItem'
import Button1 from '@/shared/components/atoms/Button1'
import Label1 from '@/shared/components/atoms/Label1'
import Input1 from '@/shared/components/atoms/Input1'
import Select1 from '@/shared/components/atoms/Select1'
import Separator1 from '@/shared/components/atoms/Separator1'
import Skeleton from '@/shared/components/atoms/Skeleton'

export const metadata = {
  title: 'Playground'
}

export default function Page() {
  return (
    <main className="space-y-8 mb-44">
      <h1 className="text-4xl mt-8">Playground</h1>

      <div>
        <h2 className="mb-4 text-lg font-mono">AppHeader</h2>
        <Separator1 />
        <div><AppHeader /></div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">Trend</h2>
        <Separator1 />
        <div className="flex space-x-8">
          <Trend type="Income" amount={1000} prevAmount={900} />
          <Trend type="Expense" amount={12000} prevAmount={10000} />
          <Trend type="Investment" amount={7000} prevAmount={11100} />
          <Trend type="Saving" amount={500} prevAmount={950} />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">TransactionItem</h2>
        <Separator1 />
        <div className="space-y-4">
          <TransactionItem id={1} type="Income" description="Salary" amount={2000} onRemoved={() => {}} />
          <TransactionItem id={2} type="Expense" category="Food" description="Going out to eat" amount={29} onRemoved={() => {}} />
          <TransactionItem id={3} type="Saving" description="For children" amount={500} onRemoved={() => {}} />
          <TransactionItem id={4} type="Investment" description="In Microsoft" amount={9000} onRemoved={() => {}} />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">TransactionSummaryItem + TransactionItem</h2>
        <Separator1 />
        <div className="space-y-4">
          <TransactionSummaryItem date="2024-05-01" amount={3500} />
          <Separator1 />
          <TransactionItem id={5} type="Income" description="Salary" amount={2000} onRemoved={() => {}} />
          <TransactionItem id={6} type="Expense" category="Food" description="Going out to eat" amount={29} onRemoved={() => {}} />
          <TransactionItem id={7} type="Saving" description="For children" amount={500} onRemoved={() => {}} />
          <TransactionItem id={8} type="Investment" description="In Microsoft" amount={9000} onRemoved={() => {}} />
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">Buttons</h2>
        <Separator1 />
        <div className="space-x-4">
          <Button1>Hello</Button1>
          <Button1 variant="outline">Hello</Button1>
          <Button1 variant="ghost">Hello</Button1>

          <Button1 size="xs">Hello</Button1>
          <Button1 size="sm">Hello</Button1>
          <Button1 size="lg">Hello</Button1>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">Forms</h2>
        <Separator1 />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label1 className="mb-1">Your name</Label1>
            <Input1 type="text" placeholder="Type something in here..." />
          </div>

          <div>
            <Label1 className="mb-1">City</Label1>
            <Select1>
              <option>Warsaw</option>
              <option>Berlin</option>
              <option>London</option>
            </Select1>
          </div>

          <div className="flex items-center">
            <Input1 type="checkbox" id="terms" />
            <Label1 className="ml-2" htmlFor="terms">Accept terms</Label1>
          </div>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-lg font-mono">Loading Skeleton</h2>
        <Separator1 />
        <div className="space-y-8">
          <div className="flex space-x-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>

          <div className="space-y-4">
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        </div>
      </div>
    </main>
  )
}
