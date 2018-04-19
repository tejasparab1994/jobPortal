defmodule JobPortal.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.Query, warn: false
  alias JobPortal.Repo

  alias JobPortal.Accounts.User
  alias JobPortal.Accounts.Apply

  @doc """
  Returns the list of users.

  ## Examples

      iex> list_users()
      [%User{}, ...]

  """
  def list_users do
    Repo.all(User)
  end

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs \\ %{}) do
    user = %User{}
    IO.inspect(attrs)
    name = Map.get(attrs, "name")
    type = Map.get(attrs, "login_type")
    exists? = checkifexists(name, type)
    if(exists? == false) do
    password = Map.get(attrs, "password")
    IO.puts("password is")
    IO.puts(password)
    hashed = Comeonin.Argon2.hashpwsalt(password)
    attrs = Map.put(attrs, "password_hash", hashed)
    IO
    newUser = User.changeset(user, attrs)
    IO.puts("new user is")
    IO.inspect(newUser)
    {:ok, user} = Repo.insert(newUser)
    {:ok, user}
    else
      {:error, "user already exists"}
    end
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a User.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{source: %User{}}

  """
  def change_user(%User{} = user) do
    User.changeset(user, %{})
  end

  def get_and_auth_user(name, pass, type) do
    user = Repo.one(from u in User, where: u.name == ^name, where: u.login_type == ^type)
    IO.inspect(user)
    Comeonin.Argon2.check_pass(user, pass)
  end


  def checkifexists(name, type) do
    user = Repo.one(from u in User, select: count("*"), where: u.name == ^name, where: u.login_type == ^type)
    value = true
    value = if(user == 0) do
      false
    else
      true
    end
    value
  end

  def checkifGithubexists(name) do
    user = Repo.one(from u in User, select: count("*"), where: u.name == ^name, where: u.login_type=="git")
    value = true
    value = if(user == 0) do
      false
    else
      true
    end
    value
  end

  def getUserId(name, type) do
    id = Repo.one(from u in User, select: u.id, where: u.name == ^name, where: u.login_type== ^type)
    id
  end



  alias JobPortal.Accounts.Apply

  @doc """
  Returns the list of user_apply_later.

  ## Examples

      iex> list_user_apply_later()
      [%Apply{}, ...]

  """
def list_all_jobs do
  result = list_user_apply_later

  Enum.map(result, fn(job) -> %{"id" => job.user_id, "job" => job.job} end)
end
  def list_user_apply_later do
    Repo.all(Apply)
  end

  @doc """
  Gets a single apply.

  Raises `Ecto.NoResultsError` if the Apply does not exist.

  ## Examples

      iex> get_apply!(123)
      %Apply{}

      iex> get_apply!(456)
      ** (Ecto.NoResultsError)

  """
  def get_apply!(id), do: Repo.get!(Apply, id)

  @doc """
  Creates a apply.

  ## Examples

      iex> create_apply(%{field: value})
      {:ok, %Apply{}}

      iex> create_apply(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_apply(attrs \\ %{}) do
    IO.inspect attrs
    %Apply{}
    |> Apply.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a apply.

  ## Examples

      iex> update_apply(apply, %{field: new_value})
      {:ok, %Apply{}}

      iex> update_apply(apply, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_apply(%Apply{} = apply, attrs) do
    apply
    |> Apply.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Apply.

  ## Examples

      iex> delete_apply(apply)
      {:ok, %Apply{}}

      iex> delete_apply(apply)
      {:error, %Ecto.Changeset{}}

  """
  def find_apply_and_delete(job, user_id) do
    # row = Repo.delete(from u in Apply, where: u.user_id == ^user_id, where: u.job == ^job)
    # IO.inspect user_id
    user_id = String.to_integer(user_id)
    # row
    result = list_user_apply_later
    |> Enum.filter(fn(row) -> row.user_id == user_id && row.job == row.job end)
    delete_apply(List.first(result))

  end
  def delete_apply(%Apply{} = apply) do
    Repo.delete(apply)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking apply changes.

  ## Examples

      iex> change_apply(apply)
      %Ecto.Changeset{source: %Apply{}}

  """
  def change_apply(%Apply{} = apply) do
    Apply.changeset(apply, %{})
  end
end
