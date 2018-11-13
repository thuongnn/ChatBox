import React from 'react';
import {Icon} from 'antd';
import MessageBubble from './MessageBubble';

export const Text = ({children, isOwned, isFile}) => isOwned ?
    <MessageBubble
        backgroundColor="#3F51B5"
        color='#fff'
        isOwned={isOwned}
        isFile={isFile}
    >{children}
    </MessageBubble> :
    <MessageBubble
        backgroundColor="#eee"
        color='#000'
        isOwned={isOwned}
        isFile={isFile}
    >{children}
    </MessageBubble>;

export const File = ({isOwned, file}) => {
    const {type, downloadURL: URL} = file;

    if (type.startsWith('image')) return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <a href={URL} target='_blank' rel="noopener noreferrer">
                <img className="message-content-image" src={URL} alt={file.name}/>
            </a>
            <a href={URL} target='_blank' rel="noopener noreferrer" style={{textAlign: isOwned ? 'right' : 'left'}} className="userName">
                <Icon type="cloud-upload"/>
                {' '}
                {file.name}
            </a>
        </div>
    ); else if (type.startsWith('audio')) return (
        <audio src={URL} controls style={{width: '500px'}}>
            Your browser does not support embedded audios, but you can <a href={URL}>download it</a>
        </audio>
    ); else if (type.startsWith('video')) return (
        <video src={URL} controls height='240px'>
            Your browser does not support embedded videos, but you can <a href={URL}>download it</a>
        </video>
    ); else return (
        <Text isOwned={isOwned} isFile={true}>
            <a href={URL}>
                <Icon type="cloud-upload"/>
                {' '}
                {file.name}
            </a>
        </Text>
    )
};