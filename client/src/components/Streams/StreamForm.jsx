import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

class StreamForm extends Component {

    renderError = (meta) => {
        if (meta.touched && meta.error) {
            return (
                <div className='ui error message'>
                    <div className='header'>{meta.error}</div>
                </div>
            )
        }
    }

    renderInput = (formProps) => {
        const className = `field ${formProps.meta.error && formProps.meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{formProps.label}</label>
                <input {...formProps.input} />
                {this.renderError(formProps.meta)}
            </div>
        )
    }

    // onSubmit = (formValues) => {
    //     this.props.createStream(formValues)
    // }
    // onSubmit={this.props.handleSubmit(this.onSubmit)}

    render() {
        return (
            <form className='ui form error' onSubmit={this.props.handleSubmit}>
                <Field name='title' component={this.renderInput} label="Enter Title" />
                <Field name='description' component={this.renderInput} label="Enter Description" />
                <button className='ui button primary'>Submit</button>
            </form>

        )
    }
}

const validate = (formValues) => {
    const errors = {}
    if (!formValues.title) {
        errors.title = 'Please enter a title';
    }
    if (!formValues.description) {
        errors.description = 'Please enter a description';
    }
    return errors
}

const formWrapped = reduxForm({ form: 'streamForm', validate })(StreamForm)

export default formWrapped