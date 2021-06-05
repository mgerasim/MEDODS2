git add .
git commit -m deploy
git pull origin master
git push origin master
sudo systemctl stop MEDODS2.service

cd ~/apps/MEDODS2

git pull origin master

npm install
npm install axios
npm run build
sequelize db:migrate --env production
sudo systemctl start MEDODS2.service
sleep .15
sudo systemctl status MEDOD2S.service


