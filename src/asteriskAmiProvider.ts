const AmiClient = require('asterisk-ami-client');

export class AMI {
    public client: any;
    constructor() {
        this.client = new AmiClient({
            reconnect: true,
            keepAlive: true,
            emitEventsByTypes: true,
            emitResponsesById: true
        });
    }

    connect(username: string, password: string, host: string, port: number = 5038) {
        this.client.connect('avancrm', 'JD3clEB8_f23r-3ry84gJ', { host: 'avantelecom.avantele.com', port: 5038 })
      .then(() => {
        this.client
          .on('Dial', event => {
            console.log(event);
          })
          .on('Hangup', event => {
            console.log(event);
          })
          .on('Hold', event => {
            console.log(event);
          })
          .on('Bridge', event => {
            console.log(event);
          })
          .on('BridgeLeave', event => {
            console.log(event);
          })
          .on('ExtensionStatus', event => {
            console.log(event);
          })
          .on('Newstate', event => {
            console.log(event);
          })
          .on('Newchannel', event => {
            console.log(event);
          })
          .on('NewCallerid', event => {
            console.log(event);
          })
          .on('Cdr', event => {
            console.log(event);
          })
          .on('QueueMemberStatus', event => {
            console.log(event);
          })
          .on('HangupRequest', event => {
            console.log(event);
          })
          .on('SoftHangupRequest', event => {
            console.log(event);
          })
          .on('Newexten', event => {
            console.log(event);
          })
          .on('AgentComplete', event => {
            console.log(event);
          })
          .on('LINKEDID_END', event => console.log(event))
          .on('resp_123', response => {

            // client.disconnect();
          })
          .on('internalError', error => console.log(error));
        this.client.action({
          Action: 'Ping',
          ActionID: 123
        });
      })
      .catch(error =>
      {
        console.log('connect ami client');
        console.log(error)
      });
    }
    
}

module.exports = AMI;