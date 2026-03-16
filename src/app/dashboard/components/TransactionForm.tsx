import Button1 from "@/shared/components/atoms/Button1";
import Input1 from "@/shared/components/atoms/Input1";
import Label1 from "@/shared/components/atoms/Label1";
import Select1 from "@/shared/components/atoms/Select1";
import { categories, types } from "@/shared/utils/consts";

export default function TransactionForm() {
    return (
        <>
            <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <Label1 className="mb-1">Type</Label1>
                        <Select1>
                            {types.map(type => <option key={type}>{type}</option>)}
                        </Select1>
                    </div>

                    <div>
                        <Label1 className="mb-1">Category</Label1>
                        <Select1>
                            {categories.map(category => <option key={category}>{category}</option>)}
                        </Select1>
                    </div>

                    <div>
                        <Label1 className="mb-1">Transaction Date</Label1>
                        <Input1 />
                    </div>

                    <div>
                        <Label1 className="mb-1">Amount</Label1>
                        <Input1 type="number"/>
                    </div>

                    <div className="col-span-2">
                        <Label1 className="mb-1">Description</Label1>
                        <Input1 type="number"/>
                    </div>

                </div>

                <div className="flex justify-end">
                    <Button1 type="submit">Submit</Button1>
                </div>

            </form>
        </>
    );
}