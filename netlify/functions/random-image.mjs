const imagePools = {
    benny: [
        "https://iili.io/nl0KqFa.png",
        "https://iili.io/nl0KK6g.png",
        "https://iili.io/nl0KFMF.png",
        "https://iili.io/nl0K3n1.png",
        "https://iili.io/nl0KdZP.png",
        "https://iili.io/nl0KJwB.png"
    ],

    nick: [
        "https://iili.io/nl0gjEu.png",
        "https://iili.io/nl0gVh7.png",
        "https://iili.io/nl0gWQ9.png",
        "https://iili.io/nl0ghBe.png"
    ]
};

export default async (req, context) => {
    const name = context.params.name?.toLowerCase();

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

    return new Response(response.body, {
        status: 200,
        headers: {
            "Content-Type":
                response.headers.get("content-type") || "image/gif",

            "Cache-Control":
                "no-store, no-cache, must-revalidate, proxy-revalidate",

            "CDN-Cache-Control": "no-store",
            "Netlify-Vary": "query"
        }
    });
};

export const config = {
    path: "/random/:name.gif"
};
