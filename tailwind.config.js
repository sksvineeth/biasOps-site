module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg: '#08090C',
        surface: '#0F1114',
        'surface-raised': '#16181D',
        silver: '#C4CCD8',
        'silver-light': '#E0E5EC',
        'silver-mid': '#8A95A8',
        'silver-dark': '#4A5568',
        'text-secondary': '#B0B8C9',
        'text-muted': '#6C7690',
        'text-dim': '#3E4559',
        border: '#1F2330',
        'border-light': '#2A2E3D',
      },
      animation: {
        'shimmer': 'shimmer 4s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'grid-pulse': 'gridPulse 8s ease-in-out infinite',
        'fade-in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        gridPulse: {
          '0%, 100%': { opacity: '0.035' },
          '50%': { opacity: '0.06' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
