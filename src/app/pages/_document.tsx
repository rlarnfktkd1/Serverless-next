import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  public static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  public render() {
    return (
      <Html>
        <Head>
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="/static/favicon.ico"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/pwa.png" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
        <body>
          <Main />
          <NextScript />
          <script src="/__/firebase/7.10.0/firebase-app.js" />
          <script src="/__/firebase/7.10.0/firebase-analytics.js" />
          <script src="/__/firebase/init.js" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
