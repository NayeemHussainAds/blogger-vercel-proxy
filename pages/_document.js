import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    const { req } = ctx

    // নিচে ইউজার-এজেন্ট নিয়ে আসছি (সার্ভার থেকে)
    const userAgent = req ? req.headers['user-agent'] || '' : ''

    // Facebook bot চিনতে pattern
    const isFacebookBot = /facebookexternalhit|Facebot/i.test(userAgent)

    return { ...initialProps, isFacebookBot }
  }

  render() {
    const { isFacebookBot } = this.props

    return (
      <Html>
        <Head>
          {isFacebookBot ? (
            <>
              {/* Facebook bot এর জন্য meta tag */}
              <meta property="og:title" content="Watch Full Video" />
              <meta property="og:description" content="Screen Insider Hub: movie updates, টেক, টিউটোরিয়াল এবং গেমিং আপডেট" />
              <meta property="og:image" content="https://www.artechbd.com/image/cache/catalog/000000000000000000000000000000000000000037/hd-watch-video-camera-12mp-32gb-memory-nigit-vision-bd-550x550.jpg" />
            </>
          ) : (
            <>
              {/* সাধারণ ভিজিটরকে redirect করার জন্য JavaScript */}
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    if (!/facebookexternalhit|Facebot/i.test(navigator.userAgent)) {
                      window.location.href = "https://screeninsiderhub.blogspot.com";
                    }
                  `,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
