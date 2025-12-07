.PHONY: run stop clean logs restart uninstall

run:
	@if not exist .env copy .env.example .env
	docker-compose up --build

stop:
	docker-compose down

clean:
	docker-compose down -v
	rm -rf postgres_data

logs:
	docker-compose logs -f

restart:
	docker-compose restart

uninstall:
	docker-compose down
	docker-compose down --rmi all
	rm -rf postgres_data
	rm -f .env
	@echo "Uninstall complete! You can now delete this project folder."
