defmodule JobPortal.Repo.Migrations.UserApplyLater do
  use Ecto.Migration

  def change do
    create table("user_apply_later") do
      add :user_id, references(:users)
      add :job, :json
      add :status, :string
      timestamps()
    end
  end
end
