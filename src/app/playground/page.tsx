import AppHeader from "@/shared/components/layout/AppHeader";
import Trend from "@/shared/components/organisms/Trend";

export default function Page(){
    return (
        <>
            <div className="space-y-8">
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
                        <Trend type="Expense" amount={1200} prevAmount={1300} />
                        <Trend type="Investment" amount={7000} prevAmount={11000} />
                        <Trend type="Saving" amount={5000} prevAmount={900} />
                    </div>
                </div>

            </div>
        </>
    );
}