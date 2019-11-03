const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const getCertificates = () => ({
  key: fs.readFileSync(path.resolve(__dirname, 'httpsCertificates/localhost+2-key.pem')),
  cert: fs.readFileSync(path.resolve(__dirname, 'httpsCertificates/localhost+2.pem')),
  allowHTTP1: true
});

module.exports = () => {
  try {
    return getCertificates();
  } catch (error) {
		const certificatesDirectory = path.resolve(process.cwd(), '/config/httpsCertificates');
		const mkcertPath = path.resolve(process.cwd(), '/bin/mkcert')
    execSync(
      `mkdir -p ${certificatesDirectory} && cd ${certificatesDirectory}  && ${mkcertPath} -install localhost 127.0.0.1 ::1`
    );
    return getCertificates();
  }
};
