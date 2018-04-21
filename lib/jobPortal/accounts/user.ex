defmodule JobPortal.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :email, :string
    field :name, :string
    field :password_hash, :string
    field :password, :string, virtual: true
    field :login_type, :string
    field :skills, :string
    field :binresume, :binary
    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :password_hash, :login_type, :skills, :binresume])
    |> validate_required([:name, :email, :password_hash])
  end
end
