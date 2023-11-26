import { Global } from '@emotion/react'

const Fonts = () => (
    <Global
        styles={`                
            @font-face {
                font-family: 'GT-Eesti-Bold';
                src: url('./assets/font/GT-Eesti-Display-Bold-Trial.otf');
            }

            @font-face {
                font-family: 'GT-Eesti';
                src: url('./assets/font/GT-Eesti-Display-Regular-Trial.otf');
            }
            
            @font-face {
                font-family: 'GT-Eesti-Light';
                src: url('./assets/font/GT-Eesti-Display-Light-Trial.otf');
            }
            
            @font-face {
                font-family: 'GT-Eesti-Medium';
                src: url('./assets/font/GT-Eesti-Display-Medium-Trial.otf');
            }
            
            @font-face {
                font-family: 'GT-Eesti-thin';
                src: url('./assets/font/GT-Eesti-Display-Thin-Trial.otf');
            }
      `}
    />
)

export default Fonts