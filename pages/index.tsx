import type { NextPage } from 'next'
import { useState } from 'react'
import axios from 'axios';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Box } from "@chakra-ui/react"


import AddressForm from '../src/components/addressForm'
import AqiCard from '../src/components/aqiCard'

const Home: NextPage = () => {

  const [airQualityData, setAirQualityData] = useState([])

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Box w="900px">

          <h1 className={styles.title}>Does the air suck?</h1>

          <AddressForm setAirQualityData={setAirQualityData} />
          <AqiCard airQualityData={airQualityData} />
        </Box>

      </main>


    </div >
  )
}

export default Home
