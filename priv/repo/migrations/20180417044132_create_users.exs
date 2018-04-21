defmodule JobPortal.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :name, :string
      add :email, :string
      add :skills, :text, default: ""
      add :binresume, :bytea, default: nil

      timestamps()
    end

  end
end
