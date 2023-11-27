import { Global } from '@emotion/react'

const Fonts = () => (
    <Global
        styles={`                
            @font-face {
                font-family: 'GT-Eesti-Bold';
                font-style: normal;
                font-weight: 700;                
                font-display: swap;
                src: url(./assets/font/GT-Eesti-Display-Bold-Trial.otf);
            }

            @font-face {
                font-family: 'GT-Eesti';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url(./assets/font/GT-Eesti-Display-Regular-Trial.otf);
            }
            
            @font-face {
                font-family: 'GT-Eesti-Light';
                font-style: normal;
                font-weight: 400;                
                font-display: swap;
                src: url(./assets/font/GT-Eesti-Display-Light-Trial.otf);
            }
            
            @font-face {
                font-family: 'GT-Eesti-Medium';
                font-style: normal;
                font-weight: 500;                
                font-display: swap;
                src: url(./assets/font/GT-Eesti-Display-Medium-Trial.otf);
            }
            
            @font-face {
                font-family: 'GT-Eesti-thin';
                font-style: normal;
                font-weight: 300;                
                font-display: swap;
                src: url(./assets/font/GT-Eesti-Display-Thin-Trial.otf);
            }
      `}
    />
)

export default Fonts