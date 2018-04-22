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
    skills = JobPortal.ResumeParser.parse(payload2.binary, payload2.filename, payload2.user_id)
    {:reply, {:ok, %{"skills" => skills}}, socket}
  end

  def handle_in("GET_SCORE_FROM_DESCRIPTION", payload, socket) do

    response = JobPortal.Scorer.get_score(payload["description"], payload["user_id"])
    {:reply, {:ok, response}, socket}
  end

  def handle_in("ADD_APPLY_LATER", payload, socket) do
    Accounts.create_apply(payload)
    {:reply, {:ok, %{"data" => "Suscribed"}}, socket}
  end
  def handle_in("MOVE_TO_APPLIED", payload, socket) do
    Accounts.find_apply_and_update(payload["job"], payload["user_id"], payload["status"])
    {:reply, {:ok, %{"data" => "Suscribed"}}, socket}
  end
  def handle_in("REMOVE_APPLIED", payload, socket) do
    Accounts.find_apply_and_delete(payload["job"], payload["user_id"])

    {:reply, {:ok, %{"data" => "Unsuscribed"}}, socket}
  end
  def handle_in("REMOVE_APPLY_LATER", payload, socket) do
    Accounts.find_apply_and_delete(payload["job"], payload["user_id"])

    {:reply, {:ok, %{"data" => "Unsuscribed"}}, socket}
  end
  def handle_in("AFTER_LOG_IN", payload, socket) do
    # IO.inspect payload["user_id"]
    applyLaterJobs = JobPortal.Accounts.list_all_jobs()
    a = List.first(applyLaterJobs)
    applyLaterJobs = JobPortal.Accounts.list_all_jobs()
    |> Enum.filter(&(&1["id"] == String.to_integer(payload["user_id"]) && &1["status"]== "ApplyLater"))
    |> Enum.map(&(&1["job"]))
    appliedJobs = JobPortal.Accounts.list_all_jobs()
    |> Enum.filter(&(&1["id"] == String.to_integer(payload["user_id"]) && &1["status"]== "Applied"))
    |> Enum.map(&(&1["job"]))
    skills = JobPortal.Accounts.get_skills(String.to_integer(payload["user_id"]))

    {:reply, {:ok, %{"applyLaterJobs" => applyLaterJobs, "appliedJobs" => appliedJobs, "skills" => skills}}, socket}
  end

end
