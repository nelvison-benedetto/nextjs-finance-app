import Label1 from "@/shared/components/atoms/Label1";
import Select1 from "@/shared/components/atoms/Select1";

export default function TransactionForm() {
    return (
        <>
            <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label1 className="mb-1">Type</Label1>
                        <Select1>
                            <option>Income</option>
                            <option>Expense</option>
                        </Select1>
                    </div>

                    <div></div>
                </div>
            </form>
        </>
    );
}