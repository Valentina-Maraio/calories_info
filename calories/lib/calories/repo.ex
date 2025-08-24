defmodule Calories.Repo do
  use Ecto.Repo,
    otp_app: :calories,
    adapter: Ecto.Adapters.Postgres
end
