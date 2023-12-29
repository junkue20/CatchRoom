import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
    colors: {
      primary: '#0F4C81',
      secondary: '#FFAA00',
      tertiary: '#173F5F',
      quaternary: '#20639B',
      quinary: '#ED553B',
      senary: '#3CAEA3',
      white: '#fff',
      black: '#000',
      grey: '#717680',
      borderSub: '#DBDEE3',
      surfaceGrey: '#EFF1F4',
      textSub: '#717680',
      semanticBg: '#F8F9FB',
      disabledGrey: '#9F9F9F',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
