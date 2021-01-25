import { fetchImage } from './image';
import { scrapeYT } from './scrape';

const index = `
<!DOCTYPE HTML>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="">
  <title>Animated YouTube Thumbnails</title>
  <style>html { text-align: center; background: #0d0d0d; color: white; font-family: "Comic Sans MS", "Comic Sans", cursive; } h1 { font-wight: normal; } a { color: cyan; }</style>
  <!-- Cloudflare Web Analytics --><script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "8aae9a3845d0405b99aad678fa1e555c"}'></script><!-- End Cloudflare Web Analytics -->
</head>
<body>
  <h1>Try using: <code>https://thumb.yt/{video_id}</code></h1>
  <p>Idea provided by <a href="https://www.youtube.com/watch?v=4Z_Bdn9Y3Kw" target="_blank">Wes Bos</a> example with his video:</p>
  <a href="/4Z_Bdn9Y3Kw"><img src="/4Z_Bdn9Y3Kw" alt="Thumbnail of Wes Bos' video" /></a>
  <hr />
  <p>Created by <a href="https://twitter.com/ModestTim/status/1349566880726573062" target="_blank">ModestTim</a> &mdash; <a href="https://github.com/timcole/thumb.yt" target="_blank">Source Code</a></p>
  <hr />
  <h4>React Component Example</h4>
  <iframe allowfullscreen="allowfullscreen" allowpaymentrequest="" src="//jsfiddle.net/TimCole/dw4rkpcs/6/embedded/js,result/dark/" width="100%" height="500" frameborder="0"></iframe>
</body>
</html>`;

export async function handleRequest(request: Request): Promise<Response> {
  const { pathname } = new URL(request.url);
  let videoId = pathname.split('/')[1];

  if (videoId.length === 0)
    return new Response(index.trim(), {
      headers: { 'Content-Type': 'text/html' },
    });

  if (videoId.length !== 11 || videoId === 'favicon.ico')
    videoId = 'oHg5SJYRHA0';

  const img = await scrapeYT(videoId);
  const { url, file, type } = await fetchImage(img);

  return new Response(file, {
    headers: {
      'X-URL': url,
      'Content-Type': type,
    },
  });
}
