import Head from "next/head";
import { RichTextEditor } from "../../../components/RichTextEditor";
import styles from "../Editor.module.css";
// import dynamic from 'next/dynamic'

// credit: https://blog.bitsrc.io/using-non-ssr-friendly-components-with-next-js-916f38e8992c
// const PlanTextNoSSR = dynamic(
//   () => import('../../../components/PlanTextEditor'),
//   { ssr: false }
// )

export default function PlanTextPage() {
  return (
    <div className={styles.editor}> 
      <Head>
        <title>Lexical Playground: plan text</title>
        <meta name="description" content="Learn how to work with Lexical" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* <PlanTextNoSSR/> */}
     <RichTextEditor/>
    </div>
  );
}
