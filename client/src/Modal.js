import React, { Component } from 'react'
import ReactDOM from 'react-dom'


export default class Modal extends Component {
    render() {
        const { title, content, actions, onDismiss } = this.props
        return (
            ReactDOM.createPortal(
                <div onClick={onDismiss} className='ui dimmer modals visible active'>
                    <div onClick={(e) => e.stopPropagation()} className='ui standard modal visible active'>
                        <div className="header">{title}</div>
                        <div className="content">
                            <p>{content}</p>
                        </div>
                        <div className="actions">{actions}</div>
                    </div>
                </div>,
                document.getElementById('modal')
            )
        )
    }
}
