import React from 'react';
import '../chat.css'
function Test(props) {
    return (
        <>
            <div>
                <div className="menu">
                    <div className="back">
                        <i className="fa fa-chevron-left"></i>{' '}
                        <img
                            src="https://i.imgur.com/DY6gND0.png"
                            alt="Avatar"
                            draggable="false"
                        />
                    </div>
                    <div className="name">Alex</div>
                    <div className="last">18:09</div>
                </div>

                <ol className="chat">
                    <li className="other">
                        <div className="avatar">
                            <img src="https://i.imgur.com/DY6gND0.png" alt="Avatar" draggable="false" />
                        </div>
                        <div className="msg">
                            <p>Hola!</p>
                            <p>Te vienes a cenar al centro?</p>
                            <time>20:17</time>
                        </div>
                    </li>
                    <li className="self">
                        <div className="avatar">
                            <img src="https://i.imgur.com/HYcn9xO.png" alt="Avatar" draggable="false" />
                        </div>
                        <div className="msg">
                            <p>Puff...</p>
                            <p>Aún estoy haciendo el contexto de Góngora...</p>
                            <p>Mejor otro día</p>
                            <time>20:18</time>
                        </div>
                    </li>
                    {/* Add the rest of your chat messages here */}
                </ol>

                <input className="textarea" type="text" placeholder="Type here!" />
                <div className="emojis"></div>
            </div>
        </>
    );
}

export default Test;