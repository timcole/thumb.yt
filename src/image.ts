import { userAgent } from './scrape';

export async function fetchImage(url: string) {
  let imageFile = await fetch(url, {
    headers: {
      'User-Agent': userAgent,
    },
  });
  let type = imageFile.headers.get('content-type') || 'image/webp';

  let { readable, writable } = new TransformStream();
  if (imageFile.body) imageFile.body.pipeTo(writable);

  return { url, file: readable, type };
}
