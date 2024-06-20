import { Html, Head, Main, NextScript } from "next/document";
import {
  DocumentHeadTags,
  documentGetInitialProps,
} from "@mui/material-nextjs/v13-pagesRouter";

import type { DocumentHeadTagsProps } from "@mui/material-nextjs/v13-pagesRouter";

// or `v1X-pagesRouter` if you are using Next.js v1X

import type { DocumentProps } from "next/document";

export default function Document(props: DocumentProps & DocumentHeadTagsProps) {
  return (
    <Html lang="en">
      <Head>
        <DocumentHeadTags {...props} />{" "}
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="modal-root" />
      </body>
    </Html>
  );
}

Document.getInitialProps = async (ctx: any) => {
  const finalProps = await documentGetInitialProps(ctx);
  return finalProps;
};
