import Link from "next/link";
import ToggleDarkMode from "@/shared/components/molecules/ToggleDarkMode";
import { getServerTheme } from "@/shared/hooks/useServerDarkMode";

export default async function AppHeader({className}: Readonly<{className?: string}>) {

    const theme = await getServerTheme();

    return (
        <>
            <header className={`flex justify-between items-center ${className ?? ''}`}>
                <Link href="/dashboard" className="text-xl hover:underline underline-offset-8 decoration-2">Finance App</Link>
                <div className="flex items-center space-x-4">
                    <ToggleDarkMode defaultMode={theme} />
                    <div>User Dropdown</div>
                </div>
            </header>
        </>
    );
}
