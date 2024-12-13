import React from 'react';

function AboutUs() {
    return (
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl text-teal-blue">
                        Why Choose Us?
                    </h2>
                </div>

                {/* Section Items */}
                <div className="space-y-20">
                    {/* Simple Integration */}
                    <div className="flex flex-wrap md:flex-nowrap items-stretch space-x-8">
                        <div className="w-full md:w-1/2 px-4">
                            <img
                                src="https://picsum.photos/400/240"
                                alt="gem"
                                className="rounded shadow-lg border border-gray-300 object-cover w-full h-full"
                            />
                        </div>
                        <div className="w-full md:w-1/2 bg-gray-200 dark:bg-gray-800 p-8 rounded-lg flex flex-col justify-center">
                            <h3 className="font-bold text-xl sm:text-2xl mb-4 text-teal-blue">
                                Simple Integration
                            </h3>
                            <p className="text-lg leading-relaxed">
                                Use the LocaleData gem to download translations directly into your Ruby on Rails
                                projects using the provided command line interface. Just create a project and follow
                                the step-by-step instructions.
                            </p>
                        </div>
                    </div>

                    {/* Easy Collaboration */}
                    <div className="flex flex-wrap md:flex-nowrap items-stretch space-x-8">
                        <div className="w-full md:w-1/2 order-2 md:order-1 bg-gray-200 dark:bg-gray-800 p-8 rounded-lg flex flex-col justify-center">
                            <h3 className="font-bold text-xl sm:text-2xl mb-4 text-teal-blue">
                                Easy Collaboration
                            </h3>
                            <p className="text-lg leading-relaxed">
                                All LocaleData projects are private. Each project can have multiple collaborators
                                with different roles and access permissions. You determine who can see and edit
                                your translations. Just add admins, developers, translators and configure their
                                access rights.
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 order-1 md:order-2 px-4">
                            <img
                                src="https://picsum.photos/400/240"
                                alt="project members"
                                className="rounded shadow-lg border border-gray-300 object-cover w-full h-full"
                            />
                        </div>
                    </div>

                    {/* No More Syntax Errors */}
                    <div className="flex flex-wrap md:flex-nowrap items-stretch space-x-8">
                        <div className="w-full md:w-1/2 px-4">
                            <img
                                src="https://picsum.photos/400/240"
                                alt="editor"
                                className="rounded shadow-lg border border-gray-300 object-cover w-full h-full"
                            />
                        </div>
                        <div className="w-full md:w-1/2 bg-gray-200 dark:bg-gray-800 p-8 rounded-lg flex flex-col justify-center">
                            <h3 className="font-bold text-xl sm:text-2xl mb-4 text-teal-blue">
                                No More Syntax Errors
                            </h3>
                            <p className="text-lg leading-relaxed">
                                LocaleData provides you easy import/export functions for your YAML files.
                                Use a simple editor with many predefined languages to manage your locales.
                                LocaleData also supports multiple translation types, such as simple text, plural forms,
                                numbers, booleans, symbols, arrays, and more.
                            </p>
                        </div>
                    </div>

                    {/* Bulk Editing */}
                    <div className="flex flex-wrap md:flex-nowrap items-stretch space-x-8">
                        <div className="w-full md:w-1/2 order-2 md:order-1 bg-gray-200 dark:bg-gray-800 p-8 rounded-lg flex flex-col justify-center">
                            <h3 className="font-bold text-xl sm:text-2xl mb-4 text-teal-blue">
                                Bulk Editing
                            </h3>
                            <p className="text-lg leading-relaxed">
                                Do you need to change the path of many translation keys at once? No problem, just
                                use the bulk editing feature and enjoy the results.
                            </p>
                        </div>
                        <div className="w-full md:w-1/2 order-1 md:order-2 px-4">
                            <img
                                src="https://picsum.photos/400/240"
                                alt="bulk editing"
                                className="rounded shadow-lg border border-gray-300 object-cover w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;