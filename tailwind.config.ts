import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        search: "url('/assets/bg-search.jpg')",
        advertise: "url('/assets/bg-advertise.jpg')",
        footer: "url('../assets/Purple-Roof-Footer.png')",
        mortgage: "url('../assets/bg-mortgage.jpg')",
        signin:
          "url('https://rebuilt-purpleroof.synthecityhybridsystem.com/wp-content/uploads/2023/10/About-Purple-Roof.jpg')"
      }
    }
  },
  plugins: []
}
export default config
