import { useState } from "react";
import axios from 'axios';

import {
  FormControl,
  FormLabel,
  Flex,
  Input,
  Button,
} from "@chakra-ui/react"

import React from 'react'

const AddressForm = ({ setAirQualityData }) => {
  const [address, setAddress] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(event) {
    setAddress(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      getData()
    }
  }

  function getData() {
    setLoading(true)
    axios.get(`/api/air-quality?address=${address}`)
      .then(response => {
        console.log(response.data)
        setAirQualityData(prev => {
          setLoading(false)
          return [...prev, response.data]
        })
      })
  }

  return (
    <Flex w="100%" mb={8} align="center">
      <FormControl id="address">
        <Input onKeyPress={handleKeyPress} value={address} onChange={handleChange} size="lg" placeholder="P. Sherman 42 Wallaby Way" />
      </FormControl>
      <Button
        isLoading={loading}
        loadingText="Searching"
        ml="5"
        size="lg"
        colorScheme="blue"
        variant="outline"
        onClick={getData}
      >
        Search
      </Button>
    </Flex>
  )
}

export default AddressForm
