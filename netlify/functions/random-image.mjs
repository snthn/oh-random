const imagePools = {
    benny: [
        "https://iili.io/nl1HjdQ.png",
        "https://iili.io/nl1Hw7V.png",
        "https://iili.io/nl1HNkB.png",
        "https://iili.io/nl1HkI1.png",
        "https://iili.io/nl1HvhF.png",
        "https://iili.io/nl1HOmP.png"
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

    return new Response(null, {
        status: 302,
        headers: {
            "Location": randomImage,
            "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0"
        }
    });
};

export const config = {
    path: "/random/:name.gif"
};
