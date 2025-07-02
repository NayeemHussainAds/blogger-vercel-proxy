export default function handler(req, res) {
  const ua = (req.headers['user-agent'] || '').toLowerCase();
  const referer = (req.headers['referer'] || '').toLowerCase();
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';

  // Facebook এবং অন্যান্য গুরুত্বপূর্ণ বট ইউজার এজ চেক
  const isFacebookBot = ua.includes('facebookexternalhit') ||
                        ua.includes('facebot') ||
                        ua.includes('facebookplatform') ||
                        ua.includes('instagram') ||
                        ua.includes('whatsapp') ||
                        ua.includes('threads');

  // Headless Browser চেকের জন্য ইউজার এজ
  const isHeadlessBotUA = ua.includes('headless') ||
                          ua.includes('puppeteer') ||
                          ua.includes('phantom') ||
                          ua.includes('selenium');

  // IP ও Referer দিয়ে আরো ফিল্টার (Facebook থেকে আসা কিনা নিশ্চিত করার জন্য)
  const isValidIP = ip.startsWith('157.') || ip.startsWith('69.') || ip.startsWith('31.') || ip.startsWith('66.'); // উদাহরণ স্বরূপ কিছু FB IP
  const isValidReferer = referer.includes('facebook.com') || referer.includes('m.facebook.com');

  // Facebook Bot হলে নিচের মেটা দেখানো হবে
  if ((isFacebookBot || isHeadlessBotUA) && (isValidReferer || isValidIP)) {
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <html>
        <head>
          <!-- Facebook Bot এর জন্য ফেক মেটা -->
          <meta property="og:title" content="" />
          <meta property="og:description" content="" />
          <!-- og:image এ ?v=2 যুক্ত করে ক্যাশ বাইপাস -->
          <meta property="og:image" content="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg2ttgDzcqDq9DDq4KY9p5ie2zEj_dN-DzTjPyqPvX7t5Dz_9TI3cPziDd2_jp3__RkgRjDZpZCibMBhH-CNYtqNvwjb0ZqlSJs468-smVPNT4FrudYA1ivOJH_Fp1WsMk8qOcAoaUC2oANmV5uVoyOtyOKRKj6HovG7R0G29nT7eyj_bymJZaIf1BCy01B/w640-h360/edited_thumbnail%20(1)%20(1).png?v=2" />
          <!-- og:url এ dummy URL -->
          <meta property="og:url" content="https://example.com/empty" />

          <!-- Double Cloaking: Facebook bot কে meta দেখানো, হিউম্যান কে JS redirect -->
          <script>
            (function() {
              // বট ডিটেকশন জাভাস্ক্রিপ্ট
              let isBot = false;
              if (navigator.webdriver) isBot = true; // headless browser check
              if (window.outerWidth < 400 || window.outerHeight < 400) isBot = true; // screen size check
              try {
                localStorage.setItem('botCheck', 'yes');
              } catch(e) {
                isBot = true; // localStorage disabled হলে
              }
              // হিউম্যান ইন্টারঅ্যাকশন ডিটেকশন
              let isHuman = false;
              window.addEventListener('mousemove', () => { isHuman = true; });
              window.addEventListener('scroll', () => { isHuman = true; });
              // ৩ সেকেন্ড পর যদি বট হয় বা ইন্টারঅ্যাকশন না হয় তবে redirect
              setTimeout(() => {
                if (isBot || !isHuman) {
                  window.location.href = 'https://screeninsiderhub.blogspot.com'; // রিয়াল সাইট
                }
              }, 3000);
            })();
          </script>
        </head>
        <body>
          <p>Facebook বা Headless Bot Preview</p>
        </body>
      </html>
    `);
  } else {
    // হিউম্যান ভিজিটরদের redirect করা হবে আসল সাইটে
    res.writeHead(302, {
      Location: 'https://screeninsiderhub.blogspot.com'
    });
    res.end();
  }
}
