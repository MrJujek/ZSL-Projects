import express from 'express';
const app = express();

const data = {
    "boards": [
        {
            "id": 111,
            "title": "plansza AAA",
            "color": "#ff0000"
        },
        {
            "id": 222,
            "title": "plansza BBB",
            "color": "#00ff00"
        },
        {
            "id": 555,
            "title": "plansza CCC",
            "color": "#0000ff"
        },
        {
            "id": 888,
            "title": "plansza DDD",
            "color": "#ffff00"
        }
    ]
}

app.get("/boards", (req, res) => {
    res.json(data.boards);
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});
