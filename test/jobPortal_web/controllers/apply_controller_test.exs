defmodule JobPortalWeb.ApplyControllerTest do
  use JobPortalWeb.ConnCase

  alias JobPortal.Accounts
  alias JobPortal.Accounts.Apply

  @create_attrs %{status: "some status"}
  @update_attrs %{status: "some updated status"}
  @invalid_attrs %{status: nil}

  def fixture(:apply) do
    {:ok, apply} = Accounts.create_apply(@create_attrs)
    apply
  end

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all user_apply_later", %{conn: conn} do
      conn = get conn, apply_path(conn, :index)
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create apply" do
    test "renders apply when data is valid", %{conn: conn} do
      conn = post conn, apply_path(conn, :create), apply: @create_attrs
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get conn, apply_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "status" => "some status"}
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, apply_path(conn, :create), apply: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update apply" do
    setup [:create_apply]

    test "renders apply when data is valid", %{conn: conn, apply: %Apply{id: id} = apply} do
      conn = put conn, apply_path(conn, :update, apply), apply: @update_attrs
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get conn, apply_path(conn, :show, id)
      assert json_response(conn, 200)["data"] == %{
        "id" => id,
        "status" => "some updated status"}
    end

    test "renders errors when data is invalid", %{conn: conn, apply: apply} do
      conn = put conn, apply_path(conn, :update, apply), apply: @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete apply" do
    setup [:create_apply]

    test "deletes chosen apply", %{conn: conn, apply: apply} do
      conn = delete conn, apply_path(conn, :delete, apply)
      assert response(conn, 204)
      assert_error_sent 404, fn ->
        get conn, apply_path(conn, :show, apply)
      end
    end
  end

  defp create_apply(_) do
    apply = fixture(:apply)
    {:ok, apply: apply}
  end
end
