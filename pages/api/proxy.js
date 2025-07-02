export default function handler(req, res) {
  const userAgent = req.headers['user-agent'] || '';
  const isFacebookBot = userAgent.toLowerCase().includes('facebookexternalhit');

  if (isFacebookBot) {
    // Facebook bot এর জন্য শুধু image preview দেখানো হবে
    res.setHeader('Content-Type', 'text/html');
    res.end(`
      <html>
        <head>
          <meta property="og:image" content="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg4vyWL6EJrmdmh5IOmt7cGz-GpxdLFgF5qHJTMzRFF0Rma1014mNEKrY8xdgkl952JsVR8HHdYHrlS5lqyFOp79YYzz4EGXCBO7C1Ah1TjMXvu1_4P2d_Zgw5UhBk-fNBmCS32gT4QlbGAxh308MgcUbevLfYoeqdlJ8XnFnFHSs2QjDAiWodQLAMa4E0/w640-h360/Tiger%203%20(1).jpg" />
          <meta property="og:url" content="https://blogger-vercel-proxy.vercel.app/api/proxy" />
        </head>
        <body>
          <p>Only for Facebook crawler</p>
        </body>
      </html>
    `);
  } else {
    // Real visitor redirect হবে Blogger সাইটে
    res.writeHead(302, {
      Location: 'https://screeninsiderhub.blogspot.com',
    });
    res.end();
  }
}
