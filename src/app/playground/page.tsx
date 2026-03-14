export default function Page(){
    return (
        <>
            <div className="space-y-8">
                <h1 className="text-4xl mt-8">Playground</h1>
                <div>
                    <h2 className="mb-4 text-lg font-mono">Component Name</h2>
                    <hr className="mb-4 border-gray-200 dark:border-gray-800" />
                    <div>Here goes the actual component</div>
                </div>
            </div>
        </>
    );
}