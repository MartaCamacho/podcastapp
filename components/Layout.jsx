import Head from 'next/head';
import Navbar from './Navbar';
import { globalStyles } from '../styles/globals';

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
        <style jsx global>{globalStyles}</style>
    </div>
  )
}

export default Layout