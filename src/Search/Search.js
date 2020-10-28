import { Component } from 'react'
import { Route, Switch } from 'react-router-dom';
import RecipeSearch from './RecipeSearch.js'
import IngredientSearch from './IngredientSearch.js'
import SearchForm from './SearchForm.js'

class Search extends Component {


    render() {
        return (
            <>
               
                    {this.props.user === null ?
                        <div> SOMETHING</div>

                        :
                        <Switch>

                            <Route path="/search/recipe/:recipeTitle" render={(routerprops) => <RecipeSearch {...routerprops} />} />
                            <Route path="/search/ingredient/:ingredient" render={(routerprops) => <IngredientSearch {...routerprops} />} />
                            <Route path="/search" render={(routerprops) => <SearchForm {...routerprops}  />} />
                        </Switch>
                    }
            
            </>
        );
    }
}

export default Search;