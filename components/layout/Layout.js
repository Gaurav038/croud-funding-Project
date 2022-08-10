import Header from "./Header";
import themes from "./themes";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import { useState, createContext } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const App = createContext();


export default function Layout({children}) {

    const [theme, setTheme] = useState('light')

    const changeTheme = () => {
        setTheme(theme == "light" ? "dark" : "light")
    }

  return (
    <App.Provider value={{ changeTheme, theme }}>
        <ThemeProvider theme={themes[theme]} >
            <ToastContainer />
            <LayoutWrapper>
                <GlobalStyle />
                <Header />
                {children}
            </LayoutWrapper>
        </ThemeProvider>  
    </App.Provider>
  )
}

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
  }
`

const LayoutWrapper = styled.div`
    background-color: ${(props) => props.theme.bgColor};
    background-image: ${(props) => props.theme.bgImage};
    color: ${(props) => props.theme.color};
    min-height: 100vh ;
`
