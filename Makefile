.PHONY: format questions view preview

format:
	uv tool run ruff format .
	prettier --write .

questions:
	uv run ./make_questions.py

view:
	open https://cosmo-grant.github.io/python-by-quiz/

preview:
	live-server
