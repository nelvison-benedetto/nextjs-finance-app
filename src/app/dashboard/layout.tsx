import AppHeader from "@/shared/components/layout/AppHeader";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <AppHeader className="mt-8"/>
            <main>
                {children}
            </main>
            <footer>Footer</footer>
        </>
    );
}