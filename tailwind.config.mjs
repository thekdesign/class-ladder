export default {
    content: ['./resources/**/*.{vue,html}'],

    theme: {
        extend: {
            colors: {
                // 深藍墨：主背景與層板，由深到淺
                ink: {
                    50: '#EEF1F8', 100: '#D7DDEC', 200: '#AEB8D4', 300: '#808DB6',
                    400: '#56638F', 500: '#3A456B', 600: '#28304F', 700: '#1B2238',
                    800: '#121829', 900: '#0C1120', 950: '#070A14',
                },
                // 青色：主強調（CTA、進度、選中態）— 像儀表板的 highlight
                teal: {
                    50: '#E8FCFB', 100: '#C4F6F2', 200: '#8FEBE6', 300: '#4FDAD6',
                    400: '#24C2CE', 500: '#11A1B0', 600: '#0B7E8E', 700: '#0E6271',
                    800: '#114E5C', 900: '#123E4A', 950: '#04252E',
                },
                // 暖灰藍：副文字、邊框、分隔線（在深底上不刺眼）
                steel: {
                    50: '#F4F6FA', 100: '#E5E9F1', 200: '#C9D0E0', 300: '#A3AECA',
                    400: '#7986A8', 500: '#5A6788', 600: '#46506B', 700: '#373E54',
                    800: '#262B3B', 900: '#181C28',
                },
            },
            fontFamily: {
                sans: ['"Noto Sans TC"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
                display: ['"Noto Sans TC"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
                mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', '"SF Mono"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
            },
            boxShadow: {
                panel: '0 8px 40px rgba(4, 8, 20, 0.45)',
                glow: '0 0 0 1px rgba(36, 194, 206, 0.35), 0 8px 32px rgba(17, 161, 176, 0.18)',
                ring: '0 0 0 4px rgba(36, 194, 206, 0.18)',
            },
            borderRadius: {
                xl2: '20px',
            },
            keyframes: {
                'fade-up': {
                    '0%': {opacity: '0', transform: 'translateY(10px)'},
                    '100%': {opacity: '1', transform: 'translateY(0)'},
                },
                'bar-grow': {
                    '0%': {transform: 'scaleX(0)'},
                    '100%': {transform: 'scaleX(1)'},
                },
                'pulse-dot': {
                    '0%, 100%': {opacity: '1'},
                    '50%': {opacity: '0.35'},
                },
            },
            animation: {
                'fade-up': 'fade-up 420ms cubic-bezier(0.22, 1, 0.36, 1) both',
                'bar-grow': 'bar-grow 700ms cubic-bezier(0.22, 1, 0.36, 1) both',
                'pulse-dot': 'pulse-dot 1.8s ease-in-out infinite',
            },
        },
    },

    corePlugins: {
        preflight: false,
    },
};
