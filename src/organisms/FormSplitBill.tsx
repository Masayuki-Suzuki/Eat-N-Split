import FormInputField from '../molecues/FormInputField.tsx'
import Button from '../atoms/Button.tsx'
import PayerSelector from '../molecues/PayerSelector.tsx'
import { Friend } from '../App.tsx'
import { FormEvent, useEffect, useState } from 'react'

type FormSplitBillProps = {
    friend: Friend
    onUpdateFriendBalance: (friendID: string, balance: number) => void
}

const FormSplitBill = ({ friend, onUpdateFriendBalance }: FormSplitBillProps) => {
    const [payer, setPayer] = useState<'user' | 'friend'>('user')
    const [billValue, setBillValue] = useState(0)
    const [yourExpense, setYourExpense] = useState(0)
    const friendExpense = billValue - yourExpense

    const initialiseState = () => {
        setPayer('user')
        setBillValue(0)
        setYourExpense(0)
    }

    const handlePayerChange = (e: FormEvent<HTMLSelectElement>) => {
        if (e.currentTarget.value === 'user' || e.currentTarget.value === 'friend') {
            setPayer(e.currentTarget.value)
        }
    }

    const onBillChange = (e: FormEvent<HTMLInputElement>) => {
        setBillValue(Number(e.currentTarget.value))
    }

    const onYourExpenseChange = (e: FormEvent<HTMLInputElement>) => {
        const newValue = Number(e.currentTarget.value)
        setYourExpense(newValue > billValue ? yourExpense : newValue)
    }

    const onSplitBill = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()
        const balance = payer === 'user' ? friendExpense : -yourExpense
        onUpdateFriendBalance(friend.id, balance)
        initialiseState()
    }

    useEffect(() => {
        initialiseState()
    }, [friend])

    return (
        <form className="form-split-bill" onSubmit={onSplitBill}>
            <h2>Split a bill with {friend.name}</h2>
            <FormInputField inputType="number" value={billValue} onChangeEvent={onBillChange} required>
                💰Bill value
            </FormInputField>
            <FormInputField inputType="number" value={yourExpense} onChangeEvent={onYourExpenseChange}>
                🧍🏻Your expense
            </FormInputField>
            <FormInputField inputType="number" value={friendExpense} disabled>
                👫{friend.name}'s expense
            </FormInputField>
            <PayerSelector friend={friend} payer={payer} setPayer={handlePayerChange} />
            <Button>Split Bill</Button>
        </form>
    )
}

export default FormSplitBill
