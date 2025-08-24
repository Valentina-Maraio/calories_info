defmodule CaloriesWeb.CalorieController do
  use CaloriesWeb, :controller

  alias Calories.CalorieEstimator

  def estimate(conn, %{"food_item" => food_item}) do
    case CalorieEstimator.estimate(food_item) do
      {:ok, estimation} ->
        json(conn, %{data: estimation})

        {:error, reason} ->
          conn
          |> put_status(:bad_request)
          |> json(%{error: reason})
    end
  end

  def estimate(conn, _params) do
    conn
    |> put_status(:bad_request)
    |> json(%{error: "food_item parameter is required"})
  end
end
