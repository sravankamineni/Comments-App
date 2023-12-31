// Write your code here
import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentDetails, toogleIsLiked} = props
  const {name, comment, isLiked, id, initialClassName, date} = commentDetails
  const initial = name ? name[0].toUpperCase() : ''
  const likeTextClassName = isLiked ? 'btn active' : 'btn'
  const likeImgUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const postedTime = formatDistanceToNow(date)
  const onLiked = () => {
    toogleIsLiked(id)
  }

  const onDeleteComment = () => {
    const {deleteComment} = props
    deleteComment(id)
  }
  return (
    <li className="list-cont">
      <div className="comment-row">
        <div className={initialClassName}>
          <p className="initial">{initial}</p>
        </div>
        <div>
          <div className="comment-text">
            <h1 className="head">{name}</h1>
            <p className="time">{postedTime}</p>
          </div>
          <p className="desc">{comment}</p>
        </div>
      </div>

      <div className="button-cont">
        <div className="like-container">
          <img src={likeImgUrl} className="like-icon" alt="like" />
          <button type="button" className={likeTextClassName} onClick={onLiked}>
            Like
          </button>
        </div>

        <button
          type="button"
          className="btn"
          onClick={onDeleteComment}
          data-testid="delete"
        >
          <img
            src=" https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            className="delete-icon"
            alt="delete"
          />
        </button>
      </div>
      <hr className="comment-line" />
    </li>
  )
}

export default CommentItem
