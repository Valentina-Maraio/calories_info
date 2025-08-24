import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [foodItem, setFoodItem] = useState('')
  const [estimation, setEstimation] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!foodItem.trim()) return

    setLoading(true)
    setError('')
    setEstimation(null)

    try {
      const response = await axios.post('http://localhost:4000/api/estimate-calories', {
        food_item: foodItem.trim()
      })
      setEstimation(response.data.data)
    } catch(err){
      setError(err.repsonse?.data?.error || 'Failed to estimate calories')
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
    <div className="app-main">
      <header className="app-header">
        <h1>Calorie Information</h1>
        <p>Enter a meal or ingredient to get AI-estimated calorie breakdown</p>
      </header>

      <main className="app-main">
        <form onSubmit={handleSubmit} className="food-form">
          <input 
          type="text"
          value={foodItem}
          onChange={(e) => setFoodItem(e.target.value)}
          placeholder="e.g, chicken breast, apple, pasta with tomato sauce"
          disabled={loading}
          className="food.input"
          />
          <button
          type="submit"
          disabled={loading || !foodItem.trim()}
          className="submit-button"
          >{loading ? 'Estimating...' : 'Estimate Calories'}</button>
        </form>

        {error && (
          <div className="error-message">
            Error: {error}
          </div>
        )}

        {estimation && (
          <div className="result-card">
            <h2>Nutrition Estimation</h2>
            <div className="result-grid">
              <div className="result-item">
                <span className="label">Serving Size:</span>
                <span className="value">{estimation.estimated_serving}</span>
              </div>
              <div className="result-item">
                <span className="label">Calories:</span>
                <span className="value">{estimation.calories}</span>
              </div>
              <div className="result-item">
                <span className="label">Protein:</span>
                <span className="value">{estimation.protein}g</span>
              </div>
              <div className="result-item">
                <span className="label">Carbs:</span>
                <span className="value">{estimation.carbs}g</span>
              </div>
              <div className="result-item">
                <span className="label">Fat:</span>
                <span className="value">{estimation.fat}g</span>
              </div>
              <div className="result-item">
                <span className="label">Confidence:</span>
                <span className="value">{(estimation.confidence * 100).toFixed(0)}%</span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
    </>
  )
}

export default App
