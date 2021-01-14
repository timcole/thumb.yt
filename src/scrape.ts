export const userAgent = `Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36`;

export async function scrapeYT(id: string): Promise<string> {
  const html = await fetch(
    `https://www.youtube.com/results?search_query=${id}`,
    {
      headers: {
        'User-Agent': userAgent,
      },
    },
  ).then((data) => data.text());

  const pattern = `(https:\/\/i\.ytimg\.com\/an_webp\/${id}\/mqdefault.+?)",`;
  const reg = new RegExp(pattern, 'gi');
  const [, thumb] = reg.exec(html) || [
    '',
    // Fallback to a non-animated version
    `https://i.ytimg.com/vi/${id}/mqdefault.jpg`,
  ];

  return JSON.parse(`"${thumb}"`);
}
