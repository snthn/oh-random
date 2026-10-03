const imagePools = {
    lance: [
        "https://YOUR-IMAGE-URL-1",
        "https://YOUR-IMAGE-URL-2",
        "https://YOUR-IMAGE-URL-3"
    ],

    sandy: [
        "https://YOUR-IMAGE-URL-1",
        "https://YOUR-IMAGE-URL-2"
    ]
};

export default async (req) => {
    const url = new URL(req.url);

    const match = url.pathname.match(/^\/random\/([^/]+)\.gif$/i);

    if (!match) {
        return new Response("Not found", {
            status: 404
        });
    }

    const name = match[1].toLowerCase();
    const images = imagePools[name];

    if (!images || images.length === 0) {
        return new Response("Image pool not found", {
            status: 404
        });
    }

    const randomImage =
        images[Math.floor(Math.random() * images.length)];

    const response = await fetch(randomImage);

    if (!response.ok) {
        return new Response("Unable to load image", {
            status: 502
        });
    }

    const contentType =
        response.headers.get("content-type") || "image/gif";

    return new Response(response.body, {
        status: 200,
        headers: {
            "Content-Type": contentType,
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            "CDN-Cache-Control": "no-store",
            "Vercel-CDN-Cache-Control": "no-store",
            "Pragma": "no-cache",
            "Expires": "0"
        }
    });
};
