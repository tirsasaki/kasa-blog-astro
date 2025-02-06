/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
      extend: {
        typography: {
          DEFAULT: {
            css: {
              maxWidth: '65ch',
              color: 'var(--color-text-primary)',
              a: {
                color: 'var(--tw-prose-links)',
                '&:hover': {
                  color: 'var(--tw-prose-links-hover)',
                },
              },
            },
          },
          invert: {
            css: {
              color: 'var(--color-text-primary)',
              a: {
                color: 'var(--tw-prose-invert-links)',
                '&:hover': {
                  color: 'var(--tw-prose-invert-links-hover)',
                },
              },
            },
          },
        },
      },
    },
    plugins: [
      require('@tailwindcss/typography'),
    ],
  }