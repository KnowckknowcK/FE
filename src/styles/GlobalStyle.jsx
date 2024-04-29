import { createGlobalStyle } from "styled-components";

// fontSize 정의
const fontSizeXl = '1.5rem'; // 24px
const fontSizeLg = '1.25rem'; // 20px
const fontSizeMd = '1rem'; // 16px
const fontSizeSm = '0.875rem'; // 14px
const fontSizeXs = '0.75rem'; // 12px

//color 정의
const colorRevolver = '#1F1632';
const colorPortGore = '#271C3E';
const colorMartinique = '#2A2545';
const colorMartiniNavy = '#2D294A';
const colorSelectiveYellow = '#FBBC05';
const colorWhite = '#FFFFFF';
const colorFrenchGray = '#BDBBC2';
const colorDoveGray = '#636363';
const colorCornflowerBlue = '#4285F4';


const GlobalStyle = createGlobalStyle`
    h2 {
        font-size: ${fontSizeXl};
        font-weight: bold;
        color: ${colorRevolver};
    }
`;


export default GlobalStyle;