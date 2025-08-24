defmodule Calories.AI.OpenAIClient do
  @moduledoc """
  OpenAI client for calorie estimation
  """

  @system_prompt """
  You are a nutrition expert. Estimate calories and macronutrients for the given food item.
  Responde with a JSON object containing:
  - calories (number)
  - protein (number in grams)
  - carbs (number in grams)
  - fat (number in grams)
  - estimated_serving (string describing typical serving size)
  - confidence (number between 0-1 indicating confidence in estimation)

  If the food item is unclear or cannot be estimated, return null values with low confidence
  """

  @spec estimate_calories(String.t()) :: {:ok, map()} | {:error, String.t()}
  def estimate_calories(food_item) when is_binary(food_item) and food_item != "" do
    messages = [
      %{role: "system", content: @system_prompt},
      %{role: "user", content: "Estimate nutrition for: #{food_item}"}
    ]

    case OpenAI.chat_completion(
      model: "gpt-3.5-turbo",
      messages: messages,
      temperature: 0.3,
      max_tokens: 500
    ) do
      {:ok, %{"choices" => [%{"message" => %{"content" => content}} | _]}} ->
        parse_response(content)

        {:error, reason} ->
          {:error, "OpenAI API error: #{inspect(reason)}"}
    end
  end

  def estimate_calories(_), do: {:error, "Invalid food item"}

  defp parse_response(content) do
    case Jason.decode(content) do
      {:ok, data} when is_map(data) ->
        {:ok, normalize_response(data)}

        _ ->
          {:error, "Failed to parse AI response"}
    end
  end

  defp normalize_response(data) do
    %{
      calories: Map.get(data, "calories", 0),
      protein: Map.get(data, "protein", 0),
      carbs: Map.get(data, "carbs", 0),
      fat: Map.get(data, "fat", 0),
      estimated_serving: Map.get(data, "estimated_serving", "Unknown"),
      confidence: Map.get(data, "confidence", 0.5)
    }
  end
end
