.DEFAULT_GOAL := help
.PHONY: help install dev build preview lint format typecheck test e2e check clean

help: ## List available commands
	@grep -E '^[a-z0-9]+:.*## ' $(MAKEFILE_LIST) | awk -F':.*## ' '{printf "  make %-10s %s\n", $$1, $$2}'

install: ## Install dependencies from the lockfile (Node version: .nvmrc)
	npm ci

dev: ## Dev server with hot reload on http://localhost:8080
	npm run dev

build: ## Static production build into dist/
	npm run build

preview: build ## Build, then serve dist/ on http://localhost:4173
	npm run preview -- --ignore-lock

lint: ## ESLint (incl. accessibility rules for .astro)
	npm run lint

format: ## Format all files with Prettier
	npm run format

typecheck: ## astro check (TypeScript + .astro templates)
	npm run typecheck

test: ## Unit tests (Vitest)
	npm test

e2e: ## Browser tests on iPhone + desktop: keyboard, axe, no third-party requests
	npm run test:e2e

check: lint typecheck test build e2e ## Everything CI runs
	npm run format:check

clean: ## Remove build and test output
	rm -rf dist .astro playwright-report test-results
