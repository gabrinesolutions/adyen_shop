import axios from "axios"

export const paymentClient = axios.create({
  baseURL: "https://checkout-test.adyen.com/v69/",
  timeout: 1000,
  headers: {
    "x-API-key": process.env.ADYEN_API_KEY,
    "Content-Type": "application/json",
    Accepts: "application/json",
  },
})
