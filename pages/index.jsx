import Head from "next/head";
import { AudioPlayer } from "../components/AudioPlayer/AudioPlayer";
import styles from "../styles/Index.module.scss";
import { getProviders, signIn, signOut } from "next-auth/react";
import SideBar from "../components/SideBar/SideBar";
// import Center from "../components/Artist/Center";

export default function Home({ providers }) {
  return (
    <div className={styles.container}>
      
      {/* <Center /> */}
    </div>
  );
}
