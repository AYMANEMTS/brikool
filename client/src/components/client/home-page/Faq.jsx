import React, {useState} from 'react';

function Faq() {
    const [activeIndex, setActiveIndex] = useState(null);

    // Function to toggle FAQ answers
    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };
    return (
        <section className="container mx-auto py-12 px-6 sm:px-12">
            <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>

            <div className="max-w-3xl mx-auto">
                {/* FAQ Item 1 */}
                <div className="border-b-2 border-gray-200 py-4">
                    <button
                        onClick={() => toggleFaq(1)}
                        className="w-full text-left focus:outline-none flex justify-between items-center"
                    >
            <span className="text-lg font-semibold text-gray-800">
              What payment methods do you accept?
            </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 text-gray-600 transform transition-transform duration-200 ${activeIndex === 1 ? 'rotate-180' : ''}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 5a1 1 0 01.707 1.707L8.414 9.414a1 1 0 01-1.414 0L4.707 7.707A1 1 0 016.121 6.293L7.5 7.672l2.293-2.293A1 1 0 0110 5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <div className={`${activeIndex === 1 ? "block" : "hidden"} mt-3`}>
                        <p className="text-gray-600">
                            We accept all major credit cards, PayPal, and bank transfers. If you have any issues
                            during checkout, please contact our support team.
                        </p>
                    </div>
                </div>

                {/* FAQ Item 2 */}
                <div className="border-b-2 border-gray-200 py-4">
                    <button
                        onClick={() => toggleFaq(2)}
                        className="w-full text-left focus:outline-none flex justify-between items-center"
                    >
            <span className="text-lg font-semibold text-gray-800">
              How can I track my order?
            </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 text-gray-600 transform transition-transform duration-200 ${activeIndex === 2 ? 'rotate-180' : ''}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 5a1 1 0 01.707 1.707L8.414 9.414a1 1 0 01-1.414 0L4.707 7.707A1 1 0 016.121 6.293L7.5 7.672l2.293-2.293A1 1 0 0110 5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <div className={`${activeIndex === 2 ? "block" : "hidden"} mt-3`}>
                        <p className="text-gray-600">
                            Once your order is shipped, we will send you a confirmation email with a tracking
                            number. You can use this number to track your order on our website or directly on the
                            courier’s site.
                        </p>
                    </div>
                </div>

                {/* FAQ Item 3 */}
                <div className="border-b-2 border-gray-200 py-4">
                    <button
                        onClick={() => toggleFaq(3)}
                        className="w-full text-left focus:outline-none flex justify-between items-center"
                    >
            <span className="text-lg font-semibold text-gray-800">
              What is your return policy?
            </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 text-gray-600 transform transition-transform duration-200 ${activeIndex === 3 ? 'rotate-180' : ''}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 5a1 1 0 01.707 1.707L8.414 9.414a1 1 0 01-1.414 0L4.707 7.707A1 1 0 016.121 6.293L7.5 7.672l2.293-2.293A1 1 0 0110 5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <div className={`${activeIndex === 3 ? "block" : "hidden"} mt-3`}>
                        <p className="text-gray-600">
                            You can return any product within 30 days of purchase. Please ensure the item is in its
                            original packaging and unused. For more details, visit our Return Policy page.
                        </p>
                    </div>
                </div>

                {/* FAQ Item 4 */}
                <div className="border-b-2 border-gray-200 py-4">
                    <button
                        onClick={() => toggleFaq(4)}
                        className="w-full text-left focus:outline-none flex justify-between items-center"
                    >
            <span className="text-lg font-semibold text-gray-800">
              Do you offer international shipping?
            </span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-5 w-5 text-gray-600 transform transition-transform duration-200 ${activeIndex === 4 ? 'rotate-180' : ''}`}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 5a1 1 0 01.707 1.707L8.414 9.414a1 1 0 01-1.414 0L4.707 7.707A1 1 0 016.121 6.293L7.5 7.672l2.293-2.293A1 1 0 0110 5z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                    <div className={`${activeIndex === 4 ? "block" : "hidden"} mt-3`}>
                        <p className="text-gray-600">
                            Yes, we ship to most countries worldwide. Shipping costs and delivery times may vary
                            based on location.
                        </p>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Faq;