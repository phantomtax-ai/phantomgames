exports.handler = async (event) => {
    const targetUrl = event.queryStringParameters.url;
    
    if (!targetUrl) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing URL parameter" }),
        };
    }

    try {
        const response = await fetch(targetUrl, {
            headers: { "User-Agent": "Mozilla/5.0" },
        });

        const data = await response.text();

        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: data,
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch data", details: error.message }),
        };
    }
};
