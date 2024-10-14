const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
    return (
        <div className={"flex justify-end"}>
            <div>
                <svg onClick={() => previous()} fill="#000000" viewBox="-2.4 -2.4 28.80 28.80" xmlns="http://www.w3.org/2000/svg" height={50} className={"cursor-pointer"}
                     width={60}
                     transform="matrix(1, 0, 0, 1, 0, 0)">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC"
                       strokeWidth="0.672"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M12,1A11,11,0,1,0,23,12,11.013,11.013,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9.01,9.01,0,0,1,12,21Zm-2-9,6-4v8ZM7,8H9v8H7Z"></path>
                    </g>
                </svg>
            </div>
            <div>
                    <span onClick={() => next()}>
                    <svg fill="#0000000" viewBox="-2.4 -2.4 28.80 28.80" xmlns="http://www.w3.org/2000/svg" height={50} className={"cursor-pointer"}
                         width={60}
                         transform="matrix(-1, 0, 0, 1, 0, 0)"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g
                        id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC"
                        strokeWidth="0.672"></g><g id="SVGRepo_iconCarrier"><path
                        d="M12,1A11,11,0,1,0,23,12,11.013,11.013,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9.01,9.01,0,0,1,12,21Zm-2-9,6-4v8ZM7,8H9v8H7Z"></path></g></svg>
                </span>
            </div>
        </div>

    );
};
export default ButtonGroup