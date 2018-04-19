defmodule JobPortalWeb.ApplyView do
  use JobPortalWeb, :view
  alias JobPortalWeb.ApplyView

  def render("index.json", %{user_apply_later: user_apply_later}) do
    %{data: render_many(user_apply_later, ApplyView, "apply.json")}
  end

  def render("show.json", %{apply: apply}) do
    %{data: render_one(apply, ApplyView, "apply.json")}
  end

  def render("apply.json", %{apply: apply}) do
    %{id: apply.id,
      status: apply.status}
  end
end
