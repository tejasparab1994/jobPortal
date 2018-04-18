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
  def githubLogin(conn, params) do
    code = params["code"]
    resp = HTTPoison.post!("https://github.com/login/oauth/access_token?client_id=bdd82a1189d62daed1e5&client_secret=25366568540371b4ecaf0a0a82697bd87df910d4&code=#{code}&accept=json",  "{\"body\": \"test\"}", [{"Content-Type", "application/json"}])
    responseBody = resp.body
    responseBody = String.split(responseBody, "&")
    responseBody = Enum.at(responseBody, 0)
    responseBody = String.replace(responseBody, "access_token=","")
   resp = HTTPoison.get!("https://api.github.com/user?access_token=#{responseBody}")
   authenticdata = Poison.decode!(resp.body)
   IO.inspect(resp)
   IO.inspect(authenticdata["login"])
   gituser = %{id: authenticdata["id"], name: authenticdata["login"], email: authenticdata["email"]   }
   exists? = JobPortal.Accounts.checkifexists(authenticdata["login"])
   if(exists? == false) do
      user =  %{"name" => authenticdata["login"], "email" =>  "fauxEmail@github.com", "password" => "gitPassword", "login_type" => "git"}
      JobPortal.Accounts.create_user(user)
   end
   token = %{token: responseBody, user: gituser}
   conn
   |> assign(:auth_token, responseBody)
   |> assign(:userid, authenticdata["id"])
   |> assign(:username, authenticdata["login"])
   |> assign(:useremail, authenticdata["email"])
   |> render("home.html")
   end
end
