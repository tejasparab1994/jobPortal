defmodule JobPortal.ApiFetch do

  def getJobs(title, location) do
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
