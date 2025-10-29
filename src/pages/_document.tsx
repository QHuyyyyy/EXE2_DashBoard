import Document, { Html, Head, Main, NextScript } from "next/document";

// Minimal custom Document to satisfy Next.js builder when pages/_document is expected.
// Using the default markup — this file is intentionally minimal and can be removed
// if your app router setup doesn't require a custom Document.
export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
