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
          default: "#4C9C2E"
        },
        secondary1: {
          default: "#483729"
        },
        secondary2: {
          default: "#003057"
        },
        opacity: {
          white50: "rgba(255, 255, 255, 0.5)",
        },
        black: {
          500: "#262c30",
        },
        grey: {
          100: "#E0E0E0",
          300: "#BDBDBD",
          500: "#4F4F4F",
          700: "#333333",
          default: "#828282"
        },
        red: {
          100: "#FD7474",
          700: "#b71246",
        },
        green: {
          500: "#6FEE64",
          700: "#43822C"
        },
        blue: {
          300: "#4370C8",
          500: "#2F80ED",
        },
        black: {
          500: '#282828',
          700: '#1D1D1D',
          default: "#000000"
        },
        white: {
          default: "#FFFFFF"
        },
        info: {
          default: "#2F80ED"
        },
        success: {
          default: "#4C9C2E"
        },
        warning: {
          default: "#E2B93B"
        },
        error: {
          default: "#EB5757"
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
    extend: {
      borderColor: ['disabled'],
      borderWidth: ['disabled'],
      cursor: ['disabled'],
      transform: ['hover', 'focus', 'active'],
      scale: ['hover', 'focus', 'active'],
    },
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
