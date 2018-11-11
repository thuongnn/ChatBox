import React from 'react'
import Linkify from 'react-linkify'
import './MessageBubble.css'

export default ({children, color, backgroundColor, isOwned, isFile}) => {
    color = color || 'black';
    backgroundColor = backgroundColor || '#EEE';
    return (
        <div
            className={isOwned ? "ownedBubble" : "unownedBubble"}
            style={{color, backgroundColor}}>
            <Linkify properties={{target: '_blank'}}>
                <p className="bubble-text">
                    <span className={isFile && "bubble-file"}>{children}</span>
                </p>
            </Linkify>
        </div>
    )
}
