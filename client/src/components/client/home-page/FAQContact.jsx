import React from "react";
import {Button, Input, Textarea} from "@material-tailwind/react"
import {useLoading} from "../../../context/LoadingProvider";

const FAQContact = () => {
    const {darkMode} = useLoading()
    return (
        <div className="text-gray-700 dark:text-bright-yellow flex items-center justify-center py-8">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* FAQ Section */}
                <div>
                    <h1 className="text-3xl font-bold mb-6 text-teal-blue dark:text-bright-yellow">Frequently Asked Questions</h1>
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-lg font-semibold text-teal-blue dark:text-bright-yellow">
                                Anim pariatur cliche reprehenderit?
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt
                                autem numquam dolore molestias aperiam culpa alias veritatis
                                architecto eos, molestiae vitae ex eligendi libero eveniet
                                dolorem, doloremque rem aliquid perferendis.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-teal-blue dark:text-bright-yellow">
                                Non cupidatat skateboard dolor brunch?
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                Distinctio corporis, iure facere ducimus quos consectetur ipsa
                                ut magnam autem doloremque ex! Id, sequi. Voluptatum magnam sed
                                fugit iusto minus et suscipit? Minima sunt at nulla tenetur,
                                numquam unde quod modi magnam ab deserunt ipsam sint aliquid
                                dolores libero repellendus cupiditate mollitia quidem dolorem
                                odit.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-teal-blue dark:text-bright-yellow">
                                Praesentium voluptatibus temporibus consequatur non aspernatur?
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                Minima sunt at nulla tenetur, numquam unde quod modi magnam ab
                                deserunt ipsam sint aliquid dolores libero repellendus
                                cupiditate mollitia quidem dolorem.
                            </p>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-teal-blue dark:text-bright-yellow">
                                Voluptatum magnam sed fugit iusto minus et suscipit?
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300">
                                Laudantium perferendis, est alias iure ut veniam suscipit
                                dolorem fugit. Et ipsam corporis earum ea ut quae cum non iusto
                                blanditiis ipsum dolor eius reiciendis, velit adipisci quas.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4 text-teal-blue dark:text-bright-yellow">
                        Didn't find your answer in the FAQ? Contact our sales
                    </h2>
                    <form className="space-y-4">
                        {/* Name Input */}
                        <div className={""}>
                            <Input variant={"standard"}
                                   label="Name"
                                   type="text"
                                   color={darkMode ? "yellow" : "teal"}
                                   labelProps={{
                                       className: "!text-teal-blue dark:!text-bright-yellow",
                                   }}
                                   className="text-teal-blue dark:text-bright-yellow font-semibold !border-teal-blue focus:!border-teal-blue dark:!border-bright-yellow dark:focus:!border-bright-yellow"
                            />
                        </div>

                        {/* Email Input */}
                        <div className={""}>
                            <Input variant={"standard"}
                                   label="Email"
                                   type="email"
                                   color={darkMode ? "yellow" : "teal"}
                                   labelProps={{
                                       className: "!text-teal-blue dark:!text-bright-yellow",
                                   }}
                                   className="text-teal-blue dark:text-bright-yellow font-semibold !border-teal-blue focus:!border-teal-blue dark:!border-bright-yellow dark:focus:!border-bright-yellow"
                            />
                        </div>


                        {/* Message Input */}
                        <div>
                            <div className="relative">
                                  <Textarea variant={"standard"} label={"Message"} color={darkMode ? "yellow" : "teal"}
                                            labelProps={{
                                                className: "!text-teal-blue dark:!text-bright-yellow",
                                            }}
                                            className="text-teal-blue dark:text-bright-yellow font-semibold !border-teal-blue focus:!border-teal-blue dark:!border-bright-yellow dark:focus:!border-bright-yellow"
                                  />
                            </div>

                        </div>
                        <Button variant="solid"
                                className="w-full text-white bg-teal-blue hover:bg-teal-blue dark:bg-bright-yellow dark:hover:bg-bright-yellow dark:text-black dark:border-bright-yellow   ">
                            Send
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FAQContact;
