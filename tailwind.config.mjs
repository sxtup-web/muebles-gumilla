/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#fcf9f7',
        'on-background': '#1b1c1b',
        surface: '#fcf9f7',
        'surface-dim': '#dcd9d8',
        'surface-bright': '#fcf9f7',
        'surface-container-lowest': '#ffffff',
        'surface-container-low': '#f6f3f1',
        'surface-container': '#f0edeb',
        'surface-container-high': '#eae8e6',
        'surface-container-highest': '#e4e2e0',
        'on-surface': '#1b1c1b',
        'on-surface-variant': '#444843',
        'inverse-surface': '#30302f',
        'inverse-on-surface': '#f3f0ee',
        outline: '#747873',
        'outline-variant': '#c4c8c1',
        primary: '#182119', // forest green tone
        'on-primary': '#ffffff',
        'primary-container': '#2d362e',
        'on-primary-container': '#959f94',
        secondary: '#625e57',
        'on-secondary': '#ffffff',
        'secondary-container': '#e6ded6',
        'on-secondary-container': '#67625b',
        'cream-bg': '#F9F7F2',
        'paper-surface': '#F1EDE4',
        'wood-accent': '#8C7355',
        graphite: '#333333'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      spacing: {
        'margin-desktop': '64px',
        'margin-mobile': '24px',
        'gutter': '24px',
        'section-gap': '120px',
        'component-padding': '16px',
      },
      borderRadius: {
        'sm': '0.125rem',
        DEFAULT: '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
      }
    },
  },
  plugins: [],
}
