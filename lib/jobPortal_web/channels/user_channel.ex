defmodule JobPortalWeb.UserChannel do
  use JobPortalWeb, :channel

  def join("users:online", _params, socket) do

    {:ok, %{ message: "welcome"}, socket}
  end

  def handle_in("search", payload, socket) do
  %{"title" => title, "location" => location} = payload
  data = JobPortal.ApiFetch.getJobs(title, location)
  {:reply, {:ok, data}, socket}
end

end
