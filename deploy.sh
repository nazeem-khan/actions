sudo docker container rm -f lol

sudo docker image rm nazeem358/first:git

sudo docker container run -p 3000:3000 --name lol -d nazeem358/first:git

echo "Done with redeploying"