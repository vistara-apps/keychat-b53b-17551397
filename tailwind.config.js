
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(240 85% 53%)',
        accent: 'hsl(13 90% 50%)',
        secondary: 'hsl(0 0% 45%)',
        bg: 'hsl(240 10% 97%)',
        surface: 'hsl(0 0% 100%)',
        border: 'hsl(240 4% 90%)',
        input: 'hsl(240 4% 90%)',
        destructive: 'hsl(0 84% 60%)',
        ring: 'hsl(240 85% 53%)',
        text: 'hsl(240 10% 3.9%)',
        muted: 'hsl(240 4% 46%)',
      },
      spacing: {
        xs: '4px',
        sm: '8px', 
        md: '12px',
        lg: '16px',
        xl: '24px',
        xxl: '32px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px', 
        lg: '16px',
        xl: '24px',
      },
      boxShadow: {
        card: '0 8px 24px hsla(240, 6%, 12%, 0.12)',
        overlay: '0 4px 24px hsla(240, 6%, 12%, 0.16)',
      },
      animation: {
        'fade-in': 'fadeIn 0.25s cubic-bezier(0.22,1,0.36,1)',
        'slide-up': 'slideUp 0.25s cubic-bezier(0.22,1,0.36,1)',
      },
      fontSize: {
        'display': ['2.25rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        'h1': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '700' }],
        'h2': ['1.5rem', { lineHeight: '2rem', fontWeight: '700' }],
        'h3': ['1.25rem', { lineHeight: '1.75rem', fontWeight: '700' }],
        'body': ['1rem', { lineHeight: '1.75rem', fontWeight: '400' }],
        'small': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '500' }],
      },
      maxWidth: {
        'screen-lg': '1024px',
      },
    },
  },
  plugins: [],
}
