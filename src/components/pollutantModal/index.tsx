import React from 'react'
import { useState } from "react";
import axios from 'axios';

import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Badge,
  CircularProgress,
  CircularProgressLabel,
  Text,
  Tag,
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList
} from "@chakra-ui/react"


const PollutantModal = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box cursor="pointer" borderWidth="1px" d="flex" borderRadius="lg" p="2" textAlign="center" alignItems="center" onClick={onOpen}>
        <CircularProgress value={data?.aqi_information?.baqi?.aqi} size="50px" color={data?.aqi_information?.baqi?.color}>
          <CircularProgressLabel>{data?.aqi_information?.baqi?.aqi || "NA"}</CircularProgressLabel>
        </CircularProgress>
        <Box ml="2">

          <Text
            // fontWeight="semibold"
            textAlign="left"
            letterSpacing="wide"
            fontSize="md"
            textTransform="uppercase"
            ml="2">{data?.display_name}</Text>
          <Tag size="sm">{data?.concentration?.value} {data?.concentration?.units}</Tag>
        </Box>
      </Box>

      <Modal isOpen={isOpen} isCentered onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{data?.full_name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb="5">
            {/* <CircularProgress value={data.aqi_information.baqi.aqi} size="120px" color={data.aqi_information.baqi.color}>
              <CircularProgressLabel>{data.aqi_information.baqi.aqi}</CircularProgressLabel>
            </CircularProgress> */}


            <Text mb="2"><Text as="span" fontWeight="bold">Effects:</Text> {data.sources_and_effects.effects}</Text>
            <Text><Text as="span" fontWeight="bold">Sources:</Text> {data.sources_and_effects.sources}</Text>

          </ModalBody>

        </ModalContent>
      </Modal>
    </>
  )
}

export default PollutantModal
