import { Fragment, useCallback, useEffect } from "react"
import { ChevronRightIcon, ChevronUpIcon } from "@heroicons/react/20/solid"
import { Popover, Transition } from "@headlessui/react"
import { z } from "zod"
import Form from "app/core/components/Form"
import LabeledTextField from "app/core/components/LabeledTextField"
import axios from "axios"

const steps = [
  { name: "Cart", href: "#", status: "complete" },
  { name: "Billing Information", href: "#", status: "current" },
  { name: "Confirmation", href: "#", status: "upcoming" },
]
const products = [
  {
    id: 1,
    name: "Micro Backpack",
    href: "#",
    price: "$70.00",
    color: "Moss",
    size: "5L",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg",
    imageAlt:
      "Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
  },
  {
    id: 3,
    name: "Premium Green Backpack",
    href: "#",
    price: "$170.00",
    color: "Moss",
    size: "5L",
    imageSrc: "https://tailwindui.com/img/ecommerce-images/checkout-page-04-product-01.jpg",
    imageAlt:
      "Moss green canvas compact backpack with double top zipper, zipper front pouch, and matching carry handle and backpack straps.",
  },
  // More products...
]

export const Checkout = z.object({
  cardNumber: z.string(),
  cvc: z.string(),
  nameOnCard: z.string(),
  expiryDate: z.string().min(4).max(4),
})

