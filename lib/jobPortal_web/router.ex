defmodule JobPortalWeb.Router do
  use JobPortalWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  scope "/", JobPortalWeb do
    # Use the default browser stack
    pipe_through(:browser)

    get("/tools", PageController, :home)
    get("/", PageController, :home)
    get("/profile", PageController, :home)
    get("/description/:source/:id", PageController, :home)
    get "/githubToken", PageController, :githubLogin
    get "/register", PageController, :home
  end

   #Other scopes may use custom stacks.
   scope "/api/v1", JobPortalWeb do
     pipe_through :api
     resources "/users", UserController, except: [:new, :edit]
     post "/token", TokenController, :create
     resources "/user_apply_later", ApplyController, except: [:new, :edit]
   end
end
