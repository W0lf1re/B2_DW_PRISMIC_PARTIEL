import { useAllPrismicDocumentsByType } from '@prismicio/react';
import { useEffect } from 'react';

function App() {
  const [recipes] = useAllPrismicDocumentsByType('recipes')
  const [ingredients] = useAllPrismicDocumentsByType('ingredients')
  const [drinks] = useAllPrismicDocumentsByType('drinks')

  const recipesData = recipes && recipes.map((recipe) => {
    return {
      uid: recipe.uid,
      name: recipe.data.name[0].text,
    }
  })

  const ingredientsData = ingredients && ingredients.map((ingredient) => {
    return {
      uid: ingredient.uid,
      name: ingredient.data.name[0].text,
      isAvailable: ingredient.data.in_stock
    }
  })

  const drinksData = drinks && drinks.map((drink) => {
    return {
      uid: drink.uid,
      name: drink.data.name[0].text,
      isAvailable: drink.data.in_stock
    }
  })

  console.log(recipes?.map((recipe) => {
    return recipe.data
  }))

  const inStockIngredients = ingredientsData?.filter((ingredient) => ingredient.isAvailable).map(ingredientId => ingredientId.uid)

  // const unmodeledIngredients = recipes?.map((recipe) => {
  //   return recipe.data.ingredients.map((ingredient) => {
  //     return ingredient
  //   })
  // })

  const unmodeledIngredients = recipes?.map((recipe) => {
    return recipe.data.ingredients.map((ingredient) => {
      return ingredient.ingredient.uid
    })
  })

  const test = () => {
    if (inStockIngredients?.includes(unmodeledIngredients)) {
      console.log("ta dispo");
    } else {
      console.log("ta pas dispo");
    }
  }

  console.log("mon map", unmodeledIngredients?.map((ingredient) => {
    return ingredient
  })
  )

  console.log("unmodelé", unmodeledIngredients)

  console.log("en stock", inStockIngredients)

  useEffect(() => {
    test()
  }, [])

  return (
    <div className="App">
      <h1>Recipes</h1>
      {/* {
        drinksData?.filter(drink => drink.isAvailable).map((drink) => {
          return (
            <div key={drink.uid}>
              <h2>{drink.name}</h2>
            </div>
          )
        })
      } */}
      {recipesData?.map((recipe) => {
        return (
          <div key={recipe.uid}>
            <h2>{recipe.name}</h2>
            {ingredientsData?.filter((ingredient => ingredient.isAvailable)).map((ingredient) => {
              return (
                <div key={ingredient.uid}>
                  <h3>{ingredient.name}</h3>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default App;
