import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { addMessage } from '../../actions/chat'
import {userId} from '../../jwt'
import './Chat.css'
import Button from 'material-ui/Button'
import {updateGame} from '../../actions/games'

class Chat extends PureComponent {
    state = {
        value: ''
      }
    
      handleChange = e => {
        this.setState({ value: e.target.value })
      }
    
      handleSubmit = (e, game) => {
        e.preventDefault();       
        this.addComment(this.state.value, game);
        this.setState({ value: '' })
      }

      addComment = (comment, game) => {
        const {updateGame} = this.props
        console.log(game)
        updateGame(this.props.game.id, this.props.game.board, comment)
      }

     userHandle = (userObjects, userId) => {
        const users = Object.values(userObjects)
          return users.map(user => {
              if (user.id === userId) return user.firstName
          })
      }
    
      render() {
        const { value } = this.state;
        const { game, chat, users, userId } = this.props
        console.log(game)
        return (
            <div className='chat-bar'>
                <div className='message-field'>
                    <p className='messages'>- {game.comment}</p>
                </div>
                <div className='submit-div'>
                    <form className='submit-form' onSubmit={e => this.handleSubmit(e, game)}>
                    <input className='input-field' onChange={ e => this.handleChange(e) } value={ value } type='text' maxLength='50' placeholder='Type a message!'/>
                    <input className='submit' type="submit"/>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        chat: state.chat,
        userId: state.currentUser && userId(state.currentUser.jwt),
        users: state.users,
        // game: state.games && state.games[props.match.params.id],
      
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addMessage: x => dispatch(addMessage(x))
    }
}
  
export default connect(mapStateToProps, {updateGame})(Chat)