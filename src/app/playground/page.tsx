import Button1 from "@/shared/components/atoms/Button1";
import Label1 from "@/shared/components/atoms/Label1";
import AppHeader from "@/shared/components/layout/AppHeader";
import Transaction from "@/shared/components/organisms/Transaction";
import TransactionSummary from "@/shared/components/organisms/TransactionSummary";
import Trend from "@/shared/components/organisms/Trend";
import Select1 from "@/shared/components/atoms/Select1";
import Input1 from "@/shared/components/atoms/Input1";

export default function Page(){
    return (
        <>
            <div className="space-y-8 mb-44">
                <h1 className="text-4xl mt-8">Playground</h1>

                <div>
                    <h2 className="mb-4 text-lg font-mono">App Header</h2>
                    <hr className="mb-4 border-gray-200 dark:border-gray-800" />
                    <div>
                        <AppHeader />
                    </div>
                </div>

                <div>
                    <h2 className="mb-4 text-lg font-mono">Trend</h2>
                    <hr className="mb-4 border-gray-200 dark:border-gray-800" />
                    <div className="flex space-x-8">
                        <Trend type="Income" amount={1000} prevAmount={900} />
                        <Trend type="Expenses" amount={1200} prevAmount={1300} />
                        <Trend type="Investment" amount={7000} prevAmount={11000} />
                        <Trend type="Saving" amount={5000} prevAmount={900} />
                    </div>
                </div>

                <div>
                    <h2 className="mb-4 text-lg font-mono">Transaction</h2>
                    <hr className="mb-4 border-gray-200 dark:border-gray-800" />
                    <div className="space-y-4">
                        <Transaction type="Income" description="Salary" amount={1000} />
                        <Transaction type="Expenses" category="Food" description="Going out to eat" amount={29} />
                        <Transaction type="Saving" description="For children" amount={500} />
                        <Transaction type="Investment" description="In Nvidia" amount={9000} />
                    </div>
                </div>

                <div>
                    <h2 className="mb-4 text-lg font-mono">Transaction Summary</h2>
                    <hr className="mb-4 border-gray-200 dark:border-gray-800" />
                    <div className="space-y-4">
                        <TransactionSummary date="2026-03-20" amount={1000} />
                        <Transaction type="Income" description="Salary" amount={1000} />
                        <hr className="mb-4 border-gray-200 dark:border-gray-800" />
                        <Transaction type="Expenses" category="Food" description="Going out to eat" amount={29} />
                        <Transaction type="Saving" description="For children" amount={500} />
                        <Transaction type="Investment" description="In Nvidia" amount={9000} />
                    </div>
                </div>

                <div>
                    <h2 className="mb-4 text-lg font-mono">Buttons</h2>
                    <hr className="mb-4 border-gray-200 dark:border-gray-800" />
                    <div className="space-y-4">
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
                    <hr className="mb-4 border-gray-200 dark:border-gray-800" />
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <Label1>Name</Label1>
                            <input type="text" placeholder="Type something in here..." className="w-full rounded-md shadow-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950" />
                            <Input1 type="text" placeholder="Type something in here..."></Input1>
                        </div>

                        <div>
                            <Label1>City</Label1>
                            <Select1>
                                <option value="">Warsaw</option>
                                <option value="">Madrid</option>
                                <option value="">London</option>
                            </Select1>
                        </div>

                        <div className="flex items-center">
                            <input type="checkbox" className="rounded border-gray-300 text-gray-700 bg-white dark:bg-gray-950 dark:text-gray-500 shadow-sm" id="terms" />
                            <Label1 className="ml-2" htmlFor="terms">Accept Terms</Label1>
                        </div>

                    </div>
                </div>

            </div>
        </>
    );
}