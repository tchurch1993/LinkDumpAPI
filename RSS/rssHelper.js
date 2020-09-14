const Parser = require('rss-parser');
const parser = new Parser({
    maxredirects: 100
});
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/"

module.exports = async (rssUrl) => {
    try {
        parser.parseURL(CORS_PROXY + rssUrl,feed => {
            console.log(feed.title);

            feed.items.forEach(item => {
                console.log(item);
            });
        }, { redirectCount: 5 });

    } catch (err) {
        console.error(err);
    }

}