import React from 'react'
import { useState, useRef,useEffect } from 'react'
import "./chatBox.css"
import Typewriter from 'typewriter-effect';
import Message from './Message';

const ChatBox = () => {
    const [query, setQuery] = useState("")
    const [queryArray, setQueryArray] = useState([])

    const ref = useRef();

    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    const handleKey = (e) => {
        if (e.keyCode == 13) {
            handleSubmit()
        }
    }


    const handleSubmit = async () => {
        const temp=query;
        setQuery("")
        const a = [...queryArray]
        a.push({ query: temp, answer: 0 })
        setQueryArray([...a])
       
        const response = await fetch("http://localhost:5000/api/askChatGpt", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: temp
            })
        })

        if (response.status >= 200 && response.status <= 299) {
            const jsonData = await response.json()
            const a = [...queryArray]
            a.push({ query: temp, answer: jsonData.data })
            setQueryArray([...a])
            
        }
        else {
            const jsonData = await response.json()
            console.log(jsonData)
            const a = [...queryArray]
            a.push({ query: temp, answer: "Sorry boss I can't help you with this." })
            setQueryArray([...a])
            
        }
    }
    
    useEffect(() => {
        ref.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
    },[queryArray]);
    return (
        <>
            <div id='chatWrapper' className='chat'>
                <div className='msgWrapper' id='appendMsg'ref={ref}>
                    {queryArray.length && queryArray.map((data) => {
                        return (
                            <Message queryData={data} />
                        )
                    })}
                </div>
            </div>
            <form>
                <div class="input-group">
                    <textarea class="form-control" aria-label="With textarea" value={query} onChange={handleChange} onKeyUp={handleKey} placeholder='Ask Me Anything...'></textarea>
                    <span class="input-group-text" style={{ cursor: 'pointer', backgroundColor: "#8d8df1" }} onClick={handleSubmit}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                    </svg></span>
                </div>
            </form>
        </>
    )
}

export default ChatBox