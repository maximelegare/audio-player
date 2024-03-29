import "../styles/globals.scss";
import Layout from "../components/Layout/Layout";
import { SessionProvider } from "next-auth/react";

import { RecoilRoot } from "recoil";

import Head from "next/head";

import { useRouter } from "next/router";
import { useEffect } from "react";

import useFetch from "../hooks/FetchHooks";


const AppWrapper = ({ children }) => {

  const {fetchPlaylists} = useFetch()

  useEffect(() => {
    fetchPlaylists(`/api/get-playlists`)
  }, []);
  
  return <>{children}</>;
};

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const router = useRouter();

  return (
    <RecoilRoot>
      <SessionProvider session={session}>
        <AppWrapper>
          <Layout {...pageProps}>
            <Head>
              <title>Hodei Music</title>
              <meta name="description" content="Generated by create next app" />

             
            </Head>
            <Component {...pageProps} />
          </Layout>
        </AppWrapper>
      </SessionProvider>
    </RecoilRoot>
  );
}

export default MyApp;

export async function getInitialProps() {
  const res = await sql_query_string("SELECT title, route, id FROM playlists");
  const playlists = JSON.parse(JSON.stringify(res));

  

  return { props: { playlists } };
}
