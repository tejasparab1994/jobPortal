defmodule JobPortal.Repo.Migrations.AddFieldsToUsers do
  use Ecto.Migration

  def change do
    alter table(:users) do
             add :password_hash, :string
             add :login_type, :string
    end
  end
end
