defmodule JobPortal.Accounts.Apply do
  use Ecto.Schema
  import Ecto.Changeset


  schema "user_apply_later" do
    field :status, :string
    field :job, :string

    belongs_to :user, JobPortal.Accounts.User, foreign_key: :user_id
    timestamps()
  end

  @doc false
  def changeset(apply, attrs) do
    apply
    |> cast(attrs, [:status, :user_id, :job])
    |> validate_required([:status, :user_id, :job])
  end
end
