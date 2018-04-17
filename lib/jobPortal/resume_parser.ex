defmodule JobPortal.ResumeParser do

  def parse(file) do
    File.write("assignment1.pdf", file, [:binary])
    # resp = HTTPoison.post!("http://api2.pdfextractoronline.com:8089/tab2ex2/api?tab2exkey=608.3FEB7C1B3F277FB8&fileName=assignment1.pdf&recognitionMethod=auto&outputFormat=TXT", {:multipart, [{:file, "assignment1.pdf"}]})
    url = "https://api.ocr.space/parse/image"
    body = {:multipart, [{:file, "assignment1.pdf"}]}
    headers = [{"apikey", "20a32109a488957"}]
    response= HTTPoison.post!(url,body,headers,[])
    response= Poison.decode!(response.body)

    {:ok, file} = File.read("skills.txt")
    skills= file |> String.split("\n")
    response = List.first(response["ParsedResults"])
    response = response["ParsedText"]
    response = String.replace(response, "\n", " ")
    |> String.replace("\r", " ")
    |> String.split(" ")
    |> Enum.filter(&(&1!=""))
    |> Enum.filter(&(&1 in skills))
    |> Enum.uniq()
    |> Enum.map(&(IO.inspect &1))

  end
end
