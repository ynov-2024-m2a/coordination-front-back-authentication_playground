# Variables
DOCKER_COMPOSE = docker compose
SERVICE_NAME = db

# Commandes
start:
	@$(DOCKER_COMPOSE) up -d $(SERVICE_NAME)
	@echo "La base de données est démarrée et accessible sur le port 3306."

stop:
	@$(DOCKER_COMPOSE) down
	@echo "La base de données est arrêtée."

reset:
	@$(DOCKER_COMPOSE) down -v
	@$(DOCKER_COMPOSE) up -d $(SERVICE_NAME)
	@echo "La base de données a été réinitialisée."

logs:
	@$(DOCKER_COMPOSE) logs -f $(SERVICE_NAME)
