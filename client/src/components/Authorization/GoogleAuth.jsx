import React, { Component } from 'react'
import { connect } from 'react-redux'
import { signIn, signOut } from '../../actions'

class GoogleAuth extends Component {

    componentDidMount() {
        // console.log("componentDidMount")
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                "client_id": process.env.REACT_APP_GOOGLE_CLIENT_ID,
                scope: 'email',
                plugin_name: "streams"
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get())
                this.auth.isSignedIn.listen(this.onAuthChange)
            })
        })
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        // console.log(this.auth)
        this.auth.signIn()
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }

    HandleAuthButton = () => {
        // console.log("HandleAuthButton")

        const { isSignedIn } = this.props

        if (isSignedIn === null) {
            return
        } else if (isSignedIn) {
            return <button onClick={this.onSignOutClick} className='ui red google button'>
                <i className='google icon'></i>Sign Out
            </button>
        } else {
            return <button onClick={this.onSignInClick} className='ui green google button'>
                <i className='google icon'></i>Sign In with Google
            </button>
        }
    }

    render() {
        console.log("render")
        return (
            <div>
                <div>{this.HandleAuthButton()}</div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth)