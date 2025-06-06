exports.handler = async function(event) {
    const url = event.queryStringParameters.url;

    if (!url) {
        return {
            statusCode: 400,
            body: "URL parameter is required"
        };
    }

    try {
        const response = await fetch(url);
        const data = await response.text();

        return {
            statusCode: 200,
            body: data
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: "Failed to fetch data"
        };
    }
};
