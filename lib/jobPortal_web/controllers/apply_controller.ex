defmodule JobPortalWeb.ApplyController do
  use JobPortalWeb, :controller

  alias JobPortal.Accounts
  alias JobPortal.Accounts.Apply

  action_fallback JobPortalWeb.FallbackController

  def index(conn, _params) do
    user_apply_later = Accounts.list_user_apply_later()
    render(conn, "index.json", user_apply_later: user_apply_later)
  end

  def create(conn, %{"apply" => apply_params}) do
    with {:ok, %Apply{} = apply} <- Accounts.create_apply(apply_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", apply_path(conn, :show, apply))
      |> render("show.json", apply: apply)
    end
  end

  def show(conn, %{"id" => id}) do
    apply = Accounts.get_apply!(id)
    render(conn, "show.json", apply: apply)
  end

  def update(conn, %{"id" => id, "apply" => apply_params}) do
    apply = Accounts.get_apply!(id)

    with {:ok, %Apply{} = apply} <- Accounts.update_apply(apply, apply_params) do
      render(conn, "show.json", apply: apply)
    end
  end

  def delete(conn, %{"id" => id}) do
    apply = Accounts.get_apply!(id)
    with {:ok, %Apply{}} <- Accounts.delete_apply(apply) do
      send_resp(conn, :no_content, "")
    end
  end
end
