import { Friend, SetSelectedFriend } from '../App'
import FriendItem from '../molecues/Friend'

type FriendsListProps = {
    friends: Friend[]
    handleSelectFriend: SetSelectedFriend
    selectedFriend: Friend | null
}

const FriendsList = ({ friends, handleSelectFriend, selectedFriend }: FriendsListProps) => {
    return (
        <ul className="friends-list">
            {friends.map(friend => (
                <FriendItem
                    friend={friend}
                    handleSelectFriend={handleSelectFriend}
                    selectedFriend={selectedFriend}
                    key={friend.id}
                />
            ))}
        </ul>
    )
}

export default FriendsList
