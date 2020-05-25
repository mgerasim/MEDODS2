git add .
git commit -m deploy
git pull origin master
git push origin master
sudo systemctl stop MEDODS.service
sequelize db:migrate --env production
sudo cp MEDODS.service /etc/systemd/system/
sudo service systemd-resolved restart
sudo systemctl enable MEDODS.service
sudo systemctl start MEDODS.service
sudo systemctl status MEDODS.service

sudo mkdir ~/apps/MEDODS
sudo cd ~/apps/MEDODS
git clone git@github.com:mgerasim/MEDODSServer.git .
npm install
npm install axios
npm run build