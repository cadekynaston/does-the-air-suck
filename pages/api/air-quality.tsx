// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
require('dotenv').config()
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {


  console.log('calling google geocode')
  axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.address}&key=${process.env.GOOGLE_API_KEY}`)
    .then(response => {

      // console.log('google geocode: ', response)
      const result = response?.data?.results?.[0]
      if (result) {
        const formattedAddress = result.formatted_address
        const { lat, lng } = result.geometry.location
        return { lat, lng, formattedAddress }
      }
      res.status(200).json({ error: true, response, address: req.query.address })
      return undefined
    }).then((response) => {
      const { lat, lng, formattedAddress } = response

      console.log('calling breezeometer')
      axios.get(`https://api.breezometer.com/air-quality/v2/current-conditions?lat=${lat}&lon=${lng}&key=${process.env.BREEZEOMETER_API_KEY}&features=breezometer_aqi,local_aqi,health_recommendations,sources_and_effects,pollutants_concentrations,pollutants_aqi_information`)
        .then(response => {
          // console.log(response)
          const result = response?.data?.data

          if (!result) {
            console.log('500!!!')
            res.status(500).json(response)
            return
          }

          axios.get(`https://api.breezometer.com/air-quality/v2/historical/hourly?lat=${lat}&lon=${lng}&key=${process.env.BREEZEOMETER_API_KEY}&hours=48`)
            .then(historyResponse => {

              res.status(200).json({
                ...result,
                formattedAddress,
                lat,
                lng,
                history: historyResponse?.data
              })
            })

        }).catch(error => {
          res.status(200).json({ error: true, response: error, address: req.query.address })
        })
    }).catch(error => {
      res.status(200).json({ error: true, response: error, address: req.query.address })
    })




}
