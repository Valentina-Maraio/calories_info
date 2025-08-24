defmodule CaloriesWeb.PageController do
  use CaloriesWeb, :controller

  def home(conn, _params) do
    render(conn, :home)
  end
end
