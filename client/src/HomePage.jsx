import React from 'react'
import ChatBox from './components/ChatBox'
import "./homepage.css"
import Typewriter from 'typewriter-effect';


const HomePage = () => {
    return (
        <>
            <div >
                <div className='text-center' id='nav'>
                    <Typewriter
                        options={{
                            strings: "Jarvis-Your Personal Assistant",
                            autoStart: true,
                            loop: true,
                        }}
                    />
                </div>
                <div className='row'>
                    <div className='col-4' id="img-container">
                    </div>
                    <div className='col-8' id='msgContainer'>
                        <ChatBox />
                    </div>
                </div>

            </div>

        </>
    )
}

export default HomePage