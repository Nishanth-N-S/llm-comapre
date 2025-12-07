.PHONY: run stop clean logs restart

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
