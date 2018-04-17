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
    post("/fileparse", PageController, :uploadfile)
    get("/tools", PageController, :home)
    get("/fileparse", PageController, :uploadfile)
    get("/index", PageController, :index)
    get("/", PageController, :home)
    get("/profile", PageController, :home)
    post("/jobList", PageController, :jobList)
    get("/description/:id", PageController, :home)
  end

  # Other scopes may use custom stacks.
  # scope "/api", JobPortalWeb do
  #   pipe_through :api
  # end
end
