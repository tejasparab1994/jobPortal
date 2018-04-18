defmodule JobPortalWeb.UserChannel do
  use JobPortalWeb, :channel

  def join("users:online", _params, socket) do

    {:ok, %{ message: "welcome"}, socket}
  end

  def handle_in("search", payload, socket) do
    %{"title" => title, "location" => location, "page" => page, "jobids"=> jobids} = payload
    data = JobPortal.ApiFetch.getJobs(title, location, page, jobids)
    {:reply, {:ok, data}, socket}
  end

  def handle_in("uploadfile", payload, socket) do
    payload1 = payload
    |> Map.new(fn {k, v} -> {String.to_atom(k), v} end)
    payload2 = Map.put(payload1, :binary, Base.decode64!(payload1.binary))
    JobPortal.ResumeParser.parse(payload2.binary)
    {:reply, {:ok, payload}, socket}
  end

  def handle_in("GET_SCORE_FROM_DESCRIPTION", payload, socket) do

    response = JobPortal.Scorer.get_score(payload["description"])
    {:reply, {:ok, response}, socket}
  end

end
