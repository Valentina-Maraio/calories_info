defmodule Calories.CalorieEstimator do
  @moduledoc """
  Service for estimating calories information using AI
  """

  alias Calories.AI.OpenAIClient

  @spec estimate(String.t()) :: {:ok, map() | {:error, String.t()}}
  def estimate(food_item) do
    food_item
    |> String.trim()
    |> case do
      "" -> {:error, "Food item cannot be empty"}
      item -> OpenAIClient.estimate_calories(item)
    end
  end
end
