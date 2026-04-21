/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ADD8E6",
        slateText: "#334155",
      },

      animation: {
        float: "float 6s ease-in-out infinite",
        float2: "float 7s ease-in-out infinite",
        float3: "float 8s ease-in-out infinite",
        float4: "float 9s ease-in-out infinite",
        float5: "float 10s ease-in-out infinite",
        float6: "float 11s ease-in-out infinite",
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
    },
  },
  plugins: [],
}