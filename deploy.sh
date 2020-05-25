git add .
git commit -m deploy
git pull origin master
git push origin master
sudo systemctl stop MEDODS.service

cd ~/apps/MEDODS

git pull origin master

npm install
npm install axios
npm run build

sequelize db:migrate --env production


sudo systemctl start MEDODS.service
sudo systemctl status MEDODS.service


