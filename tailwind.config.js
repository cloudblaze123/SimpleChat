/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: 'selector',
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  // daisyUI config (optional - here are the default values)
  // 目前仅使用无样式的（骨架）版本的 daisyUI （不应用 daisyUI 的默认样式）
  daisyui: {  
    // 将 themes 设为 [] 从而避免引入 daysiUI 主题
    // （不用 false 是因为使用 false 时依然会引入 daisyUI 的 light 和 dark 主题，会导致夜间主题下应用的字体颜色发生变化）
    themes:[], // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
    base: false, // applies background color and foreground color for root element by default
    styled: false, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
  },
}

