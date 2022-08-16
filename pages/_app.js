import Layout from "../components/layout/Layout"
import { MoralisProvider } from 'react-moralis'


function MyApp({ Component, pageProps }) {
  return (
    // <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
    <MoralisProvider initializeOnMount={false} >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MoralisProvider>
  )
}

export default MyApp
