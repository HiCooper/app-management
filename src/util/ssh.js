import openSocket from 'socket.io-client';
import { message } from 'antd';

let socket = openSocket('http://localhost:8000');

function checkConnect() {
  if (socket.disconnected) {
    message.error('连接ssh服务器失败,请稍后再试!');
    SSH.closeSocket(socket);
    // 重连，重要，当ssh服务重启后，保证服务重连
    socket = openSocket('http://localhost:8000');
    return false;
  }
  return true;
}

export default class SSH {
  /**
   * 连接 ssh server
   * @param terminal
   * @param msgId
   * @param ip
   * @param username
   * @param password
   */
  static connectToServer(terminal, msgId, ip, username, password) {
    if (!checkConnect(socket)) {
      return;
    }

    socket.emit('SSHServer', { msgId, ip, username, password });
    const term = terminal.getTerm();
    term.on('data', (data) => {
      socket.emit(msgId, data);
    });
    socket.on(msgId, (data) => {
      term.write(data);
    });
  }

  static closeSocket = () => {
    socket.close();
  };
}
