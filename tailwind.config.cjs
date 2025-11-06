module.exports = {
    content: [
        './components/**/*.{js,vue,ts}',
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './app.vue',
        './error.vue',
    ],
    theme: {
        extend: {
            fontFamily: {
                // use font family here. Default is for the main font of the site, secondary usually for headings or other featured elements
                default: 'PPNeue, sans-serif',
                book: 'PPNeue Book',
                pkiko: 'PKiko, sans-serif'
                // secondary: ['ABCDiatype', 'sans-serif'],
            },
            spacing: {
                'SP10' : '60px'
            }
        },
        container: {
            center: true,      
            // default breakpoints but with 40px removed
            screens: {
              md: '640px',
            },
        },
        colors: {
            white: '#ffffff',
            black: '#000000',
            blue: '#3CADFF',
            gray: '#B3B3B3',
            green: '#36E452',
            lila: '#BACEFB',
            g1: '#F7F7F7',
            g2: '#E5E5E5',
            g3: '#CCCCCC',
            g4: '#9E9E9E',
        },

        fontSize: {
            base: ['100%', 'normal'],
            DO2: [ '150px', {
                lineHeight: 0.947,
                letterSpacing: '-2.5%',
            }],
            TK02: [ '116px', {
                lineHeight: 1.0,
                letterSpacing: '-1.2%',
            }],
            TK03: [ '80px', {
                lineHeight: 1.05,
                letterSpacing: '-1.5%',
            }],
            TK04: [ '64px', {
                lineHeight: 1.1,
                letterSpacing: '-1.2%',
            }],
            T03: [ '44px', {
                lineHeight: 1.1,
                letterSpacing: '-0.4%',
            }],
            T04: [ '36px', {
                lineHeight: 1.15,
                letterSpacing: '0',
            }],
            T05: [ '22px', {
                lineHeight: 1.15,
                letterSpacing: '0',
            }],
            T06: [ '26px', {
                lineHeight: 1.15,
                letterSpacing: '0',
            }],
            BO2: [ '27px', {
                lineHeight: 1.19,
                letterSpacing: '0.2%',
            }],
            BO3: [ '20px', {
                lineHeight: 1.35,
                letterSpacing: '0.2%',
            }],
            BO4: [ '16px', {
                lineHeight: 1.4,
                letterSpacing: '0.4%',
            }],
            LM02: [ '12px', {
                lineHeight: 1.4,
                letterSpacing: '0',
            }],
            L02: [ '13px', {
                lineHeight: 1.35,
                letterSpacing: '0.5%',
            }]
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
}
