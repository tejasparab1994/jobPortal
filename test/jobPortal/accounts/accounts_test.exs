defmodule JobPortal.AccountsTest do
  use JobPortal.DataCase

  alias JobPortal.Accounts

  describe "users" do
    alias JobPortal.Accounts.User

    @valid_attrs %{email: "some email", name: "some name"}
    @update_attrs %{email: "some updated email", name: "some updated name"}
    @invalid_attrs %{email: nil, name: nil}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Accounts.create_user()

      user
    end

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert Accounts.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Accounts.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Accounts.create_user(@valid_attrs)
      assert user.email == "some email"
      assert user.name == "some name"
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accounts.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, user} = Accounts.update_user(user, @update_attrs)
      assert %User{} = user
      assert user.email == "some updated email"
      assert user.name == "some updated name"
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Accounts.update_user(user, @invalid_attrs)
      assert user == Accounts.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Accounts.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Accounts.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Accounts.change_user(user)
    end
  end

  describe "user_apply_later" do
    alias JobPortal.Accounts.Apply

    @valid_attrs %{status: "some status"}
    @update_attrs %{status: "some updated status"}
    @invalid_attrs %{status: nil}

    def apply_fixture(attrs \\ %{}) do
      {:ok, apply} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Accounts.create_apply()

      apply
    end

    test "list_user_apply_later/0 returns all user_apply_later" do
      apply = apply_fixture()
      assert Accounts.list_user_apply_later() == [apply]
    end

    test "get_apply!/1 returns the apply with given id" do
      apply = apply_fixture()
      assert Accounts.get_apply!(apply.id) == apply
    end

    test "create_apply/1 with valid data creates a apply" do
      assert {:ok, %Apply{} = apply} = Accounts.create_apply(@valid_attrs)
      assert apply.status == "some status"
    end

    test "create_apply/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accounts.create_apply(@invalid_attrs)
    end

    test "update_apply/2 with valid data updates the apply" do
      apply = apply_fixture()
      assert {:ok, apply} = Accounts.update_apply(apply, @update_attrs)
      assert %Apply{} = apply
      assert apply.status == "some updated status"
    end

    test "update_apply/2 with invalid data returns error changeset" do
      apply = apply_fixture()
      assert {:error, %Ecto.Changeset{}} = Accounts.update_apply(apply, @invalid_attrs)
      assert apply == Accounts.get_apply!(apply.id)
    end

    test "delete_apply/1 deletes the apply" do
      apply = apply_fixture()
      assert {:ok, %Apply{}} = Accounts.delete_apply(apply)
      assert_raise Ecto.NoResultsError, fn -> Accounts.get_apply!(apply.id) end
    end

    test "change_apply/1 returns a apply changeset" do
      apply = apply_fixture()
      assert %Ecto.Changeset{} = Accounts.change_apply(apply)
    end
  end
end
