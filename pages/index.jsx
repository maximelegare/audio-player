import Head from "next/head";
import { AudioPlayer } from "../components/AudioPlayer/AudioPlayer";
import styles from "../styles/Index.module.scss";
import { getProviders, signIn, signOut } from "next-auth/react";
import SideBar from "../components/SideBar/SideBar";
import Center from "../components/Center/Center";

export default function Home({providers}) {



  return (
    <div className={styles.container}>
      <Head>
        <title>React audio Player</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.top}>
          <SideBar />
          <Center />
        </div>
        <AudioPlayer
          title="This is a long long long long long skhfakajfh title"
          artist="Maxime Légaré"
          fileUrl="https://docs.google.com/uc?export=open&amp;id=1Tso7ly-_FthVJC-lIdB38Z-6BcY6VeJW" 
          imgUrl="https://upload.wikimedia.org/wikipedia/en/8/8e/World_Domination_%28Band-Maid_album%29.png"
        />
      </main>
    </div>
  );
}
