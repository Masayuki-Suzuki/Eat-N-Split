import { Dispatch, SetStateAction, useState } from 'react'
import FriendsList from './organisms/FriendsList'
import FormAddFriend from './organisms/FormAddFriend'
import Button from './atoms/Button'
import FormSplitBill from './organisms/FormSplitBill'

const INITIAL_STATE = [
    {
        id: crypto.randomUUID(),
        name: 'Clark',
        image: 'https://i.pravatar.cc/48?u=118836',
        balance: -7
    },
    {
        id: crypto.randomUUID(),
        name: 'Sarah',
        image: 'https://i.pravatar.cc/48?u=933372',
        balance: 20
    },
    {
        id: crypto.randomUUID(),
        name: 'Anthony',
        image: 'https://i.pravatar.cc/48?u=499476',
        balance: 0
    }
]

export type Friend = (typeof INITIAL_STATE)[0]
export type SetSelectedFriend = (friend: Friend | null) => void
export type SetFriends = Dispatch<SetStateAction<Friend[]>>

const App = () => {
    const [friends, setFriends] = useState<Friend[]>(INITIAL_STATE)
    const [isOpenAddFriendForm, setIsOpenAddFriendForm] = useState(false)
    const [selectedFriend, setSelectedFriend] = useState<Friend | null>(friends[0])

    const onUpdateFriendBalance = (friendID: string, balance: number) => {
        const updatedFriends = friends.map(friend => {
            if (friend.id === friendID) {
                return { ...friend, balance: friend.balance + balance }
            }
            return friend
        })
        setFriends(updatedFriends)
    }

    const handleSelectFriend = (friend: Friend | null) => {
        setSelectedFriend(friend)
        setIsOpenAddFriendForm(false)
    }

    return (
        <>
            <h1 className="app-header">🍔 Eat - 'N - Split 🌮</h1>
            <div className="app">
                <div className="sidebar">
                    <FriendsList
                        friends={friends}
                        selectedFriend={selectedFriend}
                        handleSelectFriend={handleSelectFriend}
                    />

                    {isOpenAddFriendForm && <FormAddFriend setFriends={setFriends} />}

                    <Button action={() => setIsOpenAddFriendForm(!isOpenAddFriendForm)}>
                        {isOpenAddFriendForm ? 'Close' : 'Add Friend'}
                    </Button>
                </div>
                {selectedFriend && (
                    <FormSplitBill
                        friend={selectedFriend}
                        onUpdateFriendBalance={onUpdateFriendBalance}
                        key={selectedFriend.id}
                    />
                )}
            </div>
        </>
    )
}

export default App
