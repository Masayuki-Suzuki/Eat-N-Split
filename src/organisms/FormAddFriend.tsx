import { FormEvent, SyntheticEvent, useState } from 'react'
import FormInputField from '../molecues/FormInputField.tsx'
import Button from '../atoms/Button.tsx'
import { SetFriends } from '../App.tsx'

type FormAddFriendProps = {
    setFriends: SetFriends
}

const FormAddFriend = ({ setFriends }: FormAddFriendProps) => {
    const [friendName, setFriendName] = useState('')
    const [imageURL, setImageURL] = useState('')

    const handleAddNewFriend = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault()
        e.stopPropagation()

        const id = crypto.randomUUID()
        const image = `https://i.pravatar.cc/48?u=${id}`

        const newFriend = {
            id,
            image,
            name: friendName,
            balance: 0
        }

        setFriends(friends => [...friends, newFriend])
        setFriendName('')
        setImageURL('')
    }

    const handleOnChangeFriendName = (e: FormEvent<HTMLInputElement>) => {
        setFriendName(e.currentTarget.value)
    }

    const handleOnChangeImageURL = (e: FormEvent<HTMLInputElement>) => {
        setImageURL(e.currentTarget.value)
    }

    return (
        <form className="form-add-friend" onSubmit={handleAddNewFriend}>
            <FormInputField value={friendName} onChangeEvent={handleOnChangeFriendName} required>
                👫 Friend Name
            </FormInputField>
            <FormInputField value={imageURL} onChangeEvent={handleOnChangeImageURL}>
                🌅 Image URL
            </FormInputField>
            <Button>Add</Button>
        </form>
    )
}

export default FormAddFriend
