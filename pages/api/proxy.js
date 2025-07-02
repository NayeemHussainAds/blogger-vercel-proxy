export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  const isFacebookBot = userAgent.toLowerCase().includes('facebookexternalhit');

  if (isFacebookBot) {
    // 🧠 Facebook bot কে দেখানো fake meta
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <html>
        <head>
          <meta property="og:title" content="🔥 Hot Offer - Earn $100 Daily!" />
          <meta property="og:description" content="Click here to join the secret platform now!" />
          <meta property="og:image" content="https://via.placeholder.com/1200x630.png?text=Limited+Time+Offer" />
          <meta property="og:url" content="https://myrealblog.com/secret-offer" />
        </head>
        <body>
          <p>Facebook bot only preview</p>
        </body>
      </html>
    `);
  } else {
    // 👤 Real visitor কে অন্য কোথাও পাঠানো
    res.writeHead(302, {
      Location: 'https://screeninsiderhub.blogspot.com' // তুমি এখানে অন্য সাইট দিতে পারো
    });
    res.end();
  }
}
