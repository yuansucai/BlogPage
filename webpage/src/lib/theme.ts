import { createTheme } from "@mui/material/styles";

const warmTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#D97706", // amber-600
    },
    secondary: {
      main: "#F97316", // orange-500
    },
    background: {
      default: "#FFFBF5",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2D2A26",
      secondary: "#6B6560",
    },
    divider: "#E8E2DA",
  },
  typography: {
    fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.15)",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(0, 0, 0, 0.3)",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#D97706",
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "rgba(0, 0, 0, 0.6)",
          "&.Mui-focused": {
            color: "#D97706",
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: {
          color: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  },
});

export default warmTheme;
