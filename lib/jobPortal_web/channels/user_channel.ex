defmodule JobPortalWeb.UserChannel do
  use JobPortalWeb, :channel
  alias JobPortal.Accounts
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

  def handle_in("ADD_APPLY_LATER", payload, socket) do
    Accounts.create_apply(payload)
    {:reply, {:ok, %{"data" => "Suscribed"}}, socket}
  end
  def handle_in("REMOVE_APPLY_LATER", payload, socket) do
    Accounts.find_apply_and_delete(payload["job"], payload["user_id"])
    
    {:reply, {:ok, %{"data" => "Unsuscribed"}}, socket}
  end
  def handle_in("AFTER_LOG_IN", payload, socket) do
    IO.inspect payload["user_id"]
    appliedJobs = JobPortal.Accounts.list_all_jobs()
    |> Enum.filter(&(&1["id"] == String.to_integer(payload["user_id"])))
    |> Enum.map(&(&1["job"]))
    # IO.inspect appliedJobs
    {:reply, {:ok, %{"appliedJobs" => appliedJobs}}, socket}
  end

end
