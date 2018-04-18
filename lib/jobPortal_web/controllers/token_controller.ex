defmodule JobPortalWeb.TokenController do
    use JobPortalWeb, :controller
    alias JobPortal.Accounts.User
  
    action_fallback JobPortalWeb.FallbackController
  
    def create(conn, %{"name" => name,  "pass" => pass, "type" => type}) do
      with {:ok, %User{} = user} <- JobPortal.Accounts.get_and_auth_user(name, pass, type) do
        token = Phoenix.Token.sign(conn, "auth token", user.id)
        conn
        |> put_status(:created)
        |> render("token.json", user: user, token: token)
      end
    end

  end