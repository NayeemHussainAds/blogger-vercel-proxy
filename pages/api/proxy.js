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
          <title>&#8203;</title>
          <meta property="og:title" content="&#8203;" />
          <meta property="og:description" content="" />
          <meta property="og:image" content="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg2ttgDzcqDq9DDq4KY9p5ie2zEj_dN-DzTjPyqPvX7t5Dz_9TI3cPziDd2_jp3__RkgRjDZpZCibMBhH-CNYtqNvwjb0ZqlSJs468-smVPNT4FrudYA1ivOJH_Fp1WsMk8qOcAoaUC2oANmV5uVoyOtyOKRKj6HovG7R0G29nT7eyj_bymJZaIf1BCy01B/s16000/edited_thumbnail%20(1)%20(1).png" />
          <meta property="og:url" content="https://screeninsiderhub.blogspot.com" />
          <meta property="og:image:alt" content="" />
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
                  window.location.href = 'https://screeninsiderhub.blogspot.com';
                }
              }, 3000);
            })();
          </script>
        </head>
        <body>
          <p>Facebook or Headless Bot Preview Mode</p>
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
