/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#2E86AB', // Professional blue (primary) - blue-600
        'secondary': '#1B5E7A', // Deeper blue variant (secondary) - blue-800
        'accent': '#F18F01', // Amber for critical alerts (accent) - amber-500
        
        // Background Colors
        'background': '#FAFBFC', // Soft white background - gray-50
        'surface': '#FFFFFF', // Pure white surface - white
        
        // Text Colors
        'text-primary': '#1A1D23', // Near-black primary text - gray-900
        'text-secondary': '#6C757D', // Medium grey secondary text - gray-500
        
        // Status Colors
        'success': '#28A745', // Medical green success - green-600
        'warning': '#FFC107', // Standard warning yellow - yellow-400
        'error': '#DC3545', // Clear red error - red-600
        
        // Border Color
        'border': 'rgba(0, 0, 0, 0.1)', // Border color - gray-200
      },
      fontFamily: {
        'heading': ['Inter', 'sans-serif'], // Headings font
        'body': ['Inter', 'sans-serif'], // Body font
        'caption': ['Inter', 'sans-serif'], // Caption font
        'data': ['JetBrains Mono', 'monospace'], // Data/monospace font
      },
      fontWeight: {
        'normal': '400',
        'medium': '500',
        'semibold': '600',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'modal': '0 4px 12px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '6px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
      },
      transitionDuration: {
        '200': '200ms',
      },
      transitionTimingFunction: {
        'smooth': 'ease-in-out',
      },
      zIndex: {
        'navigation': '1000',
        'alert': '1100',
        'dropdown': '1200',
      }
    },
  },
  plugins: [],
}