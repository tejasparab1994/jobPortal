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

  def handle_in("uploadfile", payload, socket) do
    payload1 = payload
    |> Map.new(fn {k, v} -> {String.to_atom(k), v} end)
    payload2 = Map.put(payload1, :binary, Base.decode64!(payload1.binary))
    File.write("assignment1.pdf", payload2.binary, [:binary])
    resp = HTTPoison.post!("http://api2.pdfextractoronline.com:8089/tab2ex2/api?tab2exkey=608.3FEB7C1B3F277FB8&fileName=assignment1.pdf&recognitionMethod=auto&outputFormat=TXT", {:multipart, [{:file, "assignment1.pdf"}]})
    IO.inspect resp.body
    # IO.inspect payload2
    {:reply, {:ok, payload}, socket}
  end

end
