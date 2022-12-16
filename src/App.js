import { useAllPrismicDocumentsByType } from '@prismicio/react';
import Header from './components/Header';

function App() {
  const [ingredients] = useAllPrismicDocumentsByType('ingredients')
  const [drinks] = useAllPrismicDocumentsByType('drinks')
  const [recipes] = useAllPrismicDocumentsByType('recipes')

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

  const recipesData = recipes && recipes.map((recipe) => {
    return {
      uid: recipe.uid,
      name: recipe.data.name[0].text,
      image: recipe.data.image.url,
      price: recipe.data.price[0].text,
      ingredients: ingredientsData?.filter((ingredient) => recipe.data.ingredients.map((ingredient) => ingredient.ingredient.uid).includes(ingredient.uid)),
      drinks: drinksData?.filter((drink) => recipe.data.drinks.map((drink) => drink.drinks.uid).includes(drink.uid))
    }
  })

  // const inStockIngredients = ingredientsData?.filter((ingredient) => ingredient.isAvailable).map(ingredientId => ingredientId.uid)
  // const inStockDrinks = drinksData?.filter((drink) => drink.isAvailable).map(drinkId => drinkId.uid)

  // const isAvailable = inStockIngredients && inStockDrinks && recipesData?.every((recipe) => {
  //   const recipeIngredients = recipe.ingredients?.map((ingredient) => ingredient.uid)
  //   const recipeDrinks = recipe.drinks?.map((drink) => drink.uid)
  //   return recipeIngredients.every((ingredient) => inStockIngredients.includes(ingredient)) && recipeDrinks.every((drink) => inStockDrinks.includes(drink))
  // })

  // console.log("isAvailable", isAvailable);

  return (
    <div className="App">
      <Header />
      <h1 className='title'>Nos recettes</h1>
      <div className='recipes'>
        {recipesData?.map((recipe) => {
          return (
            <div className='recipe' key={recipe.uid}>
              {/* {isAvailable ? <p>Disponible</p> : <p>Indisponible</p>} */}
              <h1 className='recipeName'>{recipe.name}</h1>
              <img className='recipeImg' src={recipe.image} alt={recipe.name} />
              <h2>Ingrédients :</h2>
              <ul>
                {recipe.ingredients?.map((ingredient) => {
                  return (
                    <li key={ingredient.uid}>{ingredient.name}</li>
                  )
                })}
              </ul>
              <h2>Boisson recommandée :</h2>
              <ul>
                {recipe.drinks?.map((drink) => {
                  return (
                    <li key={drink.uid}>{drink.name}</li>
                  )
                })}
              </ul>
              <h1>Prix : {recipe.price}€</h1>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App;
