export const components = {
  pre: ({ children, className }) => {
    const lang = className?.replace('language-', '');
    return `<pre class="${className}">${children}</pre>`;
  },
};