import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    name: '',
    comment: '',
    commentsList: [],
  }

  deleteComment = commentId => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(
        eachComment => eachComment.id !== commentId,
      ),
    })
  }

  toogleIsLiked = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  getName = event => {
    this.setState({name: event.target.value})
  }

  getComment = event => {
    this.setState({comment: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()

    const {name, comment} = this.state
    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
      date: new Date(),
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      name: '',
      comment: '',
    }))
  }

  render() {
    const {commentsList, name, comment} = this.state

    return (
      <div className="app-cont">
        <div className="comments-cont">
          <h1 className="app-head">Comments</h1>
          <div className="comments-inputs">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="form desc">Say something about 4.0 Technologies</p>
              <input
                value={name}
                onChange={this.getName}
                className="name-input"
                placeholder="Your Name"
                type="text"
              />

              <textarea
                value={comment}
                className="text"
                placeholder="Your Comment"
                rows="8"
                onChange={this.getComment}
              />

              <button type="submit" className="btn">
                Add Comment
              </button>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png "
              alt="comments"
              className="comments"
            />
          </div>
          <hr className="line" />
          <p className="heading">
            <span className="count">{commentsList.length}</span> Comments
          </p>

          <ul className="comments-list">
            {commentsList.map(eachComment => (
              <CommentItem
                key={eachComment.id}
                commentDetails={eachComment}
                toogleIsLiked={this.toogleIsLiked}
                deleteComment={this.deleteComment}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
