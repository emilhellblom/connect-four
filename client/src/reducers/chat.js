import {ADD_MESSAGE} from '../actions/chat'


export default function (state = '', action) {
    switch (action.type){
      case 'ADD_MESSAGE':
        return action.message
      default:
        return state
    }
  }