export default function CheckoutPage() {
  const onSumbit = useCallback(async ({ ...input }: z.infer<typeof Checkout>) => {
    console.log(input)
  }, [])

  const getSession = async () => {
    try {
      const response = await axios.post("/api/sessions")

      console.log(response.data)
    } catch (error: any) {
      console.error(error)
    }
  }

  useEffect(() => {
    void getSession()
  }, [])

  return (
    <div className="bg-white">
      {/* Background color split screen for large screens */}
      <div
        className="fixed top-0 left-0 hidden h-full w-1/2 bg-white lg:block"
        aria-hidden="true"
      />
      <div
        className="fixed top-0 right-0 hidden h-full w-1/2 bg-gray-50 lg:block"
        aria-hidden="true"
      />

      <header className="relative border-b border-gray-200 bg-white text-sm font-medium text-gray-700">
        <div className="mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8">
          <div className="relative flex justify-end sm:justify-center">
            <a href="#" className="absolute left-0 top-1/2 -mt-4">
              <span className="sr-only">Super Company</span>

              <svg
                width="170"
                className="h-8 w-auto"
                height="30"
                enable-background="new 0 0 170 30"
                viewBox="0 0 170 30"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="#0abf53">
                  <path
                    d="M12.7406 7.0246H0.200639V11.0374H8.32652C8.82812 11.0374 9.22939 11.4387 9.22939 11.9403V18.9626H7.52396C7.02236 18.9626 6.62109 18.5613 6.62109 18.0597V13.0438H3.21022C1.40447 13.0438 0 14.4482 0 16.254V19.8655C0 21.6712 1.40447 23.0757 3.21022 23.0757H15.9508V10.2348C15.9508 8.42907 14.5463 7.0246 12.7406 7.0246V7.0246Z"
                    fill="#0ABF53"
                  ></path>
                  <path
                    d="M27.8888 18.9626H26.1834C25.6818 18.9626 25.2805 18.5613 25.2805 18.0597V7.02459H21.8696C20.0639 7.02459 18.6594 8.42906 18.6594 10.2348V19.7652C18.6594 21.5709 20.0639 22.9754 21.8696 22.9754H34.6102V0.403503H27.9891L27.8888 18.9626Z"
                    fill="#0ABF53"
                  ></path>
                  <path
                    d="M46.4479 18.9626H44.7425C44.2409 18.9626 43.8396 18.5613 43.8396 18.0597V7.0246H37.2185V19.7652C37.2185 21.5709 38.623 22.9754 40.4287 22.9754H46.5482V24.9818H37.5195V29.5965H50.0594C51.8652 29.5965 53.2696 28.192 53.2696 26.3863V7.0246H46.6485V18.9626H46.4479Z"
                    fill="#0ABF53"
                  ></path>
                  <path
                    d="M68.5182 7.0246H55.7776V19.7652C55.7776 21.5709 57.1821 22.9754 58.9879 22.9754H71.5278V18.9626H63.4019C62.9003 18.9626 62.4991 18.5613 62.4991 18.0597V11.0374H64.2045C64.7061 11.0374 65.1074 11.4387 65.1074 11.9403V16.9562H68.5182C70.324 16.9562 71.7284 15.5518 71.7284 13.746V10.2348C71.7284 8.42907 70.2237 7.0246 68.5182 7.0246V7.0246Z"
                    fill="#0ABF53"
                  ></path>
                  <path
                    d="M87.0773 7.0246H74.3367V22.9754H80.9578V11.0374H82.6633C83.1648 11.0374 83.5661 11.4387 83.5661 11.9403V22.9754H90.2875V10.2348C90.2875 8.42907 88.8831 7.0246 87.0773 7.0246V7.0246Z"
                    fill="#0ABF53"
                  ></path>
                </g>
              </svg>
            </a>
            <nav aria-label="Progress" className="hidden sm:block">
              <ol role="list" className="flex space-x-4">
                {steps.map((step, stepIdx) => (
                  <li key={step.name} className="flex items-center">
                    {step.status === "current" ? (
                      <a href={step.href} aria-current="page" className="text-indigo-600">
                        {step.name}
                      </a>
                    ) : (
                      <a href={step.href}>{step.name}</a>
                    )}

                    {stepIdx !== steps.length - 1 ? (
                      <ChevronRightIcon className="ml-4 h-5 w-5 text-gray-300" aria-hidden="true" />
                    ) : null}
                  </li>
                ))}
              </ol>
            </nav>
            <p className="sm:hidden">Step 2 of 4</p>
          </div>
        </div>
      </header>

      <main className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
        <h1 className="sr-only">Order information</h1>

        <section
          aria-labelledby="summary-heading"
          className="bg-gray-50 px-4 pt-16 pb-10 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
        >
          <div className="mx-auto max-w-lg lg:max-w-none">
            <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
              Order summary
            </h2>

            <ul role="list" className="divide-y divide-gray-200 text-sm font-medium text-gray-900">
              {products.map((product) => (
                <li key={product.id} className="flex items-start space-x-4 py-6">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-20 w-20 flex-none rounded-md object-cover object-center"
                  />
                  <div className="flex-auto space-y-1">
                    <h3>{product.name}</h3>
                    <p className="text-gray-500">{product.color}</p>
                    <p className="text-gray-500">{product.size}</p>
                  </div>
                  <p className="flex-none text-base font-medium">{product.price}</p>
                </li>
              ))}
            </ul>

            <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Subtotal</dt>
                <dd>$320.00</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Shipping</dt>
                <dd>$15.00</dd>
              </div>

              <div className="flex items-center justify-between">
                <dt className="text-gray-600">Taxes</dt>
                <dd>$26.80</dd>
              </div>

              <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                <dt className="text-base">Total</dt>
                <dd className="text-base">$361.80</dd>
              </div>
            </dl>

            <Popover className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
              <div className="relative z-10 border-t border-gray-200 bg-white px-4 sm:px-6">
                <div className="mx-auto max-w-lg">
                  <Popover.Button className="flex w-full items-center py-6 font-medium">
                    <span className="mr-auto text-base">Total</span>
                    <span className="mr-2 text-base">$361.80</span>
                    <ChevronUpIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>

              <Transition.Root as={Fragment}>
                <div>
                  <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-y-full"
                    enterTo="translate-y-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-y-0"
                    leaveTo="translate-y-full"
                  >
                    <Popover.Panel className="relative bg-white px-4 py-6 sm:px-6">
                      <dl className="mx-auto max-w-lg space-y-6">
                        <div className="flex items-center justify-between">
                          <dt className="text-gray-600">Subtotal</dt>
                          <dd>$320.00</dd>
                        </div>

                        <div className="flex items-center justify-between">
                          <dt className="text-gray-600">Shipping</dt>
                          <dd>$15.00</dd>
                        </div>

                        <div className="flex items-center justify-between">
                          <dt className="text-gray-600">Taxes</dt>
                          <dd>$26.80</dd>
                        </div>
                      </dl>
                    </Popover.Panel>
                  </Transition.Child>
                </div>
              </Transition.Root>
            </Popover>
          </div>
        </section>

        <Form
          onSubmit={onSumbit}
          initialValues={{ cardNumber: "", cvc: "", nameOnCard: "", expiryDate: "" }}
          className="px-4 pt-16 pb-36 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16"
        >
          <div className="mx-auto max-w-lg lg:max-w-none">
            <section aria-labelledby="payment-heading" className="mt-10">
              <h2 id="payment-heading" className="text-lg font-medium text-gray-900">
                Payment details
              </h2>

              <div className="mt-6 grid grid-cols-3 gap-y-6 gap-x-4 sm:grid-cols-4">
                <div className="col-span-3 sm:col-span-4">
                  <LabeledTextField
                    name="nameOnCard"
                    label="Name on card"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-3 sm:col-span-4">
                  <LabeledTextField
                    name="cardNumber"
                    label="Card number"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-2 sm:col-span-3">
                  <LabeledTextField
                    name="expiryDate"
                    label="Expiry Date"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>

                <div className="">
                  <LabeledTextField
                    name="cvc"
                    label="CVC"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
            </section>

            <div className="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between">
              <button
                type="submit"
                className="w-full rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:order-last sm:ml-6 sm:w-auto"
              >
                Continue
              </button>
              <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
                You won&apos;t be charged until the next step.
              </p>
            </div>
          </div>
        </Form>
      </main>
    </div>
  )
}
