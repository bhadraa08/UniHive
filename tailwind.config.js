/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Theme variables from index.css
        canvas: 'var(--canvas)',
        sidebarBg: 'var(--sidebar-bg)',
        surface: {
          DEFAULT: 'var(--surface)',
          elevated: 'var(--surface-elevated)',
          subtle: 'var(--surface-subtle)',
        },
        content: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        borderSubtle: 'var(--border)',
        borderStrong: 'var(--border-strong)',

        // Dreamy Editorial Reference Tokens
        accent: {
          DEFAULT: '#9674B8',
          dark: '#B69ADB',
          soft: 'rgba(150, 116, 184, 0.14)'
        },
        peach: {
          DEFAULT: '#E9A68E',
          dark: '#E8A18C',
          soft: 'rgba(233, 166, 142, 0.16)'
        },
        lavender: {
          DEFAULT: '#9674B8',
          dark: '#B69ADB',
          soft: 'rgba(150, 116, 184, 0.14)'
        },
        sage: {
          DEFAULT: '#9AB296',
          dark: '#A2BA9D',
          soft: 'rgba(154, 178, 150, 0.16)'
        },
        plum: {
          DEFAULT: '#302631',
          dark: '#21192B',
          surface: '#251D30',
          elevated: '#30253C',
          border: '#45364F'
        },
        terracotta: {
          DEFAULT: '#E9A68E',
          dark: '#E8A18C'
        },
        parchment: {
          DEFAULT: '#F7F1E8',
          light: '#FFF9F2',
          subtle: '#F3EAE0'
        },
        success: {
          DEFAULT: '#9AB296',
          light: '#EAF3EB',
          dark: '#6E9977'
        },
        error: {
          DEFAULT: '#C87878',
          light: '#F9EBEB',
          dark: '#A65A5A'
        }
      },
      fontFamily: {
        sans: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"DM Serif Display"', 'Lora', 'Georgia', 'serif'],
        display: ['"DM Serif Display"', 'Lora', 'Georgia', 'serif']
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(48, 37, 53, 0.04), 0 1px 2px rgba(48, 37, 53, 0.03)',
        'card': '0 4px 16px -2px rgba(48, 37, 53, 0.06), 0 2px 6px -1px rgba(48, 37, 53, 0.03)',
        'float': '0 14px 36px -4px rgba(48, 37, 53, 0.12), 0 6px 14px -2px rgba(48, 37, 53, 0.05)'
      }
    },
  },
  plugins: [],
}
