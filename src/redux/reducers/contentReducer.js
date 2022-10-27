const initialState = [
    { id: 0, url:"https://dzone.com/articles/how-to-validate-names-using-java",  word: "What Is" },
    { id: 1, url:"https://dzone.com/articles/how-to-validate-names-using-java",  word: "What Is" },

  ];

  export const contentReducer = (state = initialState, action) => {
    switch (action.type){
      case "ADD_CONTENT":
        state = [...state, action.payload];
        return state;
      case "DELETE_CONTENT":
          const contentFilter = state.filter((content) => 
          content.id === action.payload ? null : content
        );
        state = contentFilter;
        return state;
      case "UPDATE_CONTENT":
          const contentUpdate = state.filter((content) =>
          content.id === action.payload.id
          ? Object.assign(content, action.payload)
          : content
          );
          state = contentUpdate;
          return state;
      case "RESET_CONTENT":
        state = [{ url: null, word: null}];
        return state;
      default:
        return state;     

    }
  }