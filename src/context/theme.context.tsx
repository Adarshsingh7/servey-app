import { createContext, useContext, useState } from 'react';

interface ThemeContextType {
	color: string;
	font: string;
	setColor: (color: ColorTheme) => void;
	setFont: (font: FontTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const colorStyles: Record<ColorTheme, string> = {
	blue: 'border-blue-300 text-blue-400',
	purple: 'border-purple-300 text-purple-400',
	green: 'border-green-300 text-green-400',
	orange: 'border-orange-300 text-orange-400',
	red: 'border-red-300 text-red-400',
	pink: 'border-pink-300 text-pink-400',
};

const fontStyles: Record<FontTheme, string> = {
	classic: 'font-serif',
	modern: 'font-sans',
	playful: 'font-mono',
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const [color, setColor] = useState<ColorTheme>('blue');
	const [font, setFont] = useState<FontTheme>('modern');

	const panelClass = `
    border rounded-xl p-6 shadow-sm
    ${colorStyles[color]}
    ${fontStyles[font]}
  `;

	return (
		<ThemeContext.Provider
			value={{
				color: colorStyles[color],
				font: fontStyles[font],
				setColor,
				setFont,
			}}
		>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => {
	const ctx = useContext(ThemeContext);
	if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
	return ctx;
};
