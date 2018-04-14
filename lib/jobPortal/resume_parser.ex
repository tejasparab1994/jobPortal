defmodule JobPortal.ResumeParser do

  def parse(file) do
    # IO.inspect file
    # &fileName=ATTInc.1-39.pdf&recognitionMethod=auto&outputFormat=XLS&xlsExportFileType=xlsx
    extension = Path.extname(file.filename)
    File.cp(file.path, "assignment1#{extension}")
    resp = HTTPoison.post!("http://api2.pdfextractoronline.com:8089/tab2ex2/api?tab2exkey=608.3FEB7C1B3F277FB8&fileName=assignment1.pdf&recognitionMethod=auto&outputFormat=TXT", {:multipart, [{:file, "assignment1.pdf"}]})
    # data = Poison.decode!(resp.body)
    resp.body

    # Pdf2htmlex.open("profile.pdf")
    # |> Pdf2htmlex.convert_to!("/home/manish/jobPortal")
    # File.exists?("profile.txt")
    # File.stream!("profile.txt", [:read, :write]) |>
    # Stream.map( &(String.replace(&1, " ", "\n")) ) |>
    # Enum.reduce([], fn (item, acc)-> [acc | item] end)

  end
end
