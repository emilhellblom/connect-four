import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { addMessage } from '../../actions/chat'
import {userId} from '../../jwt'
import './Chat.css'

class Chat extends PureComponent {
    state = {
        value: ''
      }
    
      handleChange = e => {
        this.setState({ value: e.target.value })
      }
    
      handleSubmit = e => {
        e.preventDefault();
        this.props.addMessage(this.state.value);
        this.setState({ value: '' })
      }

     userHandle = (userObjects, userId) => {
        const users = Object.values(userObjects)
          return users.map(user => {
              if (user.id === userId) return user.firstName
          })
      }
    
      render() {
        const { value } = this.state;
        const { chat, users, userId } = this.props
        // console.log(users)
        return (
            <div className='chat-bar'>
                <div className='message-field'>
                    {chat.map(message => (
                        <p className='messages'>{this.userHandle(users, userId)} - {message}</p>
                    ))}
                </div>
                <div>
                    <form onSubmit={e => this.handleSubmit(e)}>
                    <input onChange={ e => this.handleChange(e) } value={ value } type='text' maxLength='50'/>
                    <input type="submit"/>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        chat: state.chat,
        userId: state.currentUser && userId(state.currentUser.jwt),
        users: state.users
      
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addMessage: x => dispatch(addMessage(x))
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(Chat)