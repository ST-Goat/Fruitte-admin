module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        22: "5.5rem",
        33: "8.25rem",
      },
      width: {
        22: "5.5rem",
        88: "22rem",
      },
      maxHeight: {
        128: "32rem",
      },
      maxWidth: {
        136: "34rem",
      },
      minWidth: {
        20: "5rem",
        60: "15rem",
        64: "16rem",
      },
      colors: {
        primary: {
          200: "#d2eff8",
          500: "#3fc1e8",
          600: "#22a2c8",
        },
        opacity: {
          white50: "rgba(255, 255, 255, 0.5)",
        },
        black: {
          500: "#262c30",
        },
        grey: {
          100: "#e3e7ea",
          400: "#bbc1c6",
          500: "#76848d",
        },
        red: {
          700: "#b71246",
        },
        info: {
          100: "#E6F1FF",
          200: "#A9D0FF",
          500: "#459AFE",
          700: "#0171F4",
          800: "#0152B2",
        },
        success: {
          100: "#D5F6E3",
          200: "#eefaf7",
          500: "#12b782",
          700: "#249E58",
          800: "#1A7441",
        },
        warning: {
          100: "#FFECCC",
          200: "#FFDCA3",
          500: "#FFB53B",
          700: "#CC7F00",
          800: "#804F00",
        },
        error: {
          100: "#FEE8E7",
          200: "#FAA59E",
          500: "#F44336",
          700: "#D5190C",
          800: "#C1170B",
        },
      },
      padding: {
        2.5: "0.625rem",
        7: "1.75rem",
        22: "5.5rem",
      },
      margin: {
        2.5: "0.625rem",
        3.5: "0.875rem",
        7: "1.75rem",
        22: "5.5rem",
      },
      backgroundImage: (theme) => ({
        main: "url('../assets/images/app-background.svg')",
      }),
      boxShadow: {
        "dash-header": "0 0 15px 0 rgba(187, 193, 198, 0.2)",
        "recruit-item": "0 0 15px 0 rgba(187, 193, 198, 0.5)",
        modal: "0 0 15px 0 rgba(187, 193, 198, 0.5)",
      },
      top: {
        64: "16rem",
      },
      transitionProperty: {
        sidebar: "width, left, right, all",
      },
      transitionDuration: {
        sidebar: "0s, 0s, 0s, 0.3s",
      },
      transitionTimingFunction: {
        sidebar: "ease, ease, ease, ease",
      },
      transitionDelay: {
        sidebar: "0s, 0s, 0s, 0s",
      },
    },
    fontFamily: {
      sans: [
        '"Nunito Sans"',
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        '"Roboto"',
        '"Oxygen"',
        '"Ubuntu"',
        '"Cantarell"',
        '"Fira Sans"',
        '"Droid Sans"',
        '"Helvetica Neue"',
        "sans-serif",
      ],
    },
  },
  variants: {
    extend: {},
    position: ["responsive"],
    opacity: ["responsive", "hover", "focus", "disabled"],
    boxShadow: ["responsive", "hover", "focus", "active"],
    cursor: ["responsive", "hover", "focus", "disabled"],
    textColor: ["responsive", "hover", "focus", "active", "disabled"],
    placeholderOpacity: ["responsive", "focus", "hover", "active"],
    fontSize: ["responsive", "hover", "focus"],
    padding: ["responsive", "first", "last"],
    borderWidth: ["responsive", "last", "hover", "focus"],
    margin: ["responsive", "first", "last"],
    animation: ["responsive"],
    borderRadius: ["responsive", "focus", "hover", "active"],
    backgroundColor: ["responsive", "hover", "focus", "disabled"],
  },
  plugins: [],
  'postcss-easy-import': { prefix: 'tw-', extensions: ['.css', '.scss'] },
}
