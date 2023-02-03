import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Lexical Playground</title>
        <meta name="description" content="Learn how to work with Lexical" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Lexical Playground</h1>
        <ul>
          <li>
            <Link href="/editor/plan-text">Plan Text</Link>
          </li>
          <li>
            <Link href="/editor/rich-text">Rich Text</Link>
          </li>
        </ul>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://lexical.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read More.
        </a>
      </footer> 
    </div>
  );
}
