defmodule JobPortal.Repo.Migrations.CreateUserApplyLater do
  use Ecto.Migration

  def change do
    create table(:user_apply_later) do
      add :status, :string
      add :user_id, references(:users, on_delete: :nothing)
      add :job, :json
      
      timestamps()
    end

    create index(:user_apply_later, [:user_id])
  end
end
