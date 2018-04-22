defmodule JobPortal.Scorer do

  def get_score(description, user_id) do
    {:ok, file} = File.read("skills.txt")
    skills = file |> String.downcase() |> String.split("\n")
    skillsRequired= String.replace(description, "\n", " ")
    |> String.replace("\r", " ")
    |> String.replace(",", " ")
    |> String.downcase()
    |> String.split(" ")
    |> Enum.filter(&(&1!=""))
    |> Enum.filter(&(String.downcase(&1) in skills))
    |> Enum.uniq()

    # Enum.map(skillsRequired, &(IO.inspect &1))
    user_id = if is_integer(user_id), do: user_id , else: String.to_integer(user_id)
    yourSkills = JobPortal.Accounts.get_skills(user_id)
    # yourSkills=["java", "python", "elixir", "postgresql", "react", "angular"]
    hits = Enum.filter(skillsRequired, &(&1 in yourSkills))
    score = 0
    if length(skillsRequired) != 0 do

      score = length(hits)/length(skillsRequired)*100
    end

    %{"skillsRequired"=> skillsRequired, "skillsPresent" => yourSkills, "score"=> score }
  end
end
