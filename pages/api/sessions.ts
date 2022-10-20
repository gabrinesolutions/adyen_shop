import { paymentClient } from "app/payments/client"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await paymentClient.post("/sessions", {
      merchantAccount: process.env.ADYEN_MERCHANT_ACCOUNT,
      amount: {
        value: 100,
        currency: "EUR",
      },
      returnUrl: "http://localhost:3000/checkout?shopperOrder=12xy..",
      reference: "oluseyi_checkoutChallenge",
      countryCode: "NL",
      storePaymentMethod: true,
      shopperInteraction: "Ecommerce",
      recurringProcessingModel: "CardOnFile",
    })

    return res.status(response.status).json(response.data)
  } catch (error: any) {
    console.error(error)

    res.json({
      error: error.message,
    })
  }
}
