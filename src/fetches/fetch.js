// const BASE_URL= "http://localhost:3000/"

export function fetchRecipeSearch() {
    return (dispatch) => {
        dispatch({ type: 'FIND_RECIPE' });
        
    };
}