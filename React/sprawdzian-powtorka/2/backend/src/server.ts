import express from 'express';
const app = express();

const data = {
    items: [
        {
            id: 1,
            product_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/product.png",
            title: "Gray Hooded Sweatshirt",
            slogan: "The top hooded sweatshirt we offer",
            description:
                "Unless you live in a nudist colony, there are moments when the chill you feel demands that you put on something warm, and for those times, there's nothing better than this sharp Fantastic hoodie. Made of 100% cotton, this machine washable, mid-weight hoodie is all you need to stay comfortable when the temperature drops. And, since being able to keep your vital stuff with you is important, the hoodie features two roomy kangaroo pockets to ensure nothing you need ever gets lost.",
            stars: 1,
            category: "Apparel",
            img_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star2.png",
            price: 29.999,
        },
        {
            id: 2,
            product_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/product.png",
            title: "Coffee Mug",
            slogan: "Keep your coffee hot!",
            description:
                "A mug is a type of cup used for drinking hot beverages, such as coffee, tea, hot chocolate or soup. Mugs usually have handles, and hold a larger amount of fluid than other types of cup. Usually a mug holds approximately 12 US fluid ounces (350 ml) of liquid; double a tea cup. A mug is a less formal style of drink container and is not usually used in formal place settings, where a teacup or coffee cup is preferred.",
            stars: 2,
            category: "Kitchen",
            img_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star2.png",
            price: 12.55,
        },
        {
            id: 3,
            product_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/product.png",
            title: "Stress Ball",
            slogan: "Squeeze your stress away",
            description:
                "The moment life piles more onto your already heaping plate and you start feeling hopelessly overwhelmed, take a stress ball in hand and squeeze as hard as you can. Take a deep breath and just let that tension go. Repeat as needed. It will all be OK! Having something small, portable and close at hand is a must for stress management.",
            stars: 2,
            category: "Swag",
            img_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star2.png",
            price: 5.15,
        },
        {
            id: 4,
            product_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/product.png",
            title: "Track Jacket",
            slogan: "Go to the track in style!",
            description:
                "Crafted from ultra-soft combed cotton, this essential jacket features sporty contrast tipping and Fantastic's signature embroidered leaf.",
            stars: 1,
            category: "Apparel",
            img_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star2.png",
            price: 45.25,
        },
        {
            id: 5,
            product_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/product.png",
            title: "Women's T-shirt",
            slogan: "Fantastic shirt in-style",
            description:
                "Crafted from ultra-soft combed cotton, this essential t-shirt features sporty contrast tipping and Fantastic's signature leaf.",
            stars: 2,
            category: "Apparel",
            img_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star2.png",
            price: 45.05,
        },
        {
            id: 6,
            product_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/product.png",
            title: "Brown Carry-all Bag",
            slogan: "Keep extra items here",
            description:
                "Let your style speak for itself with this chic brown carry-all bag. Featuring a nylon exterior with solid contrast trim, brown in color, and Fantastic logo",
            stars: 1,
            category: "Swag",
            img_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star2.png",
            price: 50.99,
        },
        {
            id: 7,
            product_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/product.png",
            title: "Brown Tumbler",
            slogan: "Bring your coffee to go",
            description:
                "The Fantastic Insulated Travel Tumbler is smartly designed to maintain temperatures and go anywhere. Dual wall construction will keep your beverages hot or cold for hours and a slide lock lid helps minimize spills.",
            stars: 4,
            category: "Kitchen",
            img_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star2.png",
            price: 90.57,
        },
        {
            id: 8,
            product_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/product.png",
            title: "Pen (Green)",
            slogan: "The only pen you'll ever need",
            description:
                "Erase and rewrite repeatedly without damaging documents. The needlepoint tip creates clear precise lines and the thermo-sensitive gel ink formula disappears with erasing friction.",
            stars: 5,
            category: "Office",
            img_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star2.png",
            price: 2.05,
        },
        {
            id: 9,
            product_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/product.png",
            title: "Pen (Black)",
            slogan: "The only pen you'll ever need",
            description:
                "Erase and rewrite repeatedly without damaging documents. The needlepoint tip creates clear precise lines and the thermo-sensitive gel ink formula disappears with erasing friction.",
            stars: 4,
            category: "Office",
            img_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star2.png",
            price: 2.05,
        },
        {
            id: 10,
            product_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/product.png",
            title: "Green T-shirt",
            slogan: "Fantastic community shirt",
            description:
                "Crafted from ultra-soft combed cotton, this essential t-shirt features sporty contrast tipping and Fantastic's signature leaf.",
            stars: 4,
            category: "Apparel",
            img_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star2.png",
            price: 20.05,
        },
        {
            id: 11,
            product_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/product.png",
            title: "Fantastic The Definitive Guide",
            slogan: "2nd Edition",
            description:
                "Manage the hufantasticus amount of data collected through your web application with Fantastic. This authoritative introduction—written by a core contributor to the project—shows you the many advantages of using document-oriented databases, and demonstrates how this reliable, high-performance system allows for almost infinite horizontal scalability.",
            stars: 5,
            category: "Books",
            img_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star2.png",
            price: 20.55,
        },
        {
            id: 12,
            product_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/product.png",
            title: "Leaf Sticker",
            slogan: "Add to your sticker collection",
            description:
                "Waterproof vinyl, will last 18 months outdoors.  Ideal for smooth flat surfaces like laptops, journals, windows etc.  Easy to remove.  50% discounts on all orders of any 6+",
            stars: 5,
            category: "Stickers",
            img_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star2.png",
            price: 1.55,
        },
        {
            id: 13,
            product_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/product.png",
            title: "USB Stick (Green)",
            slogan: "1GB of space",
            description:
                "Fantastic's Turbo USB 3.0 features lightning fast transfer speeds of up to 10X faster than standard Fantastic USB 2.0 drives. This ultra-fast USB allows for fast transfer of larger files such as movies and videos.",
            stars: 5,
            category: "Electronics",
            img_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star2.png",
            price: 20.99,
        },
        {
            id: 14,
            product_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/product.png",
            title: "USB Stick (Leaf)",
            slogan: "1GB of space",
            description:
                "Fantastic's Turbo USB 3.0 features lightning fast transfer speeds of up to 10X faster than standard Fantastic USB 2.0 drives. This ultra-fast USB allows for fast transfer of larger files such as movies and videos.",
            stars: 4,
            category: "Electronics",
            img_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star2.png",
            price: 20.99,
        },
        {
            id: 15,
            product_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/product.png",
            title: "Scaling Fantastic",
            slogan: "2nd Edition",
            description:
                "Create a Fantastic cluster that will grow to meet the needs of your application. With this short and concise book, you'll get guidelines for setting up and using clusters to store a large volume of data, and learn how to access the data efficiently. In the process, you'll understand how to make your application work with a distributed database system.",
            stars: 5,
            category: "Books",
            img_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star2.png",
            price: 29.55,
        },
        {
            id: 16,
            product_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/product.png",
            title: "Powered by Fantastic Sticker",
            slogan: "Add to your sticker collection",
            description:
                "Waterproof vinyl, will last 18 months outdoors.  Ideal for smooth flat surfaces like laptops, journals, windows etc.  Easy to remove.  50% discounts on all orders of any 6+",
            stars: 2,
            category: "Stickers",
            img_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star2.png",
            price: 1.55,
        },
        {
            id: 17,
            product_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/product.png",
            title: "Fantastic Umbrella (Brown)",
            slogan: "Premium Umbrella",
            description:
                "Our crook handle stick umbrella opens automatically with the push of a button. A traditional umbrella with classic appeal.",
            stars: 2,
            category: "Umbrellas",
            img_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star2.png",
            price: 21.5,
        },
        {
            id: 18,
            product_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/product.png",
            title: "Fantastic Umbrella (Gray)",
            slogan: "Premium Umbrella",
            description:
                "Our crook handle stick umbrella opens automatically with the push of a button. A traditional umbrella with classic appeal.",
            stars: 3,
            category: "Umbrellas",
            img_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star2.png",
            price: 21.05,
        },
        {
            id: 19,
            product_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/product.png",
            title: "Fantastic University Book",
            slogan: "A concise summary of Fantastic commands",
            description:
                "Keep the Fantastic commands you'll need at your fingertips with this concise book.",
            stars: 1,
            category: "Books",
            img_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star2.png",
            price: 4.05,
        },
        {
            id: 20,
            product_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/product.png",
            title: "Fantastic University T-shirt",
            slogan: "Show Your MDBU Alumni Status",
            description:
                "Crafted from ultra-soft combed cotton, this essential t-shirt features sporty contrast tipping and Fantastic's signature leaf.",
            stars: 1,
            category: "Apparel",
            img_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star2.png",
            price: 45.05,
        },
        {
            id: 21,
            product_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/product.png",
            title: "USB Stick",
            slogan: "5GB of space",
            description:
                "Fantastic's Turbo USB 3.0 features lightning fast transfer speeds of up to 10X faster than standard Fantastic USB 2.0 drives. This ultra-fast USB allows for fast transfer of larger files such as movies and videos.",
            stars: 2,
            category: "Electronics",
            img_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star2.png",
            price: 40.55,
        },
        {
            id: 22,
            product_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/product.png",
            title: "Water Bottle",
            slogan: "Glass water bottle",
            description:
                "High quality glass bottle provides a healthier way to drink.  Silicone sleeve provides a good grip, a see-through window, and protects the glass vessel.  Eliminates toxic leaching that plastic can cause.  Innovative design holds 22-1/2 ounces.  Dishwasher safe",
            stars: 5,
            category: "Kitchen",
            img_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star2.png",
            price: 23.44,
        },
        {
            id: 23,
            product_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/product.png",
            title: "WiredTiger T-shirt",
            slogan: "Unleash the tiger",
            description:
                "Crafted from ultra-soft combed cotton, this essential t-shirt features sporty contrast tipping and Fantastic's signature leaf.",
            stars: 1,
            category: "Apparel",
            img_url: "http://4ia1.spec.pl.hostingasp.pl/test_uploadu/star2.png",
            price: 22.33,
        },
    ],
};

app.get("/products", (req, res) => {
    res.json(data.items);
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});