defmodule JobPortalWeb.PageController do
  use JobPortalWeb, :controller

  def home(conn, _params) do

    render conn, "home.html"
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
   exists? = JobPortal.Accounts.checkifexists(authenticdata["login"], "git")
   if(exists? == false) do
      user =  %{"name" => authenticdata["login"], "email" =>  "fauxEmail@github.com", "password" => "gitPassword", "login_type" => "git"}
      JobPortal.Accounts.create_user(user)
   end
   id = JobPortal.Accounts.getUserId(authenticdata["login"], "git")
   token = %{token: responseBody, user: gituser}
   conn
   |> assign(:auth_token, responseBody)
   |> assign(:userid, id)
   |> assign(:username, authenticdata["login"])
   |> assign(:useremail, authenticdata["email"])
   |> render("home.html")
   end
end
