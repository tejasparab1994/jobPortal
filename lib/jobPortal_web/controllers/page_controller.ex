defmodule JobPortalWeb.PageController do
  use JobPortalWeb, :controller

  def home(conn, _params) do

    render conn, "home.html"
  end
  def index(conn, _params) do

    render conn, "index.html"
  end
  def jobList(conn, _params) do
    render conn, "jobs.html"
  end
  def uploadfile(conn, file) do

    if file != %{} do
      file = JobPortal.ResumeParser.parse(file["photo"])
    else
      file = nil
    end
    render conn, "fileparse.html", %{file: file}
  end
  def parse(conn, file) do

    render "fileparse.html"
  end
  def getJobData(title, location) do
    keywords = cond do
      title != "" && location != "" -> "#{title }, #{location}"
      location == "" && title != "" -> title
      title == "" && location != "" -> location
      true -> ""
    end
    keywords = String.replace(keywords, " ", "%20")
    resp = HTTPoison.get!("https://authenticjobs.com/api/?api_key=ae79cb922e77eb16524463525e6609ec&method=aj.jobs.search&keywords=#{keywords}&format=json")
    authenticdata = Poison.decode!(resp.body)
    comapany = authenticdata["listings"]["listing"]
    title =String.replace(title, " ", "%20")
    githubResp = HTTPoison.get!("https://jobs.github.com/positions.json?search=#{title}")
    githubData = Poison.decode!(githubResp.body)
    data = %{"authenticJobs" => comapany, "github" => githubData}
    data
  end
end
