exports.handler = async (event) => {
    const targetUrl = event.queryStringParameters.url;

    if (!targetUrl) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Missing URL parameter" }),
        };
    }

    // ✅ Allowlist domains
    const allowedDomains = ["example.com", "wikipedia.org", "mozilla.org"];
    let parsedUrl;

    try {
        parsedUrl = new URL(targetUrl);
    } catch (err) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid URL" }),
        };
    }

    const hostname = parsedUrl.hostname.toLowerCase();
    const isAllowed = allowedDomains.some(domain =>
        hostname === domain || hostname.endsWith(`.${domain}`)
    );

    if (!isAllowed) {
        return {
            statusCode: 403,
            body: JSON.stringify({ error: "Domain not allowed", domain: hostname }),
        };
    }

    try {
        const response = await fetch(targetUrl, {
            redirect: "manual",
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Accept": "*/*"
            }
        });

        // 🚦 Handle HTTP redirects
        if (response.status >= 300 && response.status < 400) {
            const location = response.headers.get("location");
            const absolute = new URL(location, targetUrl).href;

            return {
                statusCode: 302,
                headers: {
                    Location: `/.netlify/functions/proxy?url=${encodeURIComponent(absolute)}`
                }
            };
        }

        const contentType = response.headers.get("content-type") || "";
        let body = await response.text();

        // 🔗 Rewrite HTML links to keep navigation inside the proxy
        if (contentType.includes("text/html")) {
            body = body.replace(/href=["']([^"']+)["']/g, (match, href) => {
                try {
                    const absolute = new URL(href, targetUrl).href;
                    return `href="/.netlify/functions/proxy?url=${encodeURIComponent(absolute)}"`;
                } catch {
                    return match; // Leave it untouched if invalid
                }
            });
        }

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": contentType
            },
            body
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: "Failed to fetch data",
                details: error.message
            }),
        };
    }
};
