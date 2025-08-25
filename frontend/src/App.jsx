import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { Sparkles, Send, Trash2, AlertCircle, X } from 'lucide-react'
import { motion } from 'framer-motion'
import './App.css'

function App() {
  const [foodItem, setFoodItem] = useState('')
  const [conversation, setConversation] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const bottomRef = useRef(null)

  // Auto-scroll to the latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [conversation, loading])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!foodItem.trim()) return

    setLoading(true)
    setError('')

    const userMessage = { type: 'user', content: foodItem.trim() }
    setConversation(prev => [...prev, userMessage])

    try {
      const response = await axios.post('http://localhost:4000/api/estimate-calories', {
        food_item: foodItem.trim()
      })

      const aiMessage = { 
        type: 'ai', 
        content: response.data.data,
        timestamp: new Date().toLocaleTimeString()
      }

      setConversation(prev => [...prev, aiMessage])
    } catch (err) {
      const errorMsg = err.response?.data?.error || 'Failed to estimate calories'
      setError(errorMsg)

      const errorMessage = { 
        type: 'error', 
        content: errorMsg,
        timestamp: new Date().toLocaleTimeString()
      }
      setConversation(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
      setFoodItem('')
    }
  }

  const handleClearConversation = () => {
    setConversation([])
    setError('')
  }

  const formatNutritionData = (data) => {
    if (!data || typeof data !== 'object') return <p>{data}</p>;
    
    return (
      <div className="nutrition-grid">
        {[
          { label: "Serving Size", value: data.estimated_serving },
          { label: "Calories", value: data.calories },
          { label: "Protein", value: `${data.protein}g` },
          { label: "Carbs", value: `${data.carbs}g` },
          { label: "Fat", value: `${data.fat}g` },
          { label: "Confidence", value: `${(data.confidence * 100).toFixed(0)}%` }
        ].map((item, i) => (
          <div key={i} className="nutrition-item">
            <div className="nutrition-label">{item.label}</div>
            <div className="nutrition-value">{item.value}</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="app-container">
      
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <Sparkles className="sidebar-icon" />
          <h1 className="sidebar-title">CalorieAI</h1>
        </div>
        
        <button
          onClick={handleClearConversation}
          className="clear-button"
        >
          <Trash2 className="clear-icon" />
          <span className="clear-text">Clear</span>
        </button>
        
        <div className="sidebar-footer">
          <p>Ask about any food item to get calorie estimates powered by AI.</p>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="main-chat-area">
        
        {/* Messages */}
        <div className="messages-container">
          {conversation.length === 0 ? (
            <div className="welcome-screen">
              <div className="welcome-icon-container">
                <div className="welcome-icon-circle">
                  <Sparkles className="welcome-icon" />
                </div>
              </div>
              <h2 className="welcome-title">
                Calorie Information Assistant
              </h2>
              <p className="welcome-text">
                Enter a meal or ingredient to get AI-estimated calorie breakdown.
              </p>
            </div>
          ) : (
            conversation.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className={`message-wrapper ${message.type === "user" ? "user-message-wrapper" : "ai-message-wrapper"}`}
              >
                <div
                  className={`message-bubble ${
                    message.type === "user"
                      ? "user-message"
                      : message.type === "error"
                      ? "error-message"
                      : "ai-message"
                  }`}
                >
                  {message.type === "user" ? (
                    <p>{message.content}</p>
                  ) : message.type === "error" ? (
                    <p>{message.content}</p>
                  ) : (
                    <div className="ai-message-content">
                      <h3 className="nutrition-title">Nutrition Estimation</h3>
                      {formatNutritionData(message.content)}
                      <p className="timestamp">
                        Estimated at {message.timestamp}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          )}

          {/* Typing indicator */}
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="typing-indicator-wrapper"
            >
              <div className="typing-indicator">
                <div className="typing-dots">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input Area */}
        <div className="input-container">
          <form onSubmit={handleSubmit} className="input-form">
            
            {/* Input */}
            <input
              type="text"
              value={foodItem}
              onChange={(e) => setFoodItem(e.target.value)}
              placeholder="Message CalorieAI..."
              disabled={loading}
              className="message-input"
            />

            {/* Send button */}
            <button
              type="submit"
              disabled={loading || !foodItem.trim()}
              className="send-button"
            >
              <Send className="send-icon" />
            </button>

            {/* Error message */}
            {error && (
              <div className="error-banner">
                <AlertCircle className="error-icon" />
                <span className="error-text">{error}</span>
                <button onClick={() => setError('')} className="error-close">
                  <X className="close-icon" />
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default App