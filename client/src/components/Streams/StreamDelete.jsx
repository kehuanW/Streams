import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Modal from '../../Modal'
import history from '../../history'
import { fetchStream, deleteStream } from '../../actions'

class StreamDelete extends Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    handleDelete = () => {
        const { id } = this.props.match.params
        this.props.deleteStream(id)
    }

    renderActions = () => {
        return (
            <>
                <button onClick={this.handleDelete} className="ui primary button">Delete</button>
                <Link to="/" className="ui cancel button">Cancel</Link>
            </>
        )
    }

    renderContent = () => {
        if (!this.props.stream) {
            return `Are you sure to delete this stream?`
        }
        return `Are you sure to delete the stream with title ${this.props.stream.title}?`
    }

    render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }

        return (
            <>
                <Modal
                    title="Delete Stream"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismiss={() => history.push('/')} />
            </>
        )
    }
}

const mapPropsToState = (state, ownProps) => ({ stream: state.streams[ownProps.match.params.id], auth: state.auth })

const mapDispatchToProps = (dispatch) => ({
    fetchStream: (streamId) => dispatch(fetchStream(streamId)),
    deleteStream: (streamId) => dispatch(deleteStream(streamId))
})

export default connect(mapPropsToState, mapDispatchToProps)(StreamDelete)