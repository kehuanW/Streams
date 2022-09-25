import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import { fetchStream, editStream } from '../../actions'
import StreamForm from './StreamForm'

class StreamEdit extends Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    onSubmit = (formValues) => {
        // console.log("hello")
        this.props.editStream(this.props.match.params.id, formValues)
    }

    render() {
        // console.log("render", this.props.stream)
        if (!this.props.stream) {
            return <div>Loading...</div>
        }
        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm
                    onSubmit={this.onSubmit}
                    initialValues={_.pick(this.props.stream, 'title', 'description')}
                />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStream: (streamId) => dispatch(fetchStream(streamId)),
        editStream: (streamId, formValues) => dispatch(editStream(streamId, formValues))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StreamEdit)