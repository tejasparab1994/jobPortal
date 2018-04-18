defmodule JobPortal.ApiFetch do

  def getJobs(title, location, page, jobids) do
    keywords = cond do
      title != "" && location != "" -> "#{title }, #{location}"
      location == "" && title != "" -> title
      title == "" && location != "" -> location
      true -> ""
    end
    keywords = String.replace(keywords, " ", "%20")
    resp = HTTPoison.get!("https://authenticjobs.com/api/?api_key=ae79cb922e77eb16524463525e6609ec&method=aj.jobs.search&keywords=#{keywords}&format=json&page=#{page}&perpage=10")
    authenticdata = Poison.decode!(resp.body)
    comapany = authenticdata["listings"]["listing"]
    comapany = Enum.filter(comapany, &(to_string(&1["id"]) not in jobids))
    title =String.replace(title, " ", "%20")
    location =String.replace(location, " ", "%20")
    githubResp = HTTPoison.get!("https://jobs.github.com/positions.json?description=#{title}&location=#{location}&page=#{page}")
    githubData = Poison.decode!(githubResp.body)
    data = %{"authenticJobs" => comapany, "github" => githubData}
    data

  end
end
