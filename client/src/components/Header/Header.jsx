import React from 'react'
import { Link } from 'react-router-dom'
import GoogleAuth from '../Authorization/GoogleAuth'

export default function Header() {
    return (
        <div className='ui secondary pointing menu'>
            <Link className='item' to="/">Streamer</Link>
            <div className='right menu'>
                <Link className='item' to="/">All Streams</Link>
            </div>
            <GoogleAuth />
        </div>
    )
}
