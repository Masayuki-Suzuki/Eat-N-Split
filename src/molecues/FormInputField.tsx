import { FormEvent } from 'react'

type FormInputFieldProps = {
    value: string | number
    inputType?: 'text' | 'number'
    disabled?: boolean
    onChangeEvent?: (e: FormEvent<HTMLInputElement>) => void
    required?: boolean
    children: JSX.Element | string | string[]
}

const FormInputField = ({ disabled, inputType, children, value, onChangeEvent, required }: FormInputFieldProps) => {
    const inputAttributes = {
        disabled,
        required,
        type: inputType ? 'number' : 'text',
        min: inputType === 'number' ? 0 : undefined
    }

    return (
        <>
            <label>{children}</label>
            <input {...inputAttributes} value={value} onChange={onChangeEvent && onChangeEvent} />
        </>
    )
}

export default FormInputField
