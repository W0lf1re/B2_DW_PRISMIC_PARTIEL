import { PrismicRichText, useAllPrismicDocumentsByType } from '@prismicio/react'
import { useEffect, useState } from 'react';

function App() {
  const [recipes] = useAllPrismicDocumentsByType('recipes')
  const [ingredients] = useAllPrismicDocumentsByType('ingredients')
  const [drinks] = useAllPrismicDocumentsByType('drinks')
  // const [fetch, setFetch] = useState(false)

  useEffect(() => {
    if (recipes && ingredients && drinks) {
      console.log(recipes);
      console.log("recipes");
      console.log(ingredients);
      console.log("ingredients");
      console.log(drinks);
      console.log("drinks");
    }
  }, [recipes, ingredients, drinks])

  return (
    <div>
    </div>
  )
}

export default App;
