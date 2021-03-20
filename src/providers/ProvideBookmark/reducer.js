export default function reducer(state, action) {
  switch (action.type) {
    case 'drop':
      return {
        ...state,
        page: 1,
        total: 0,
        docs: [],
      };

    case 'list':
      return {
        ...state,
        ...action.payload,
      };
    case 'getTags':
      return {
        ...state,
        tags: action.payload,
      };
    case 'add':
      return {
        ...state,
        docs: [action.payload, ...state.docs],
      };
    case 'remove':
      return {
        ...state,
        docs: state.docs.filter((doc) => doc._id !== action.payload._id),
      };
    case 'update':
      return {
        ...state,
        docs: state.docs.map((doc) => (doc._id === action.payload._id ? action.payload : doc)),
      };

    default:
      throw new Error(`${action.type} not found!`);
  }
}
