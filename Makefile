docker-prisma-generate:
	docker compose -f docker-compose-dev.yml exec app bunx prisma generate

docker-prisma-migrate-deploy:
	docker compose -f docker-compose-dev.yml exec app bunx prisma migrate deploy

docker-prisma-migrate-dev:
	docker compose -f docker-compose-dev.yml exec app bunx prisma migrate dev

docker-prisma-seed:
	docker compose -f docker-compose-dev.yml exec app bunx prisma db seed
