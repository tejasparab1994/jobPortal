defmodule JobPortal.ResumeParser do

  def parse(file, name, user_id) do
    File.write("assignment1.pdf", file, [:binary])
    response = HTTPoison.post!("http://api2.pdfextractoronline.com:8089/tab2ex2/api?tab2exkey=608.3FEB7C1B3F277FB8&fileName=assignment1.pdf&recognitionMethod=auto&outputFormat=TXT", {:multipart, [{:file, "assignment1.pdf"}]})
    response = response.body

    # url = "https://api.ocr.space/parse/image"
    # body = {:multipart, [{:file, "assignment1.pdf"}]}
    # headers = [{"apikey", "20a32109a488957"}]
    # respons= HTTPoison.post!(url,body,headers,[])
    # respons= Poison.decode!(response.body)
    # response= Poison.decode!(response.body)

    {:ok, skillfile} = File.read("skills.txt")
    skills= skillfile |> String.split("\n")
    # response = List.first(response["ParsedResults"])
    # response = response["ParsedText"]
    response = String.replace(response, "\n", " ")
    |> String.replace("\r", " ")
    |> String.split(" ")
    |> Enum.filter(&(&1!=""))
    |> Enum.filter(&(&1 in skills))
    |> Enum.uniq()
    |> Enum.map(&(IO.inspect &1))
    skillstore = Enum.join(response, "*")
    user_id = if is_integer(user_id), do: user_id, else: String.to_integer(user_id)
    JobPortal.Accounts.get_user!(user_id) |>
    JobPortal.Accounts.update_user(%{skills: skillstore, binresume: file})
    response
  end
end
