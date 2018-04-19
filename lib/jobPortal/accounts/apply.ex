defmodule JobPortal.Accounts.Apply do
  use Ecto.Schema
  import Ecto.Changeset


  schema "user_apply_later" do
    field :status, :string
    field :user_id, :id

    timestamps()
  end

  @doc false
  def changeset(apply, attrs) do
    apply
    |> cast(attrs, [:status])
    |> validate_required([:status])
  end
end
