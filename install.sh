git add .
git commit -m deploy
git pull origin master
git push origin master
sudo systemctl stop MEDODS2.service
sequelize db:migrate --env production
sudo cp MEDODS2.service /etc/systemd/system/
sudo service systemd-resolved restart
sudo systemctl enable MEDODS2.service
sudo systemctl start MEDODS2.service
sudo systemctl status MEDODS2.service

sudo mkdir ~/apps/MEDODS2
sudo cd ~/apps/MEDODS2
git clone git@github.com:mgerasim/MEDODSServer.git .
npm install
npm install axios
npm run build