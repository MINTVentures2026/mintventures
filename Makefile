.DEFAULT_GOAL := help
.PHONY: help install dev build preview lint typecheck test check verify clean

URL ?= https://www.mintventures.de

help: ## List available commands
	@grep -E '^[a-z]+:.*## ' $(MAKEFILE_LIST) | awk -F':.*## ' '{printf "  make %-10s %s\n", $$1, $$2}'

install: ## Install dependencies from the lockfile
	npm ci

dev: ## Dev server with hot reload on http://localhost:8080
	npm run dev

build: ## Production build into dist/
	npm run build

preview: build ## Build, then serve dist/ on http://localhost:4173
	npm run preview -- --port 4173

lint: ## ESLint
	npm run lint

typecheck: ## TypeScript type check
	npx tsc -p tsconfig.app.json --noEmit

test: ## Run tests once
	npm test

check: lint typecheck test build ## Everything CI should run

verify: build ## Smoke-test a deployment: make verify URL=https://staging.example
	scripts/verify-deploy.sh $(URL)

clean: ## Remove build output
	rm -rf dist
