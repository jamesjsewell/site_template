import { Field, reduxForm } from "redux-form"
import { Button, Segment, Input, Form } from "semantic-ui-react"
import React, { Component } from "react"

export const FormField = ({
    input,
    label,
    type,
    meta: { touched, error, warning, value }
}) => (
    <Form.Field required error={error && touched ? true : false}>
        <label>{label}</label>
        <Input
            type={type}
            value={input.value}
            onChange={(param, data) => input.onChange(data.value)}
            placeholder={label}
        />
        {touched &&
            ((error &&
                <Segment floated="right" compact color="red">
                    <span>{error}</span>
                </Segment>) ||
                (warning &&
                    <Segment floated="right" compact color="red">
                        <span>{warning}</span>
                    </Segment>))}
    </Form.Field>
)
