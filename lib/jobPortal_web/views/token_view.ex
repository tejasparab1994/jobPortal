defmodule JobPortalWeb.TokenView do
    
    def render("token.json", %{user: user, token: token}) do
        %{
          user_id: user.id,
          name: user.name,
          token: token
        }
      end
end