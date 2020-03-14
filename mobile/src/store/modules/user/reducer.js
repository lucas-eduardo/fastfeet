import produce from 'immer';

const INITIAL_STATE = {
  name: null,
  email: null,
  avatar: null,
  createdAt: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_SUCCESS': {
        draft.name = action.payload.user.name;
        draft.email = action.payload.user.email;
        draft.avatar = action.payload.user.avatar;
        draft.createdAt = action.payload.user.createdAt;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.name = null;
        draft.email = null;
        draft.avatar = null;
        draft.createdAt = null;
        break;
      }
      default:
    }
  });
}
