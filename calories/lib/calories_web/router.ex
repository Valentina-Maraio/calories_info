defmodule CaloriesWeb.Router do
  use CaloriesWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :protect_from_forgery
  end

  scope "/", CaloriesWeb do
    pipe_through :browser
    get "/", PageController, :home
  end

  scope "/api", CaloriesWeb do
    pipe_through :api
    options "/estimate-calories", CalorieCountroller, :options
    post "/estimate-calories", CalorieController, :estimate
  end
end
