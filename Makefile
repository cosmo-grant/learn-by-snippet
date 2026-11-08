.PHONY: format questions view preview

format:
	ruff format .
	prettier --write .

questions:
	uv run ./make_questions.py

view:
	open https://cosmo-grant.github.io/learn-by-snippet/

preview:
	live-server
