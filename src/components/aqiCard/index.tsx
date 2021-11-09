import React from 'react'
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  CircularProgress,
  CircularProgressLabel,
  Flex,
  Grid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Alert,
  AlertIcon
} from "@chakra-ui/react"

import { Line } from 'react-chartjs-2'

import PollutantModal from '../pollutantModal'

const AqiCard = ({ airQualityData }) => {

  const descriptions = [
    "The air 100% sucks.",
    "The air really sucks.",
    "The air sucks.",
    "The air sucks a little bit. Still get out there.",
    "The air does not suck. Get out there!",
  ]

  if (!airQualityData.length) {
    return null
  }

  return airQualityData.map(data => {

    if (data.error) {
      return <Alert mb="4" status="warning" borderRadius="md"> <AlertIcon />could not find data for {data.address}</Alert>
    }

    const indexSources = Object.values(data.indexes)

    const labels = data?.history?.data?.map?.(({ datetime }) => datetime);
    const values = data?.history?.data?.map?.(({ indexes }) => indexes.baqi?.aqi);
    console.log(data?.history)
    console.log(values)

    const chartData = {
      labels: labels,
      datasets: [{
        label: 'AQI (higher is better)',
        data: values,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    return (
      <Box key={data.formattedAddress} w="100%" borderWidth="1px" borderRadius="lg" mb="5">

        <Box p="6" >

          <Box d="flex" w="100%" alignItems="center" >
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              w="50%"
            >


              <Text
                color="gray.700"
                fontWeight="semibold"
                letterSpacing="wide"
                fontSize="md"
                textTransform="uppercase"
                mb="3"
                pr="5"
              >
                {data.formattedAddress}
                <br />
                <Text
                  color="gray.500"
                  fontSize="xs"

                >
                  {data.lat}, {data.lng}
                </Text>
              </Text>

              <Tabs variant="soft-rounded" colorScheme="gray">
                <TabPanels>
                  {indexSources.map((source) => {

                    const isBreezeometer = source.display_name === "BreezoMeter AQI"
                    const aqi = isBreezeometer ? source.aqi : source.aqi / 5

                    let message = descriptions[4]
                    if (isBreezeometer) {
                      message = descriptions[Math.floor(aqi / 20)]
                    } else {
                      if (source.aqi > 50) {
                        message = descriptions[3]
                      }
                      if (source.aqi > 100) {
                        message = descriptions[2]
                      }
                      if (source.aqi > 150) {
                        message = descriptions[1]
                      }
                      if (source.aqi > 200) {
                        message = descriptions[0]
                      }
                    }

                    return (
                      <TabPanel key={source.display_name}>
                        <Flex>
                          <CircularProgress value={aqi} size="120px" color={source.color}>
                            <CircularProgressLabel>{source?.aqi || "NA"}</CircularProgressLabel>
                          </CircularProgress>

                          <Box p="2" ml="2">
                            <Text lineHeight="28px" fontSize="2xl">{message}</Text>
                            <Text fontSize="xs">Dominant Pollutant</Text>
                            <Badge colorScheme="yellow" fontSize="md">{source?.dominant_pollutant}</Badge>
                          </Box>
                        </Flex>
                      </TabPanel>
                    )
                  }
                  )}
                  <TabList>
                    {indexSources.map(({ display_name }) => <Tab key={display_name}>{display_name}</Tab>)}
                  </TabList>

                </TabPanels>
              </Tabs>
            </Box>

            <Box w="50%" alignContent="center">
              {/* <Text>Pollutants</Text> */}

              <Grid templateColumns="repeat(2, 1fr)" gap={2}>

                {Object.values(data.pollutants).map(pollutant => {

                  return (
                    // <Box borderWidth="1px" borderColor={pollutant.color} borderRadius="lg" p="2">{pollutant.display_name}</Box>
                    <PollutantModal data={pollutant} />
                  )
                })}
              </Grid>
            </Box>
          </Box>
          <Accordion mt="5" allowToggle>

            <AccordionItem >
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Historical Data
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>

                <Line type="line" data={chartData} />

              </AccordionPanel>
            </AccordionItem>

            <AccordionItem >
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    Heath Recommendations
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {Object.keys(data.health_recommendations).map(key => {
                  return (
                    <Text maxW="750px" mb="2" > <Text as="span" fontWeight="bold">{key.replace("_", " ").toUpperCase()}:</Text> {data.health_recommendations[key]}</Text>
                  )
                })}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          {/*
          <Box d="flex" mt="2" alignItems="center">

            <Box as="span" ml="2" color="gray.600" fontSize="sm">
              {property.reviewCount} reviews
            </Box>
          </Box> */}
        </Box>
      </Box >
    )

  }).reverse()
}

export default AqiCard
