
# Variables
DOCKER_COMPOSE = docker compose

# Commandes générales
.PHONY: build up down logs clean

build: build-front build-api build-db ## Build all services
start: start-front start-api start-db ## Start all services
down: ## Stop and remove all services
	$(DOCKER_COMPOSE) down

logs: logs-angular logs-nestjs logs-db ## Show logs for all services
clean: ## Clean all services, including volumes and orphan containers
	$(DOCKER_COMPOSE) down --volumes --remove-orphans

# Commandes pour Angular (Frontend)
build-front: ## Build the Angular container
	$(DOCKER_COMPOSE) build angular

start-front: ## Start only the Angular container
	$(DOCKER_COMPOSE) up -d angular

logs-front: ## Show logs for the Angular container
	$(DOCKER_COMPOSE) logs -f angular

# Commandes pour NestJS (Backend)
build-api: ## Build the NestJS container
	$(DOCKER_COMPOSE) build nestjs

start-api: ## Start only the NestJS container
	$(DOCKER_COMPOSE) up -d nestjs

logs-api: ## Show logs for the NestJS container
	$(DOCKER_COMPOSE) logs -f nestjs

# Commandes pour MySQL (Database)
build-db: ## Build the MySQL container
	$(DOCKER_COMPOSE) build db

start-db: ## Start only the MySQL container
	$(DOCKER_COMPOSE) up -d db

logs-db: ## Show logs for the MySQL container
	$(DOCKER_COMPOSE) logs -f db

# Help
help: ## Show this help
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@awk '/^[a-zA-Z_-]+:.*## / { printf "  %-15s %s\n", $$1, $$2 }' $(MAKEFILE_LIST) | sort

