printf '\nStarting mongodb...\n'
cd ./mongodb
docker-compose up -d
cd ../

printf '\nStarting rabbitmq...\n'
cd ./rabbitmq
docker-compose up -d
cd ../

printf '\nStarting post service...\n'
cd ./post-microservice
docker-compose up --build -d
cd ../

printf '\nStarting user-microservice...\n'
cd ./user-microservice
docker-compose up --build -d
cd ../

printf '\nStarting api-gateway...\n'
cd ./api-gateway
docker-compose up --build -d
cd ../

printf '\nApplication has successfully started!'
