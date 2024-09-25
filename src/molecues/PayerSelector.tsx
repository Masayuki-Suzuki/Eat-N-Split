import { Friend } from '../App.tsx'
import { FormEvent } from 'react'

type PayerSelectorProps = {
    friend: Friend
    payer: string
    setPayer: (e: FormEvent<HTMLSelectElement>) => void
}

const PayerSelector = ({ friend, setPayer, payer }: PayerSelectorProps) => (
    <>
        <label>🤑 Who is paying the bill</label>
        <select value={payer} onChange={setPayer}>
            <option value="user">You</option>
            <option value="friend">{friend.name}</option>
        </select>
    </>
)

export default PayerSelector
