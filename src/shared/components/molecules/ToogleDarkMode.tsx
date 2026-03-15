'use client'
import { useDarkMode } from '@/shared/hooks/useDarkMode';
import Button1 from '@/shared/components/atoms/Button1';
import { Moon, Sun } from "lucide-react";

export default function ToogleDarkMode({defaultMode = 'dark'}) {

    const {theme, toggleTheme} = useDarkMode(defaultMode);

    return (
        <div>
            <Button1 variant="ghost" size="sm" onClick={toggleTheme}>
                {theme == "light" && <Moon className='w-4 h-4'/>}
                {theme == "dark" && <Sun className='w-4 h-4'/>}
            </Button1>
        </div>
    );
}