import { extendTheme } from '@chakra-ui/react';
import '@fontsource/share-tech-mono';
import '@fontsource/m-plus-1p/700.css'; 
import '@fontsource/rubik-mono-one'; 
import '@fontsource/moul'; 

const theme = extendTheme({
  fonts: {
    mono: "'Share Tech Mono', sans-serif",
    mplus: "'M PLUS 1p', sans-serif",
    rubikMono: "'Rubik Mono One', sans-serif",
    moul: "'Moul', sans-serif",
    rubikOne: "'Rubik One', sans-serif",
  },
  colors: {
    blueBg: "#0A142F",
    darkBg: "#001233",
    redWord: "#FF595A",
    beigeWord: "#CAC0B3",
    whiteColour: "#FFFFFF",
  },
});

export default theme;
