import Layout from "../components/layout/Layout"
import { MoralisProvider } from 'react-moralis'

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider initializeOnMount={false} >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MoralisProvider>
  )
}

export default MyApp
