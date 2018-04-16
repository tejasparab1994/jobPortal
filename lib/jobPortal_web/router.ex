defmodule JobPortalWeb.Router do
  use JobPortalWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", JobPortalWeb do
    pipe_through :browser # Use the default browser stack
    post "/fileparse", PageController, :uploadfile
    get "/tools", PageController, :home
    get "/fileparse", PageController, :uploadfile
    get "/index", PageController, :index
    get "/", PageController, :home
    post "/jobList", PageController, :jobList
  end

  # Other scopes may use custom stacks.
  # scope "/api", JobPortalWeb do
  #   pipe_through :api
  # end
end
