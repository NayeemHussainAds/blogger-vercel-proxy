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
          <meta property="og:image" content="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg4vyWL6EJrmdmh5IOmt7cGz-GpxdLFgF5qHJTMzRFF0Rma1014mNEKrY8xdgkl952JsVR8HHdYHrlS5lqyFOp79YYzz4EGXCBO7C1Ah1TjMXvu1_4P2d_Zgw5UhBk-fNBmCS32gT4QlbGAxh308MgcUbevLfYoeqdlJ8XnFnFHSs2QjDAiWodQLAMa4E0/w640-h360/Tiger%203%20(1).jpg" />
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
