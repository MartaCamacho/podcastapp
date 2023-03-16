import Head from 'next/head';
import Navbar from './Navbar';

function Layout({children}) {
  return (
    <div className="layout" id="root">
        <Head>
          <title>Podcaster</title>
          <meta name="description" content="Your top poscast app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Navbar />
        <main className="section-content-wrapper">{children}</main>
    </div>
  )
}

export default Layout