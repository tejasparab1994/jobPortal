use Mix.Config

# In this file, we keep production configuration that
# you'll likely want to automate and keep away from
# your version control system.
#
# You should document the content of this
# file or create a script for recreating it, since it's
# kept out of version control and might be hard to recover
# or recreate for your teammates (or yourself later on).
config :jobPortal, JobPortalWeb.Endpoint,
  secret_key_base: "PvSxCGddlqRbea0dvAnXF7ANmJbuhQZwBnl5pPnNsI0t3XLwvqriiggxdKeEXJ04"

# Configure your database
config :jobPortal, JobPortal.Repo,
  adapter: Ecto.Adapters.Postgres,
  username: "jobPortal",
  password: "someRandomNumber123",
  database: "jobportal_prod",
  pool_size: 15
