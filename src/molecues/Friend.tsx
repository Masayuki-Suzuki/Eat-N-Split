import { Friend, SetSelectedFriend } from '../App.tsx'
import Button from '../atoms/Button.tsx'

type FriendProps = {
    friend: Friend
    handleSelectFriend: SetSelectedFriend
    selectedFriend: Friend | null
}

const FriendItem = ({ friend, handleSelectFriend, selectedFriend }: FriendProps) => {
    let isSelected = false

    if (selectedFriend) {
        isSelected = friend.id === selectedFriend.id
    }

    const handleOnClickButton = () => {
        handleSelectFriend(selectedFriend && friend.id === selectedFriend.id ? null : friend)
    }

    return (
        <li className={isSelected ? 'selected' : ''}>
            {friend.image ? (
                <img src={friend.image} alt={friend.name} />
            ) : (
                <span className="image-placeholder">{friend.name.charAt(0)}</span>
            )}
            <h3>{friend.name}</h3>
            {friend.balance < 0 && <p className="red">You owe ${Math.abs(friend.balance)}</p>}

            {friend.balance > 0 && (
                <p className="green">
                    {friend.name} owes ${Math.abs(friend.balance)}
                </p>
            )}

            {friend.balance === 0 && <p className="">You and {friend.name} are even</p>}

            <Button action={handleOnClickButton}>{isSelected ? 'Close' : 'Select'}</Button>
        </li>
    )
}

export default FriendItem
